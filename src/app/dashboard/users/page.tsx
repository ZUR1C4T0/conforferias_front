import { Icon } from "@iconify/react";
import Link from "next/link";
import { secureFetch } from "@/lib/axios";

export default async function UsersPage() {
  const users = await secureFetch<User[]>({
    url: "/users",
    method: "GET",
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-3xl">Usuarios</h1>
        <Link href="./users/create" className="btn btn-primary">
          <Icon icon="tabler:plus" className="size-5" /> Crear usuario
        </Link>
      </div>

      <div className="space-y-4">
        {users.length === 0 ? (
          <div className="card">
            <div className="card-body justify-center">
              <p className="text-center text-base-content/50">
                No hay usuarios disponibles
              </p>
            </div>
          </div>
        ) : (
          users.map((user) => (
            <Link
              key={user.id}
              href={`./users/${user.id}/edit`}
              className="card hover:-translate-y-0.5 transition-transform hover:cursor-pointer hover:bg-base-200"
            >
              <div className="card-body">
                <div className="flex items-center gap-4">
                  <Icon icon="tabler:briefcase-2" className="size-15" />
                  <div className="grow space-y-2">
                    <h2 className="card-title">{user.name}</h2>
                    <p className="text-base-300/50 text-sm">{user.email}</p>
                    <span className="badge badge-accent badge-soft rounded-full">
                      {user.role === "ADMIN" && "Administrador"}
                      {user.role === "MERCADEO" && "Mercadeo"}
                      {user.role === "REPRESENTANTE" && "Comercial"}
                    </span>
                  </div>
                  <span className="badge badge-primary rounded-full">
                    Editar
                    <Icon icon="tabler:pencil" className="size-5" />
                  </span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
