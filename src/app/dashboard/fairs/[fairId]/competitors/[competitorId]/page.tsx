import {
  ArrowLeft,
  Building,
  Edit,
  Globe,
  MapPin,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Textarea } from "@/components/ui/textarea";
import { secureFetch } from "@/lib/axios";

export default async function CompetitorDetailsPage({
  params,
}: NextPageContext) {
  const { fairId, competitorId } = await params;
  const competitor = await secureFetch<Competitor>({
    url: `/fairs/${fairId}/competitors/${competitorId}`,
    method: "GET",
  });

  return (
    <div className="@container flex flex-col gap-6">
      <header className="flex items-center gap-4">
        <Button variant="ghost" asChild>
          <Link href="../">
            <ArrowLeft data-icon="inline-start" />
          </Link>
        </Button>
        <h1 className="scroll-m-20 font-semibold text-2xl tracking-tight">
          Detalles del competidor
        </h1>
        <Button className="ml-auto" asChild>
          <Link href={`./${competitor.id}/edit`}>
            <Edit data-icon="inline-start" />
            Editar
          </Link>
        </Button>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Información general</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup className="grid @lg:grid-cols-2">
            <Field>
              <FieldLabel>Empresa</FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <Building />
                </InputGroupAddon>
                <InputGroupInput value={competitor.company} readOnly />
              </InputGroup>
            </Field>

            <Field>
              <FieldLabel>País</FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <Globe />
                </InputGroupAddon>
                <InputGroupInput value={competitor.country} readOnly />
              </InputGroup>
            </Field>

            <Field>
              <FieldLabel>Ciudad</FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <MapPin />
                </InputGroupAddon>
                <InputGroupInput
                  value={competitor.city ?? ""}
                  placeholder="Sin información"
                  readOnly
                />
              </InputGroup>
            </Field>

            <Field className="col-span-full">
              <FieldLabel>Productos destacados</FieldLabel>
              <Textarea
                className="resize-none"
                value={competitor.featuredProducts}
                readOnly
              />
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Fortalezas y Debilidades</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel>
                <ThumbsUp className="size-4" /> Fortalezas
              </FieldLabel>
              <Textarea
                className="resize-none"
                value={competitor.strengths}
                readOnly
              />
            </Field>

            <Field>
              <FieldLabel>
                <ThumbsDown className="size-4" /> Debilidades
              </FieldLabel>
              <Textarea
                className="resize-none"
                value={competitor.weaknesses}
                readOnly
              />
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>
    </div>
  );
}
