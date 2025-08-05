import { Icon } from "@iconify/react";
import Link from "next/link";
import type { PropsWithChildren } from "react";
import { getRole } from "@/lib/getRole";
import { menuItemsByRole } from "@/lib/menu";
import { slugify } from "@/utils/slugify";

export default async function DashboardLayout({ children }: PropsWithChildren) {
  const role = await getRole();

  return (
    <>
      <nav className="navbar relative z-1 border-base-content/25 border-b">
        <button
          type="button"
          className="btn btn-primary btn-text btn-square me-2 lg:hidden"
          data-overlay="#default-sidebar"
        >
          <Icon icon="tabler:menu-2" className="size-8" />
        </button>
        <div className="flex flex-1 items-center">
          <Link
            href="/dashboard"
            className="link link-neutral font-semibold text-base-content text-xl no-underline"
          >
            Conforferias
          </Link>
        </div>
      </nav>

      <aside
        id="default-sidebar"
        className="overlay drawer drawer-start hidden max-w-72 overlay-open:translate-x-0 [--auto-close:lg] lg:absolute lg:z-0 lg:flex lg:h-dvh lg:translate-x-0 lg:pt-16"
        tabIndex={-1}
      >
        <button
          type="button"
          className="btn btn-circle btn-text btn-secondary absolute top-3 right-3 lg:hidden"
          data-overlay="#default-sidebar"
        >
          <span className="icon-[tabler--x] size-6"></span>
        </button>
        <div className="drawer-body pt-12 lg:pt-4">
          <ul className="menu p-0">
            {menuItemsByRole[role].map((item) => {
              if ("subItems" in item) {
                return (
                  <li key={item.label} className="space-y-0.5">
                    <button
                      type="button"
                      className="collapse-toggle open collapse-open:bg-base-content/10"
                      id={`menu-${slugify(item.label)}`}
                      data-collapse={`#menu-${slugify(item.label)}-collapse`}
                    >
                      <Icon icon={item.icon} className="size-5" />
                      {item.label}
                      <Icon
                        icon="tabler:chevron-down"
                        className="size-4 collapse-open:rotate-180 transition-all duration-300"
                      />
                    </button>
                    <ul
                      id={`menu-${slugify(item.label)}-collapse`}
                      className="open collapse w-auto space-y-0.5 overflow-hidden transition-[height] duration-300"
                    >
                      {item.subItems.map((subitem) => (
                        <li key={subitem.label}>
                          <Link href={subitem.path}>
                            {subitem.icon && (
                              <Icon icon={subitem.icon} className="size-5" />
                            )}
                            {subitem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              }
              return (
                <li key={item.label}>
                  <Link href={item.path}>
                    <Icon icon={item.icon} className="size-5" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="drawer-body" style={{ flexGrow: 0 }}>
          <ul className="menu p-0">
            <li>
              <Link
                href="/logout"
                className="flex flex-nowrap items-center gap-2"
                prefetch={false}
              >
                <Icon icon="tabler:logout" className="size-5" />
                Cerrar sesión
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      <main className="overflow-y-auto lg:z-0 lg:ms-72 lg:h-[calc(100dvh-4rem)] lg:w-[calc(100dvw-18rem)]">
        <div className="container py-8">{children}</div>
      </main>
    </>
  );
}
