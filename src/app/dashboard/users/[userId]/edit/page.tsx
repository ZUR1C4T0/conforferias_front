import { Icon } from "@iconify/react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { secureFetch } from "@/lib/axios";
import { EditUserForm } from "./EditUserForm";

export default async function EditUserPage({ params }: NextPageContext) {
  const { userId } = await params;
  const user = await secureFetch<User>({
    url: `/users/${userId}`,
    method: "GET",
  });

  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-center gap-4">
        <Button variant="ghost" asChild>
          <Link href="../">
            <ArrowLeft data-icon="inline-start" />
          </Link>
        </Button>
        <h1 className="scroll-m-20 font-semibold text-2xl tracking-tight">
          Editar usuario
        </h1>
      </header>

      <Card>
        <CardContent>
          <EditUserForm user={user} />
        </CardContent>
      </Card>
    </div>
  );
}
