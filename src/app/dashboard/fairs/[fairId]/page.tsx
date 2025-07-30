import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
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
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <Link href="./" className="btn btn-secondary btn-soft btn-circle">
          <Icon icon="tabler:arrow-left" className="size-5" />
        </Link>
        <Image
          src={fair.logoUrl}
          alt={fair.name}
          className="size-10"
          width={100}
          height={100}
        />
        <h1 className="mt-1 grow font-semibold text-3xl">{fair.name}</h1>
        {canAssign && (
          <Link
            href={`./${fairId}/assign-representative`}
            className="btn btn-primary"
          >
            <Icon icon="tabler:users-group" className="size-5" />{" "}
            <span className="hidden sm:inline">Asignar representantes</span>
          </Link>
        )}
      </div>

      {renderPage()}
    </div>
  );
}
