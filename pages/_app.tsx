import "@/styles/globals.css";
import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { fontSans, fontMono } from "@/config/fonts";
import type { AppProps } from "next/app";
import store from "@/redux/store.tsx";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <NextUIProvider>
            <NextThemesProvider>
                <Provider store={store}>
                    <Component {...pageProps} />
                </Provider>
            </NextThemesProvider>
        </NextUIProvider>
    );
}

export const fonts = {
    sans: fontSans.style.fontFamily,
    mono: fontMono.style.fontFamily,
};
