import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { appSvg } from "../../../../../data/svg";
import TipTap from "../../../components/rickText";
import {
  createCategoryThunk,
  getCategoryThunk,
} from "../../../../../store/slices/categorySlide";
import {
  createBlogsThunk,
  getBlogsThunk,
} from "../../../../../store/slices/blogSlice";
import { BookCard, BookCategoryCard, BookChapterCard } from "./bookCard";
import {
  createBooksThunk,
  getBooksThunk,
} from "../../../../../store/slices/bookSlice";
import {
  createChapterThunk,
  getChapterThunk,
} from "../../../../../store/slices/chapterSlice";

export const BooksContent = () => {
  const { books } = useSelector((state) => state.books);
  const { book } = useSelector((state) => state.category);

  const dispatch = useDispatch();

  const [query, setQuery] = useState({
    category: "",
    title: "",
    trending: false,
    public: false,
    slider: false,
  });

  const handleChangeQuery = (e) => {
    const { name, value } = e.target;
    setQuery((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleQuery = (key, value) => {
    setQuery((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  useEffect(() => {
    const queryParams = Object.entries(query)
      .filter(
        ([key, value]) => value !== null && value !== "" && value !== false
      ) // Chỉ giữ lại các tham số có giá trị
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`) // Mã hóa giá trị để đảm bảo an toàn
      .join("&"); // Kết hợp các tham số với dấu '&'

    const stringQuery = queryParams ? `?${queryParams}` : ""; // Nếu có tham số thì thêm dấu hỏi

    console.log(stringQuery); // Xem chuỗi truy vấn

    dispatch(getBooksThunk(stringQuery));
  }, [query]);

  const handleShowCreate = (e) => {
    const boxCreate = e.target
      .closest(".books_content")
      .querySelector(".books_content_create");
    boxCreate.classList.toggle("active");
  };

  const initState = {
    thumbnailBanner: "",
    title: "",
    author: "",
    thumbnail: "",
    linkYoutube: "",
    category: "",
    release: "",
    description: "",
  };

  const [bookData, setBookData] = useState(initState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async () => {
    try {
      const resultAction = await dispatch(createBooksThunk(bookData));
      const result = unwrapResult(resultAction);
      setBookData(initState);
    } catch (error) {
      console.error("Submit failed:", error);
    }
  };

  return (
    <div className="tab_content books_content active" data-content="book">
      <div className="books_content_head">
        <p onClick={handleShowCreate}>Create one</p>
        <span>Filter</span>
        <p className="active">All</p>
        <select
          name="category"
          onChange={handleChangeQuery}
          value={query.category}
        >
          <option value="">Choose</option>
          {book.map((item) => (
            <option value={item._id} key={item._id}>
              {item.categoryName}
            </option>
          ))}
        </select>

        <p
          onClick={() => handleQuery("public", !query.public)}
          className={query.public ? "active" : ""}
        >
          Public
        </p>
        <p
          onClick={() => handleQuery("trending", !query.trending)}
          className={query.trending ? "active" : ""}
        >
          Trending
        </p>
        <p
          onClick={() => handleQuery("slider", !query.slider)}
          className={query.slider ? "active" : ""}
        >
          Slider
        </p>
        <input
          placeholder="Search Lyrics"
          name="title"
          onChange={handleChangeQuery}
          value={query.title}
        />
      </div>

      <div className="books_content_create">
        <div className="books_content_create_left">
          <div className="create_g">
            <span>Book Name</span>
            <input
              placeholder="Book Name..."
              name="title"
              onChange={handleChange}
              value={bookData.title}
            />
          </div>
          <div className="create_g">
            <span>Author Book</span>
            <input
              placeholder="Author Book..."
              name="author"
              onChange={handleChange}
              value={bookData.author}
            />
          </div>
          <div className="create_g">
            <span>Book link thumbnail</span>
            <input
              placeholder="Book image"
              name="thumbnail"
              onChange={handleChange}
              value={bookData.thumbnail}
            />
          </div>

          <div className="create_g">
            <span>Book link thumbnail Banner</span>
            <input
              placeholder="Book thumbnail Banner"
              name="thumbnailBanner"
              onChange={handleChange}
              value={bookData.thumbnailBanner}
            />
          </div>

          <div className="create_g">
            <span>Book Link Youtube</span>
            <input
              placeholder="Book link Youtube"
              name="linkYoutube"
              onChange={handleChange}
              value={bookData.linkYoutube}
            />
          </div>

          <div className="create_g">
            <span>Book Category</span>
            <select
              name="category"
              onChange={handleChange}
              value={bookData.category}
            >
              <option value="">Choose</option>
              {book.map((item) => (
                <option value={item._id} key={item._id}>
                  {item.categoryName}
                </option>
              ))}
            </select>
          </div>

          <div className="create_g">
            <span>Book release</span>
            <input
              placeholder="Blogs release"
              name="release"
              onChange={handleChange}
              value={bookData.release}
            />
          </div>

          <div className="create_g">
            <span>Bokk description</span>
            <textarea
              placeholder="Blog description"
              name="description"
              onChange={handleChange}
              value={bookData.description}
            />
          </div>
          <p className="submit" onClick={handleSubmit}>
            Create
          </p>
        </div>
      </div>

      <div className="books_content_list">
        <div className="books_content_list_head">
          <p>No.</p>
          <p>Public</p>
          <p>Slider</p>
          <p>Trending</p>
          <p className="books_title">Title</p>
          <p>Author</p>
          <p>Views</p>
          <p>Share</p>
          <p>Chapters</p>
          <p>category</p>
          <p>cloudy</p>
          <p>Comment</p>
        </div>

        <div className="books_content_list_content">
          {books.map((book, i) => (
            <BookCard data={book} key={book._id} indx={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const BooksChapterContent = () => {
  const { chapters } = useSelector((state) => state.chapters);
  const { books } = useSelector((state) => state.books);

  const dispatch = useDispatch();

  const [query, setQuery] = useState({
    category: "",
    title: "",
    trending: false,
    public: false,
    slider: false,
  });

  const handleChangeQuery = (e) => {
    const { name, value } = e.target;
    setQuery((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleQuery = (key, value) => {
    setQuery((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  useEffect(() => {
    const queryParams = Object.entries(query)
      .filter(
        ([key, value]) => value !== null && value !== "" && value !== false
      ) // Chỉ giữ lại các tham số có giá trị
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`) // Mã hóa giá trị để đảm bảo an toàn
      .join("&"); // Kết hợp các tham số với dấu '&'

    const stringQuery = queryParams ? `?${queryParams}` : ""; // Nếu có tham số thì thêm dấu hỏi

    console.log(stringQuery); // Xem chuỗi truy vấn

    dispatch(getChapterThunk(stringQuery));
  }, [query]);

  const handleShowCreate = (e) => {
    const boxCreate = e.target
      .closest(".books_chapter_content")
      .querySelector(".books_chapter_content_create");
    boxCreate.classList.toggle("active");
  };

  const initState = {
    book: "",
    title: "",
    content: "",
    index: null,
  };

  const [chapterData, setChapterData] = useState(initState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChapterData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleChangeChapter = (data) => {
    setChapterData((prev) => {
      return {
        ...prev,
        content: data,
      };
    });
  };

  const handleSubmit = async () => {
    try {
      const resultAction = await dispatch(createChapterThunk(chapterData));
      const result = unwrapResult(resultAction);
      setBlogData(initState);
    } catch (error) {
      console.error("Submit failed:", error);
    }
  };

  return (
    <div className="tab_content books_chapter_content" data-content="chapter">
      <div className="books_content_head">
        <p onClick={handleShowCreate}>Create one</p>
        <span>Filter</span>
        <p className="active">All</p>
        <select name="book" onChange={handleChangeQuery} value={query.book}>
          <option value="">Choose</option>
          {books.map((item) => (
            <option value={item._id} key={item._id}>
              {item.title}
            </option>
          ))}
        </select>

        <input
          placeholder="Search Chapter"
          name="title"
          onChange={handleChangeQuery}
          value={query.title}
        />
      </div>

      <div className="books_chapter_content_create">
        <div className="books_chapter_content_create_left">
          <div className="create_g">
            <span>Blog Name</span>
            <select
              onChange={handleChange}
              value={chapterData.book}
              name="book"
            >
              <option>Choose</option>
              {books.map((book) => (
                <option value={book._id} key={book._id}>
                  {book.title}
                </option>
              ))}
            </select>
          </div>
          <div className="create_g">
            <span>Chapter name</span>
            <input
              placeholder="blog Name..."
              name="title"
              onChange={handleChange}
              value={chapterData.title}
            />
          </div>

          <div className="create_g">
            <span>Chapter Index</span>
            <input
              placeholder="Chapter Index"
              name="index"
              onChange={handleChange}
              value={chapterData.index}
            />
          </div>
          <p className="submit" onClick={handleSubmit}>
            Create
          </p>
        </div>
        <div className="books_chapter_content_create_right">
          <span>Chapter Content</span>
          <TipTap change={handleChangeChapter} state={chapterData.content} />
        </div>
      </div>

      <div className="books_chapter_content_list">
        <div className="books_chapter_content_list_head">
          <p>No.</p>

          <p className="chapter_title">Chapter title</p>
          <p className="chapter_title">Book title</p>
          <p>Index</p>
        </div>

        <div className="books_chapter_content_list_content">
          {chapters.map((song, i) => (
            <BookChapterCard data={song} key={song._id} indx={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const BooksCategoryContent = () => {
  const { book } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoryThunk("book"));
  }, []);

  const [dataCategory, setDataCategory] = useState({
    categoryName: "",
    categoryImage: "",
    categoryType: "book",
  });

  const handleShowCreate = (e) => {
    const boxCreate = e.target.parentElement.querySelector(
      ".books_category_create"
    );
    boxCreate.classList.toggle("active");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDataCategory((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = () => {
    dispatch(createCategoryThunk(dataCategory));
  };

  return (
    <div className="tab_content books_category_content" data-content="category">
      <p onClick={handleShowCreate}>Create Category</p>

      <div className="books_category_create">
        <div className="create_g">
          <span>Category Name</span>
          <input
            placeholder="Category Name..."
            onChange={handleChange}
            name="categoryName"
            value={dataCategory.categoryName}
          />
        </div>
        <div className="create_g">
          <span>Category Iamge</span>
          <input
            placeholder="Link category Image...."
            onChange={handleChange}
            name="categoryImage"
            value={dataCategory.categoryImage}
          />
        </div>

        <p onClick={handleSubmit}>Create</p>
      </div>

      <div className="books_category_content_list">
        {book.map((item) => (
          <BookCategoryCard data={item} key={item._id} />
        ))}
      </div>
    </div>
  );
};
