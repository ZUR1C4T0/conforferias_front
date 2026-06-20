import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CreateCompetitorForm from "./CreateCompetitorForm";

export interface CompetitorProfile {
  id: string;
  name: string;
  description: string | null;
}

export default async function CreateCompetitorPage({
  params,
}: NextPageContext) {
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
          Agregar competidor
        </h1>
      </header>

      <Card>
        <CardContent>
          <CreateCompetitorForm fairId={fairId} />
        </CardContent>
      </Card>
    </div>
  );
}
