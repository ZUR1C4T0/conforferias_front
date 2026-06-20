import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CreateTrendForm from "./CreateTrendForm";

export default async function CreateTrendPage({ params }: NextPageContext) {
  const { fairId } = await params;

  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-center gap-4">
        <Button variant="ghost" asChild>
          <Link href="../">
            <ArrowLeft data-icon="inline-start" />
          </Link>
        </Button>
        <h1 className="scroll-m-20 font-semibold text-2xl tracking-tight">
          Agregar tendencia observada
        </h1>
      </header>

      <Card>
        <CardContent>
          <CreateTrendForm fairId={fairId} />
        </CardContent>
      </Card>
    </div>
  );
}
