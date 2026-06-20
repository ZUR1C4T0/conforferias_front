import { UserPlus } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { cn } from "@/lib/utils";

export default async function UsersPage() {
  const users = await secureFetch<User[]>({
    url: "/users",
    method: "GET",
  });

  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <h1 className="scroll-m-20 font-semibold text-2xl tracking-tight">
          Usuarios
        </h1>
        <Button size="sm" asChild>
          <Link href="./users/create">
            <UserPlus data-icon="inline-start" /> Crear
          </Link>
        </Button>
      </header>

      <ItemGroup className="gap-4">
        {users.map((user) => (
          <Item key={user.id} variant="outline" role="listitem" asChild>
            <Link href={`./users/${user.id}/edit`}>
              <ItemMedia>
                <Avatar>
                  <AvatarFallback>
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{user.name}</ItemTitle>
                <ItemDescription>{user.email}</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Badge
                  className={cn(
                    user.role === "ADMIN" && "bg-chart-1",
                    user.role === "MERCADEO" && "bg-chart-2",
                    user.role === "REPRESENTANTE" && "bg-chart-3",
                  )}
                >
                  {user.role === "ADMIN" && "Administrador"}
                  {user.role === "MERCADEO" && "Mercadeo"}
                  {user.role === "REPRESENTANTE" && "Comercial"}
                </Badge>
              </ItemActions>
            </Link>
          </Item>
        ))}
      </ItemGroup>
    </div>
  );
}
