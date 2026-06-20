import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { secureFetch } from "@/lib/axios";
import { CreateContactForm } from "./components/CreateContactForm";

export interface Profile {
  id: string;
  name: string;
  description: string | null;
}

export default async function CreateContactPage() {
  const profiles = await secureFetch<Profile[]>({
    url: "/contact-profiles",
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
          Crear contacto
        </h1>
      </header>

      <Card>
        <CardContent>
          <CreateContactForm profiles={profiles} />
        </CardContent>
      </Card>
    </div>
  );
}
