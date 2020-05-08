import React from "react";
import { NavBar } from "../components/navbar/navbar";
import { Menu } from "../components/menu/menu";
import { Store } from "../states/cart/cart";


export const Home = () =>(
    <Store>
        <NavBar />
        <Menu />
    </Store>
);