import {
  ArrowLeft,
  BadgeDollarSign,
  Briefcase,
  Building,
  Edit,
  Globe,
  IdCard,
  Mail,
  MapPin,
  Phone,
  User,
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
import { secureFetch } from "@/lib/axios";
import { Amount } from "@/lib/constants";
import { PotentialBadge } from "../../components/PotentialBadge";

export default async function ContactPage({ params }: NextPageContext) {
  const { fairId, contactId } = await params;
  const contact = await secureFetch<Contact>({
    url: `/fairs/${fairId}/contacts/${contactId}`,
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
          Detalles del contacto
        </h1>
        <Button className="ml-auto" asChild>
          <Link href={`./${contact.id}/edit`}>
            <Edit data-icon="inline-start" />
            Editar
          </Link>
        </Button>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Información del contacto</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup className="grid @lg:grid-cols-2">
            <Field>
              <FieldLabel>Nombre</FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <User />
                </InputGroupAddon>
                <InputGroupInput value={contact.name} readOnly />
              </InputGroup>
            </Field>
            <Field>
              <FieldLabel>Correo electrónico</FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <Mail />
                </InputGroupAddon>
                <InputGroupInput value={contact.email} readOnly />
              </InputGroup>
            </Field>
            <Field>
              <FieldLabel>Teléfono</FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <Phone />
                </InputGroupAddon>
                <InputGroupInput value={contact.phone} readOnly />
              </InputGroup>
            </Field>
            <Field>
              <FieldLabel>Perfil</FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <Briefcase />
                </InputGroupAddon>
                <InputGroupInput
                  value={
                    contact.profile.name !== "Otros"
                      ? contact.profile.name
                      : (contact.otherProfile ?? "-")
                  }
                  readOnly
                />
              </InputGroup>
            </Field>
            <Field orientation="horizontal">
              <FieldLabel style={{ flex: "none" }}>
                Potencial estimado
              </FieldLabel>
              <PotentialBadge potential={contact.estimatedPotential} />
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Información Empresarial</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup className="grid @lg:grid-cols-2">
            <Field>
              <FieldLabel>Empresa</FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <Building />
                </InputGroupAddon>
                <InputGroupInput
                  value={contact.company ?? ""}
                  placeholder="Sin información"
                  readOnly
                />
              </InputGroup>
            </Field>
            <Field>
              <FieldLabel>NIT</FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <IdCard />
                </InputGroupAddon>
                <InputGroupInput
                  value={contact.companyNit ?? ""}
                  placeholder="Sin información"
                  readOnly
                />
              </InputGroup>
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ubicación</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup className="grid @lg:grid-cols-2">
            <Field>
              <FieldLabel>País</FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <Globe />
                </InputGroupAddon>
                <InputGroupInput
                  value={contact.country}
                  placeholder="Sin información"
                  readOnly
                />
              </InputGroup>
            </Field>
            <Field>
              <FieldLabel>Ciudad</FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <MapPin />
                </InputGroupAddon>
                <InputGroupInput
                  value={contact.city ?? ""}
                  placeholder="Sin información"
                  readOnly
                />
              </InputGroup>
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Venta</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup className="grid @lg:grid-cols-2">
            <Field>
              <FieldLabel>Valor aproximado</FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <BadgeDollarSign />
                </InputGroupAddon>
                <InputGroupInput
                  value={
                    contact.sale?.amount === Amount.BAJA
                      ? "Entre 1 y 7 millones"
                      : contact.sale?.amount === Amount.MEDIO
                        ? "Entre 7 y 20 millones"
                        : contact.sale?.amount === Amount.ALTA
                          ? "Entre 20 y 50 millones"
                          : contact.sale?.amount === Amount.SUPERIOR
                            ? "Más de 50 millones"
                            : ""
                  }
                  placeholder="Sin información"
                  readOnly
                />
              </InputGroup>
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>
    </div>
  );
}
