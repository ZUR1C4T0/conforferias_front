import { Icon } from "@iconify/react";
import Link from "next/link";
import CreateUserForm from "./CreateUserForm";

export default function CreateUserPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="./" className="btn btn-secondary btn-soft btn-circle">
          <Icon icon="tabler:arrow-left" className="size-5" />
        </Link>
        <h1 className="font-semibold text-xl sm:text-3xl">Crear usuario</h1>
      </div>

      <div className="card card-border">
        <div className="card-body">
          <CreateUserForm />
        </div>
      </div>
    </div>
  );
}
