import { Icon } from "@iconify/react";
import Link from "next/link";
import CreateFairform from "./CreateFairForm";

export default function CreateFairPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Link href="./" className="btn btn-secondary btn-soft btn-circle">
          <Icon icon="tabler:arrow-left" className="size-5" />
        </Link>
        <h1 className="font-semibold text-3xl">Crear feria</h1>
      </div>

      <div className="card">
        <div className="card-body">
          <CreateFairform />
        </div>
      </div>
    </div>
  );
}
