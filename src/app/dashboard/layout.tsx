import Link from "next/link";
import type { PropsWithChildren } from "react";

export default async function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <>
      <nav className="navbar relative z-1 border-base-content/25 border-b">
        <button
          type="button"
          className="btn btn-text btn-square me-2 lg:hidden"
          data-overlay="#default-sidebar"
        >
          <span className="icon-[tabler--menu-2] size-8"></span>
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
            <li>
              <Link href="/dashboard">
                <span className="icon-[tabler--home] size-5"></span>
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
        <div className="drawer-body" style={{ flexGrow: 0 }}>
          <ul className="menu p-0">
            <li>
              <Link
                href="/logout"
                className="flex flex-nowrap items-center gap-2 "
              >
                <span className="icon-[tabler--logout]"></span>
                Cerrar sesión
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      <main
        style={{ height: "calc(100dvh - 4rem)" }}
        className="container overflow-y-scroll py-8 lg:absolute lg:z-0 lg:ms-72 lg:w-auto"
      >
        {children}
      </main>
    </>
  );
}
