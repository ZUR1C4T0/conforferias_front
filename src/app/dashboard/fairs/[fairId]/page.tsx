import { ArrowLeft, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { secureFetch } from "@/lib/axios";
import { getRole } from "@/lib/getRole";
import FairPageMercadeo from "./components/FairPage.mercadeo";
import FairPageRep from "./components/FairPage.rep";

export default async function FairPage({ params }: NextPageContext) {
  const role = await getRole();
  const { fairId } = await params;
  const fair = await secureFetch<Fair>({
    url: `/fairs/${fairId}`,
    method: "GET",
  });

  const canAssign = role === "ADMIN" || role === "MERCADEO";

  const renderPage = () => {
    switch (role) {
      case "ADMIN":
        return <FairPageMercadeo fair={fair} />;
      case "MERCADEO":
        return <FairPageMercadeo fair={fair} />;
      case "REPRESENTANTE":
        return <FairPageRep fair={fair} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-center gap-4">
        <Button variant="ghost" asChild>
          <Link href="./">
            <ArrowLeft data-icon="inline-start" />
          </Link>
        </Button>
        <Image src={fair.logoUrl} alt={fair.name} width={40} height={40} />
        <h1 className="scroll-m-20 font-semibold text-2xl tracking-tight">
          {fair.name}
        </h1>
        {canAssign && (
          <Button className="ml-auto" title="Asignar representantes" asChild>
            <Link href={`./${fairId}/assign-representative`}>
              <Users data-icon="inline-start" />
              <span className="hidden sm:inline">Asignar</span>
            </Link>
          </Button>
        )}
      </header>

      {renderPage()}
    </div>
  );
}
