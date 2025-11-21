import { Suspense } from 'react';

import MainRoutes from "@pages/main.jsx"

import { BrowserRouter } from "react-router";
export const App = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Cargando ruta...</div>}>
                <MainRoutes />
            </Suspense>
        </BrowserRouter>
    );
}
