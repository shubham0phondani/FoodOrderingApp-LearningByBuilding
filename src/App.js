import React from "react";
import ReactDOM from "react-dom/client"
import RestaurantMenu from "./pages/RestaurantMenu.js";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ErrorElement from "./pages/ErrorElement";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

const Applayout = () => {
    return (
        <div className="app">
            <Header />
            <Outlet />
        </div>
    )
}


const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <Applayout />,
        errorElement: <ErrorElement />,
        children: ([
            {
                path: "/",
                element: <Body />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/contact",
                element: <Contact />
            },
            {
                path:"/restaurants/:resId",
                element: <RestaurantMenu/>
            }
        ])
    },

])

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />)
