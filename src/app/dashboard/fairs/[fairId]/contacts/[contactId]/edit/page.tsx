import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { secureFetch } from "@/lib/axios";
import type { Profile } from "../../create/page";
import EditContactForm from "./EditContactForm";

export default async function EditContactPage({ params }: NextPageContext) {
  const { contactId, fairId } = await params;
  const [contact, profiles] = await Promise.all([
    secureFetch<Contact>({
      url: `/fairs/${fairId}/contacts/${contactId}`,
      method: "GET",
    }),
    secureFetch<Profile[]>({
      url: "/contact-profiles",
      method: "GET",
    }),
  ]);
  if (contact.fairId !== fairId) {
    return notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-center gap-4">
        <Button variant="ghost" asChild>
          <Link href="./">
            <ArrowLeft data-icon="inline-start" />
          </Link>
        </Button>
        <h1 className="scroll-m-20 font-semibold text-2xl tracking-tight">
          Editar contacto
        </h1>
      </header>

      <Card>
        <CardContent>
          <EditContactForm
            contact={contact}
            profiles={profiles}
            fairId={fairId}
          />
        </CardContent>
      </Card>
    </div>
  );
}
