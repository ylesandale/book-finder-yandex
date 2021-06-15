/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

import { setCurrentBook, CurrentBook } from "../redux/appReducer";
import { Header, SearchForm, BookCard, BookModal } from "../components";

export interface Book {
  title: string;
  author_name: string;
  cover_i: number;
  key?: string;
  first_publish_year?: number;
  isbn?: string[] | null;
  publisher_facet: string[] | null;
}

export const Home: React.FC = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = React.useState(false);
  const [allowSend, setAllowSend] = React.useState(false);
  const [visibleError, setVisibleError] = React.useState(false);
  const [visiblePopup, setVisiblePopup] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [books, setBooks] = React.useState<Book[] | []>([]);

  const onGetBookInfo = (book: CurrentBook) => {
    dispatch(setCurrentBook(book));
  };

  const onGetBooks = async () => {
    try {
      await setAllowSend(false);
      setVisibleError(false);
      setLoading(true);
      const { data } = await axios.get(
        `https://openlibrary.org/search.json?title=${searchValue.replace(/ /g, "+")}`,
      );
      if (data.numFound === 0) {
        setLoading(false);
        setVisibleError(true);
        return;
      }
      setBooks(data.docs);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setVisibleError(true);
    }
  };

  const onClickBook = (book: Book) => {
    const obj = {
      title: book.title,
      author: book.author_name ? book.author_name : "Unknown",
      firstPublished: book.first_publish_year ? book.first_publish_year : "Unknown",
      img: book.cover_i,
      ISBN: book.isbn ? book.isbn[0] : "Unknown",
      edition: book.publisher_facet ? book.publisher_facet[0] : "Unknown",
    };
    onGetBookInfo(obj);
    setVisiblePopup(true);
  };

  const setValue = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    await setAllowSend(false);
    setTimeout(() => setAllowSend(true), 3000);
  };

  React.useEffect(() => {
    if (allowSend) {
      onGetBooks();
    }
  }, [allowSend]);

  return (
    <div className="wrapper">
      {visiblePopup && <BookModal onClose={() => setVisiblePopup(false)} />}
      <div className="container">
        <Header />
        <SearchForm
          value={searchValue}
          setValue={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e)}
          onGetBooks={onGetBooks}
          loading={loading}
        />
        <main className="books">
          {books.length < 1 && !loading && !visibleError && (
            <h3 className="books-loading__title">Пожалуйста, введите название книги</h3>
          )}
          {loading && <h3 className="books-loading__title">Идёт загрузка...</h3>}
          {!loading &&
            books.map((book) => (
              <BookCard key={book.key} onClickBook={onClickBook} book={book} />
            ))}
          {visibleError && (
            <h3 className="books-loading__title">По данному запросу ничего не найдено</h3>
          )}
        </main>
      </div>
    </div>
  );
};
