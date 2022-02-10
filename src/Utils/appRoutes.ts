interface AppRoutes {
   authenticate: string;
   vault: string;
   favorites: string;
   cards: string;
   passwordGenerator: string;
}

export const appRoutes: AppRoutes = {
   authenticate: "/",
   vault: "/vault",
   favorites: "/favorites",
   cards: "/cards",
   passwordGenerator: "/password-generator",
};
