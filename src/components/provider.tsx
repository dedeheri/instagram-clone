"use client";

import { Provider as ProviderRedux } from "react-redux";
import store from "@/features/store";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>
        <ProviderRedux store={store}>{children}</ProviderRedux>
      </SessionProvider>
    </NextThemesProvider>
  );
};

export default Provider;
