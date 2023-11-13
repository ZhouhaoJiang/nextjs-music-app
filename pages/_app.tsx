import "@/styles/globals.css";
import React, { useEffect } from "react";
import { divider, NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { fontSans, fontMono } from "@/config/fonts";
import type { AppProps } from "next/app";
import store from "@/redux/store.tsx";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
    useEffect(() => {
        // 创建 script 标签
        const script = document.createElement('script');
        script.src = "https://fastly.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/autoload.js";
        script.async = true;

        // 将 script 标签添加到页面
        document.body.appendChild(script);

        // 清理函数
        return () => {
            document.body.removeChild(script);
        }
    }, []); // 空数组表示这个 effect 只在组件挂载时执行一次
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
