import { BACK_END } from "./components/constant";
import { ShoppingBasket } from "./components/shoppingBasket";
import { Book } from "./types/Book";

export default async function Home() {
  const books: Book[] = await getBooks();

  return (
    <ShoppingBasket books={books}></ShoppingBasket>
  )
}

async function getBooks() {
  const response = await fetch(BACK_END.base_url + BACK_END.books_path);
  return response.json();
}