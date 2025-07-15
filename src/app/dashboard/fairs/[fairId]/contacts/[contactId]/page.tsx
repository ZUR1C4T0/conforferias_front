import { Icon } from "@iconify/react";
import Link from "next/link";

export default async function ContactPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="../" className="btn btn-secondary btn-soft btn-circle">
          <Icon icon="tabler:arrow-left" className="size-5" />
        </Link>
        <h1 className="grow font-semibold text-xl sm:text-3xl">Contacto</h1>
      </div>

      <div className="card card-border">
        <div className="card-header">
          <h2 className="card-title">Información general</h2>
        </div>
        <div className="card-body"></div>
      </div>
    </div>
  );
}
