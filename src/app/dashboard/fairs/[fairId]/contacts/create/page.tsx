import { Icon } from "@iconify/react";
import Link from "next/link";
import { secureFetch } from "@/lib/axios";
import CreateContactForm from "./components/CreateContactForm";

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
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="../" className="btn btn-secondary btn-soft btn-circle">
          <Icon icon="tabler:arrow-left" className="size-5" />
        </Link>
        <h1 className="font-semibold text-xl sm:text-3xl">Crear contacto</h1>
      </div>

      <div className="card card-border">
        <div className="card-body">
          <CreateContactForm profiles={profiles} />
        </div>
      </div>
    </div>
  );
}
