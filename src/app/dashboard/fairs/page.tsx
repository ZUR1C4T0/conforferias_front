import { ChevronRightIcon, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { secureFetch } from "@/lib/axios";
import { getRole } from "@/lib/getRole";
import { formatDate } from "@/utils/formatDate";

export default async function FairsPage() {
  const fairs = await secureFetch<Fair[]>({
    url: "/fairs",
  });
  const role = await getRole();
  const canCreateFair = role === "ADMIN" || role === "MERCADEO";

  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <h1 className="scroll-m-20 font-semibold text-2xl tracking-tight">
          Ferias
        </h1>
        {canCreateFair && (
          <Button size="sm" asChild>
            <Link href="/dashboard/fairs/create">
              <Plus data-icon="inline-start" /> Crear
            </Link>
          </Button>
        )}
      </header>

      <ItemGroup>
        {fairs.map((fair) => (
          <Item key={fair.id} variant="outline" role="listitem" asChild>
            <Link href={`/dashboard/fairs/${fair.id}`}>
              <ItemMedia>
                <Image
                  src={fair.logoUrl}
                  alt={fair.name}
                  width={60}
                  height={60}
                  className="rounded-full"
                />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{fair.name}</ItemTitle>
                <ItemDescription>
                  <Badge>
                    {formatDate(fair.startDate)}
                    {fair.startDate !== fair.endDate &&
                      ` - ${formatDate(fair.endDate)}`}
                  </Badge>
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <ChevronRightIcon className="size-4" />
              </ItemActions>
            </Link>
          </Item>
        ))}
      </ItemGroup>
    </div>
  );
}
