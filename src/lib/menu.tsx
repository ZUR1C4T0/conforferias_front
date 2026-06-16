import { Calendar, User } from "lucide-react";
import type { JSX } from "react";

type MenuItem = {
  label: string;
  icon: JSX.Element;
  path: string;
};

type MenuItemWithSubItems = {
  label: string;
  icon: JSX.Element;
  subItems: (Omit<MenuItem, "icon"> & Partial<Pick<MenuItem, "icon">>)[];
};

export const menuItemsByRole: {
  [role in Role]: MenuItem[];
} = {
  // --- Menu para ADMIN ---
  ADMIN: [
    {
      label: "Ferias",
      path: "/dashboard/fairs",
      icon: <Calendar />,
    },
    {
      label: "Usuarios",
      path: "/dashboard/users",
      icon: <User />,
    },
  ],

  // --- Menu para MERCADEO ---
  MERCADEO: [
    {
      label: "Ferias",
      path: "/dashboard/fairs",
      icon: <Calendar />,
    },
  ],

  // --- Menu para REPRESENTANTE ---
  REPRESENTANTE: [
    {
      label: "Ferias",
      icon: <Calendar />,
      path: "/dashboard/fairs",
    },
  ],
} as const;
