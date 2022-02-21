interface AppRoutes {
   authenticate: string;
   vault: string;
   favorites: string;
   cards: string;
   passwordGenerator: string;
   settings: string;
   errorPage: string;
}

export const appRoutes: AppRoutes = {
   authenticate: "/",
   vault: "/vault",
   favorites: "/favorites",
   cards: "/cards",
   passwordGenerator: "/generator",
   settings: "/settings",
   errorPage: "/error",
};
