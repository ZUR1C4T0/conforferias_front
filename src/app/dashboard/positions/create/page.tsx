import { Icon } from "@iconify/react";
import Link from "next/link";
import CreatePositionForm from "./CreatePositionForm";

export default function CreatePositionPage() {
  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <Link href="./" className="btn btn-secondary btn-soft btn-circle">
          <Icon icon="tabler:arrow-left" className="size-5" />
        </Link>
        <h1 className="font-semibold text-3xl">Crear cargo</h1>
      </div>

      <div className="card card-border">
        <div className="card-body">
          <CreatePositionForm />
        </div>
      </div>
    </div>
  );
}
