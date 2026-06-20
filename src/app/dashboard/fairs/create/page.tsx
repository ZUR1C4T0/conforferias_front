import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CreateFairform } from "./components/CreateFairForm";

export default function CreateFairPage() {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-center gap-4">
        <Button variant="ghost" asChild>
          <Link href="./">
            <ArrowLeft data-icon="inline-start" />
          </Link>
        </Button>
        <h1 className="scroll-m-20 font-semibold text-2xl tracking-tight">
          Crear feria
        </h1>
      </header>

      <Card>
        <CardContent>
          <CreateFairform />
        </CardContent>
      </Card>
    </div>
  );
}
