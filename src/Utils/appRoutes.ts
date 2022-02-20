interface AppRoutes {
   authenticate: string;
   vault: string;
   favorites: string;
   cards: string;
   passwordGenerator: string;
   errorPage: string;
}

export const appRoutes: AppRoutes = {
   authenticate: "/",
   vault: "/vault",
   favorites: "/favorites",
   cards: "/cards",
   passwordGenerator: "/generator",
   errorPage: "/error",
};
