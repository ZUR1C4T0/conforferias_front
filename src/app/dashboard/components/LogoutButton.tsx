"use client";

import { logout } from "../actions/logout";

export function LogoutButton({ className }: { className?: string }) {
  const handleLogout = async () => {
    await logout();
  };

  return (
    <form action={handleLogout}>
      <button type="submit" className={className}>
        Cerrar Sesión
        <span className="icon-[tabler--logout] size-4.5 shrink-0"></span>
      </button>
    </form>
  );
}
