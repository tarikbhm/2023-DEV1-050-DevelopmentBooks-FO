"use client";
import { useState } from "react";
import { BookItemList } from "./bookItem/bookItemList";
import { Book } from "../types/Book";

type ShoppingBasketProps = {
    books: Book[];
}

export function ShoppingBasket({ books }: ShoppingBasketProps) {

    const [totalPrice, setTotalPrice] = useState<number>(0);

    const handlePriceUpdate = (price: number) => {
        setTotalPrice(price);
        console.log("price");
        console.log(price)
    };

    return (
        <div className="container mx-auto mt-10">
            <div className="flex shadow-md">
                <BookItemList books={books} handlePriceUpdate={handlePriceUpdate}></BookItemList>
                <div id="summary" className="w-1/4 px-8 py-10">
                    <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>

                    <div className="mt-8">
                        <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                            <span>Total cost</span>
                            <span>{totalPrice}</span>
                        </div>
                        <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">Checkout</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

