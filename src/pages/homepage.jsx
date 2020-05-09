import React from "react";
import { NavBar } from "../components/navbar/navbar";
import { Menu } from "../components/menu/menu";
import { Store } from "../states/cart/cart";
import { Route} from "react-router-dom";
import { Orders } from "./orders";



export const Home = () =>(
    <Store>
        <NavBar />

            <Route path="/orders" component={Orders} />
            <Route path="/" component={Menu} />
      
    </Store>
);