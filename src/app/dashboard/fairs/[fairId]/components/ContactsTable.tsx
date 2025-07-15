import { Icon } from "@iconify/react";
import Link from "next/link";
import { secureFetch } from "@/lib/axios";
import { PotentialBadge } from "./PotentialBadge";

export default async function ContactsTable({ fairId }: { fairId: string }) {
  const contacts = await secureFetch<Contact[]>({
    url: `/fairs/${fairId}/contacts`,
    method: "GET",
  });

  return (
    <div className="overflow-x-auto">
      <table className="table-sm table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Empresa</th>
            <th>Perfil</th>
            <th>Potencial</th>
            <th>
              <i>Ver detalles</i>
            </th>
          </tr>
        </thead>
        <tbody>
          {contacts.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center">
                No hay contactos
              </td>
            </tr>
          )}

          {contacts.map((contact) => (
            <tr key={contact.id} className="row-hover hover:cursor-pointer">
              <td>{contact.name}</td>
              <td>{contact.company || "-"}</td>
              <td>{contact.profile.name}</td>
              <td>
                <PotentialBadge potential={contact.estimatedPotential} />
              </td>
              <td>
                <Link
                  href={`./${fairId}/contacts/${contact.id}`}
                  className="btn btn-primary btn-soft"
                >
                  <Icon icon="tabler:arrow-right" className="size-5" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
