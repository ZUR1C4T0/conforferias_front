import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { secureFetch } from "@/lib/axios";
import { PotentialBadge } from "./PotentialBadge";

export default async function ContactsTable({ fairId }: { fairId: string }) {
  const contacts = await secureFetch<Contact[]>({
    url: `/fairs/${fairId}/contacts`,
    method: "GET",
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Perfil</TableHead>
          <TableHead>Potencial</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contacts.length === 0 && (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              No hay contactos
            </TableCell>
          </TableRow>
        )}

        {contacts.map((contact) => (
          <TableRow key={contact.id} className="relative cursor-pointer">
            <TableCell>
              {contact.name}
              <br />
              <span className="text-muted-foreground text-xs">
                {contact.company || "-"}
              </span>
            </TableCell>
            <TableCell>{contact.profile.name}</TableCell>
            <TableCell>
              <PotentialBadge potential={contact.estimatedPotential} />
            </TableCell>
            <TableCell>
              <Link
                href={`./${fairId}/contacts/${contact.id}`}
                className="after:absolute after:inset-0"
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
