import { Icon } from "@iconify/react";
import Link from "next/link";
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
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="../" className="btn btn-secondary btn-soft btn-circle">
          <Icon icon="tabler:arrow-left" className="size-5" />
        </Link>
        <h1 className="grow font-semibold text-xl sm:text-3xl">
          Detalles del Contacto
        </h1>
        <Link href={`./${contact.id}/edit`} className="btn btn-primary">
          <Icon icon="tabler:edit" className="size-5" /> Editar
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Sección de Información Principal */}
        <div className="space-y-6">
          {/* Tarjeta de Información Básica */}
          <div className="card card-border">
            <div className="card-header">
              <h2 className="card-title">Información básica</h2>
            </div>
            <div className="card-body grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="col-span-full">
                <h3 className="font-medium text-base-content/60 text-sm">
                  Nombre
                </h3>
                <p className="text-base">{contact.name}</p>
              </div>

              <div className="col-span-full">
                <h3 className="font-medium text-base-content/60 text-sm">
                  Correo
                </h3>
                <p className="text-base">{contact.email}</p>
              </div>

              <div>
                <h3 className="font-medium text-base-content/60 text-sm">
                  Teléfono
                </h3>
                <p className="text-base">{contact.phone}</p>
              </div>

              <div>
                <h3 className="font-medium text-base-content/60 text-sm">
                  Perfil
                </h3>
                <p className="text-base">
                  {contact.profile.name !== "Otros"
                    ? contact.profile.name
                    : contact.otherProfile}
                </p>
              </div>

              <div>
                <h3 className="font-medium text-base-content/60 text-sm">
                  Potencial estimado
                </h3>
                <PotentialBadge potential={contact.estimatedPotential} />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Tarjeta de Información Empresarial */}
          {(contact.company || contact.companyNit) && (
            <div className="card card-border">
              <div className="card-header">
                <h2 className="card-title">Información Empresarial</h2>
              </div>
              <div className="card-body grid grid-cols-1 gap-4 sm:grid-cols-2">
                {contact.company && (
                  <div>
                    <h3 className="font-medium text-base-content/60 text-sm">
                      Empresa
                    </h3>
                    <p className="text-base">{contact.company}</p>
                  </div>
                )}

                {contact.companyNit && (
                  <div>
                    <h3 className="font-medium text-base-content/60 text-sm">
                      NIT
                    </h3>
                    <p className="text-base">{contact.companyNit}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tarjeta de Ubicación */}
          <div className="card card-border">
            <div className="card-header">
              <h2 className="card-title">Ubicación</h2>
            </div>
            <div className="card-body grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <h3 className="font-medium text-base-content/60 text-sm">
                  País
                </h3>
                <p className="text-base">{contact.country}</p>
              </div>

              {contact.city && (
                <div>
                  <h3 className="font-medium text-base-content/60 text-sm">
                    Ciudad
                  </h3>
                  <p className="text-base">{contact.city}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sección de Venta */}
        {contact.sale && (
          <div className="space-y-6">
            <div className="card card-border">
              <div className="card-header">
                <h2 className="card-title">Venta</h2>
              </div>
              <div className="card-body grid grid-cols-1 gap-4">
                <div>
                  <h3 className="font-medium text-base-content/60 text-sm">
                    Valor estimado
                  </h3>
                  <p className="text-base">
                    {contact.sale?.amount === Amount.BAJA
                      ? "Entre 1 y 7 millones"
                      : contact.sale?.amount === Amount.MEDIO
                        ? "Entre 7 y 20 millones"
                        : contact.sale?.amount === Amount.ALTA
                          ? "Entre 20 y 50 millones"
                          : "Más de 50 millones"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
