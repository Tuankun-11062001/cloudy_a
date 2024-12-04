import React from "react";

import BookTabs from "../components/bookTab";
import {
  BooksCategoryContent,
  BooksChapterContent,
  BooksContent,
} from "../components/bookContent";

const BookPage = () => {
  return (
    <div className="books">
      <BookTabs />
      <div className="books_container">
        <BooksContent />
        <BooksChapterContent />
        <BooksCategoryContent />
      </div>
    </div>
  );
};

export default BookPage;
