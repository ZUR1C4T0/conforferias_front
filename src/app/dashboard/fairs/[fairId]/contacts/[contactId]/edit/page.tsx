import { Icon } from "@iconify/react";
import Link from "next/link";
import { notFound } from "next/navigation";
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
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="./" className="btn btn-secondary btn-soft btn-circle">
          <Icon icon="tabler:arrow-left" className="size-5" />
        </Link>
        <h1 className="font-semibold text-xl sm:text-3xl">Editar Contacto</h1>
      </div>

      <EditContactForm contact={contact} profiles={profiles} fairId={fairId} />
    </div>
  );
}
