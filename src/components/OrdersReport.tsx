"use client";

import {useEffect, useState} from "react";

import { getJSONData } from '@/tools/Toolkit';
import { Orders, Order, Topping, Note } from '@/tools/orders.model';
import LoadingOverlay from "./LoadingOverlay";

export default function OrdersReport({setAppState, appState}:{setAppState:Function, appState:number}) {
    // retrieve server sided script
    const RETRIEVE_SCRIPT:string = "https://www.seanmorrow.ca/_lessons/retrieveOrder.php";

    // -------------------------- private methods
    const getOrders = async () => {
        const data:Orders = await getJSONData(RETRIEVE_SCRIPT, false, true);
        // console.log(data);

        // save it in a state variable - because it is used in JSX and needs to persist
        setOrders(data.orders);

        // data all loaded! Change app state of web app
        setAppState(3);
    }


    // -------------------------- use effects
    useEffect(() => {
        if (appState == 2) getOrders();
    }, [appState]);

    // -------------------------- state variables
    const [orders, setOrders] = useState<Order[]>([]);
  
    if (appState == 1) {
        return (<>No orders retrieved...</>);
    } else if (appState == 2) {
        return (
            <>
                <div className="flex justify-center">
                    <div className="pr-4">Loading</div>
                    <LoadingOverlay show={true} showSpinner={true} spinnerColor="#545454" bgColor="#EDEDED" />
                </div>
            </>
        );
    } else if (appState == 3) {
        console.log(orders);
        return (
            <>
                {orders.map((order:Order, i:number) =>
                    <div className="flex flex-col flex-initial text-base font-bold py-4" key={i}>
                        <div className="text-2xl text-red-600">Order #{order.id}</div>

                        <div className="pt-2"><i className="fas fa-info-circle"></i> Customer Information</div>
                        <div className="font-normal">{order.name}</div>
                        <div className="font-normal">{order.address}</div>
                        <div className="font-normal">{order.city}</div>

                        <div className="pt-2"><i className="fas fa-pizza-slice"></i> Pizza Size</div>
                        <div className="font-normal">{order.size}</div>

                        <div className="pt-2"><i className="fas fa-list-ul"></i> Order Details</div>
                        {order.toppings.map((topping:Topping, n:number) =>
                            <div className="font-normal" key={n}>{topping.topping}</div>
                        )}

                        <div className="pt-2"><i className="fas fa-sticky-note"></i> Order Notes</div>
                        {order.notes.map((note:Note, n:number) =>
                            <div className="font-normal" key={n}>{note.note}</div>
                        )}
                    </div>
                )}
            </>
        );
    }
}