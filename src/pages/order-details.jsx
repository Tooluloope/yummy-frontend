import React from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/loader/loader";
import useFetch from "../hooks/fetch";
import {OrderItem} from "./order-item";
import { formatDate, eurosToUsd } from "../components/utils";
import PropTypes from "prop-types";

const OrderDetails  = ({pizzas}) => {
    let { id } = useParams();
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Token ${localStorage.getItem("token")}`);
    const requestOptions = {
    method: "GET",
    headers: myHeaders,
    };
    const url = `https://yummy-pizzapi.herokuapp.com/api/orders/${id}`;
    
    const {data, error, isLoading} = useFetch(url, requestOptions);

    if( isLoading || error || !data) {
        return( 
             <div>
                 {isLoading  ?  <Loader /> : error}
             </div>
        );
    }
    
    return (
        <div className=" p-4  items-center  container mx-auto">
            
            <p>Order details</p>
            <hr />
            <div className="sm:flex sm:flex-wrap items-center justify-center">
                {data && data.item.map(id => {
                    const uuid = id.split("/")[5];
                    return (
                        <OrderItem pizzas = {pizzas} key={uuid} id = {uuid}></OrderItem>
                    );}
                )}
            </div>
            <div className=" m-6">
                <p className="p-3 border">Ordered at: <span className="pl-4 text-xs text-gray-800">{formatDate(data.created_at)}</span></p>
                <p className="p-3 border border-t-0">Total: <span className="pl-4 text-xs text-gray-800"> € {data.total}</span></p>
                <p className="p-3 border border-t-0">Total: <span className="pl-4 text-xs text-gray-800"> $ {eurosToUsd(data.total)}</span></p>
                <p className="p-3 border border-t-0">Name: <span className="pl-4 text-xs text-gray-800">  {data.name}</span></p>
                <p className="p-3 border border-t-0">Delivered To: <span className="pl-4 text-xs text-gray-800">  {data.address}</span></p>
            </div>
        </div>
    );
};

OrderDetails.propTypes = {
    pizzas: PropTypes.array
};

export default OrderDetails;