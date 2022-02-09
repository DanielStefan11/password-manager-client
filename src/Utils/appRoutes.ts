interface AppRoutes {
   authenticate: string;
   vault: string;
   favorites: string;
   cards: string;
}

export const appRoutes: AppRoutes = {
   authenticate: "/",
   vault: "/vault",
   favorites: "/favorites",
   cards: "/cards",
};
