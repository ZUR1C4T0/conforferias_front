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

export default async function CompetitorsTable({ fairId }: { fairId: string }) {
  const competitors = await secureFetch<Competitor[]>({
    url: `/fairs/${fairId}/competitors`,
    method: "GET",
  });

  return (
    <Table className="table overflow-x-auto">
      <TableHeader>
        <TableRow>
          <TableHead>Empresa</TableHead>
          <TableHead>País</TableHead>
          <TableHead>Ciudad</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {!competitors.length && (
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              No hay competidores registrados
            </TableCell>
          </TableRow>
        )}

        {competitors.map((competitor) => (
          <TableRow key={competitor.id} className="relative cursor-pointer">
            <TableCell>{competitor.company}</TableCell>
            <TableCell>{competitor.country}</TableCell>
            <TableCell>{competitor.city || "-"}</TableCell>
            <TableCell>
              <Link
                href={`./${fairId}/competitors/${competitor.id}`}
                className="after:absolute after:inset-0"
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
