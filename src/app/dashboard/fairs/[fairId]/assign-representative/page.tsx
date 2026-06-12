import { Icon } from "@iconify/react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { secureFetch } from "@/lib/axios";
import AssignRepsForm from "./components/AssignRepsForm";

export default async function AssignRepresentativePage({
  params,
}: NextPageContext) {
  const { fairId } = await params;
  const representatives = await secureFetch<Representative[]>({
    url: `/fairs/${fairId}/representatives`,
    method: "GET",
  });
  const users = await secureFetch<User[]>({
    url: `/users/representatives`,
    method: "GET",
  });

  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-center gap-4">
        <Button variant="ghost" asChild>
          <Link href="./">
            <ArrowLeft data-icon="inline-start" />
          </Link>
        </Button>
        <h1 className="scroll-m-20 font-semibold text-2xl tracking-tight">
          Asignar representantes
        </h1>
      </header>

      <Card>
        <CardContent>
          <AssignRepsForm users={users} representatives={representatives} />
        </CardContent>
      </Card>
    </div>
  );
}
