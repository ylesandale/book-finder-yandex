import React from "react";

import { Book } from "../pages/home";
import undefinedImg from "../img/undefined.png";

interface CardProps {
  onClickBook(book: Book): void;
  book: Book;
}

const BookCard: React.FC<CardProps> = ({ onClickBook, book }) => {
  return (
    <div onClick={() => onClickBook(book)} className="books-card">
      <div className="books-card__cover">
        <img
          src={
            book.cover_i
              ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
              : undefinedImg
          }
          alt="Book Cover"
        />
      </div>
      <div className="books-card__info">
        <h3 className="books-card__title">{book.title}</h3>
        <h5 className="books-card__author">
          {book.author_name ? book.author_name : "Unknown"}
        </h5>
      </div>
    </div>
  );
};

export default BookCard;
