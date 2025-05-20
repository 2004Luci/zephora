import type { PropsWithChildren } from "react";
import Header from "./Header";

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <div className="bg-gradient-to-br from-background to-muted">
            <Header />
            <main className="min-h-screen container mx-auto px-4 py-8">
                {children}
            </main>
            <footer className="border-t backdrop-blur py-12 supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-4 text-center text-gray-400 flex justify-between">
                    <span>Zephora ©{new Date().getFullYear()} | All rights reserved. </span>
                    <div className="flex flex-row gap-1">
                        <span>Made by</span>
                        <a href="https://www.mit4sheth.dev" target="_blank" rel="author" className="text-blue-500">Mit</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Layout