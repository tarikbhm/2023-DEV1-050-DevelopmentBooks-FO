"use client";
import { useState } from "react";
import { Book } from "../../types/Book";

type BookItemProps = {
    book: Book;
    handleQuantity: (bookId: number, increment: boolean) => void;
}

export function BookItem({ book, handleQuantity }: BookItemProps) {
    const [quantity, setQuantity] = useState(0);

    const handlePlusClick = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
        handleQuantity(book.id, true);
    };

    const handleMinusClick = () => {
        if (quantity == 0) return;
        setQuantity((prevQuantity) => prevQuantity - 1);
        handleQuantity(book.id, false);
    };

    return (
        <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
            <div className="flex w-2/5">
                <div className="w-20">
                    <img src={book.imgUrl} alt={book.title} loading="lazy" />
                </div>
                <div className="flex flex-col justify-between ml-4 flex-grow">
                    <h1 className="flex-auto font-medium text-slate-900">
                        {book.title}
                    </h1>
                    <div className="w-full flex-none mt-2 order-1 text-3xl font-bold text-violet-600">
                        {book.price} EUR
                    </div>
                    <div className="text-sm font-medium text-slate-400">
                        In stock
                    </div>
                </div>
            </div>
            <div className="flex justify-center w-1/5">
                <svg onClick={handleMinusClick} className="fill-current text-gray-600 w-3" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                </svg>

                <input className="mx-2 border text-center w-8" type="text" value={quantity} />

                <svg onClick={handlePlusClick} className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                    <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                </svg>
            </div>
        </div>
    );
}

export default BookItem;