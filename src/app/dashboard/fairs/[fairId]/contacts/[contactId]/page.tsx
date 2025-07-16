import { Icon } from "@iconify/react";
import Link from "next/link";
import { secureFetch } from "@/lib/axios";
import { formatDate } from "@/utils/formatDate";
import { PotentialBadge } from "../../components/PotentialBadge";

export interface Contact {
  id: string;
  fairId: string;
  name: string;
  email: string;
  phone: string;
  profileId: string;
  otherProfile: string | null;
  company: string | null;
  companyNit: string | null;
  country: string;
  city: string | null;
  interestProducts: string | null;
  estimatedPotential: string;
  createdById: string;
  createdAt: string;
  updatedAt: string;
  profile: {
    id: string;
    name: string;
    description: string | null;
  };
  tracking: {
    id: string;
    note: string;
    createdAt: string;
  }[];
}

export default async function ContactPage({ params }: NextPageContext) {
  const { contactId } = await params;
  const contact = await secureFetch<Contact>({
    url: `/contacts/${contactId}`,
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
              <h2 className="card-title">Información del Contacto</h2>
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
        </div>

        {/* Sección de Ubicación y Productos */}
        <div className="space-y-6">
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

          {/* Tarjeta de Productos de Interés */}
          {contact.interestProducts && (
            <div className="card card-border">
              <div className="card-header">
                <h2 className="card-title">Productos de Interés</h2>
              </div>
              <div className="card-body">
                <p className="whitespace-pre-line">
                  {contact.interestProducts}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Historial de Seguimiento */}
      <div className="card card-border">
        <div className="card-header flex items-center justify-between">
          <h2 className="card-title">Historial de Seguimiento</h2>
          <button type="button" className="btn btn-primary btn-sm">
            <Icon icon="tabler:plus" className="size-4" />{" "}
            <span className="hidden sm:inline">Nueva Nota</span>
          </button>
        </div>
        <div className="card-body">
          {contact.tracking.length === 0 ? (
            <p className="py-4 text-center text-base-content/60">
              No hay registros de seguimiento
            </p>
          ) : (
            <ul className="space-y-4">
              {contact.tracking.map((item) => (
                <li
                  key={item.id}
                  className="border-base-content/10 border-b pb-4 last:border-0"
                >
                  <div className="flex items-start justify-between">
                    <p className="whitespace-pre-line">{item.note}</p>
                    <span className="ml-4 shrink-0 text-base-content/60 text-sm">
                      {formatDate(item.createdAt)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
