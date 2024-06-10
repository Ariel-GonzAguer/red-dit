import React from "react";
import Footer from '../Footer/Footer'
import Header from '../Header/Header-Container'
import { Outlet } from "react-router-dom";

export default function Root() {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}