"use client";

import { Book } from "@/app/types/Book";
import BookItem from "./bookItem";
import { useEffect, useState } from 'react';
import { BACK_END } from "../constant";

type BookItemListProps = {
  books: Book[];
  handlePriceUpdate: (price: number) => void;
}

interface CartBook {
  bookId: number;
  quantity: number;
}


export function BookItemList({ books, handlePriceUpdate }: BookItemListProps) {


  const [cartBooks, setCartBooks] = useState<CartBook[]>([]);

  const handleQuantity = (bookId: number, increment: boolean) => {
    const cartBook = cartBooks.find((book) => book.bookId === bookId);

    if (cartBook) {
      if (increment) {
        cartBook.quantity += 1;
      } else {
        cartBook.quantity -= 1;
        if (cartBook.quantity < 1) {
          setCartBooks(cartBooks.filter((book) => book.bookId !== bookId));
          return;
        }
      }
      setCartBooks([...cartBooks]);
    } else {
      setCartBooks([...cartBooks, { bookId, quantity: 1 }]);
    }
  };

  useEffect(() => {
    calculatePrice();
  }, [cartBooks]);

  async function calculatePrice() {
    console.log(JSON.stringify(cartBooks));
    const response = await fetch(BACK_END.base_url + BACK_END.price_path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cartBooks),
    });
    const result = await response.json();
    handlePriceUpdate(result);
  }

  return (
    <div className="w-3/4 bg-white px-10">
      <div className="flex justify-between border-b pb-8">
        <h1 className="font-semibold text-2xl">Shopping Cart</h1>
      </div>
      <div className="flex mt-10 mb-5">
        <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
        <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Quantity</h3>
      </div>
      {books.map(book => (
        <BookItem book={book} handleQuantity={handleQuantity}></BookItem>
      ))}
    </div>
  )

}