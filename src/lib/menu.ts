type MenuItem = {
  label: string;
  icon: string;
  path: string;
};

type MenuItemWithSubItems = {
  label: string;
  icon: string;
  subItems: (Omit<MenuItem, "icon"> & Partial<Pick<MenuItem, "icon">>)[];
};

export const menuItemsByRole: {
  [role in Role]: (MenuItem | MenuItemWithSubItems)[];
} = {
  // --- Menu para ADMIN ---
  ADMIN: [
    // { label: "Dashboard", path: "/dashboard", icon: "tabler:home" },
    {
      label: "Ferias",
      path: "/dashboard/fairs",
      icon: "tabler:calendar-event",
    },
    { label: "Usuarios", path: "/dashboard/users", icon: "tabler:users" },
  ],

  // --- Menu para MERCADEO ---
  MERCADEO: [
    // { label: "Dashboard", path: "/dashboard", icon: "tabler:home" },
    {
      label: "Ferias",
      path: "/dashboard/fairs",
      icon: "tabler:calendar-event",
    },
  ],

  // --- Menu para REPRESENTANTE ---
  REPRESENTANTE: [
    {
      label: "Ferias",
      icon: "tabler:calendar-event",
      path: "/dashboard/fairs",
    },
  ],
} as const;
