import { Icon } from "@iconify/react";
import Link from "next/link";
import CreateActionForm from "./CreateActionForm";

export default async function CreateActionPage({ params }: NextPageContext) {
  const { fairId } = await params;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="../" className="btn btn-secondary btn-soft btn-circle">
          <Icon icon="tabler:arrow-left" className="size-5" />
        </Link>
        <h1 className="font-semibold text-xl sm:text-3xl">
          Nueva Acción Postferia
        </h1>
      </div>

      <CreateActionForm fairId={fairId} />
    </div>
  );
}
