import React, { useEffect, useState } from "react";
import { appSvg } from "../../../../../data/svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  deleteBooksThunk,
  editBooksThunk,
} from "../../../../../store/slices/bookSlice";

const BookDetail = () => {
  const { data } = useLocation().state;
  const { book } = useSelector((state) => state.category);
  const { chapters } = useSelector((state) => state.chapters);

  const [message, setMessage] = useState("");
  const [chapterValue, setChapterValue] = useState({
    chapter: {
      _id: "",
      title: "",
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const [dataBook, setDataBook] = useState(data);
  console.log(dataBook);

  const relativeTabs = (e) => {
    const parent = e.target.closest(".blogs_relative_other");
    const tabElements = parent.querySelectorAll(".other_head p");
    const tabContents = parent.querySelectorAll(".other_content");
    tabElements.forEach((tab) => {
      tab.classList.remove("active");
    });

    let tabData = e.target.dataset.othertab;

    tabContents.forEach((content) => {
      content.classList.remove("active");
      if (tabData === content.dataset.othercontent) {
        console.log(content);
        content.classList.add("active");
      }
    });

    e.target.classList.add("active");
  };

  // edit

  const handleShowCreate = (e) => {
    const boxCreate = e.target
      .closest(".books_detail_content")
      .querySelector(".books_content_create");
    boxCreate.classList.toggle("active");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataBook((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleChangeChapter = (e) => {
    const selectedChapter = chapters.find(
      (chapter) => chapter._id === e.target.value
    );
    const customChapter = {
      chapter: {
        _id: e.target.value,
        title: selectedChapter.title,
      },
    };
    setChapterValue(customChapter);
  };

  const handleDelteChapter = (idChapter) => {
    const filterChaper = dataBook.chapters.filter(
      (item) => item.chapter._id !== idChapter
    );
    setDataBook((prev) => {
      return {
        ...prev,
        chapters: filterChaper,
      };
    });
  };

  const handleAddingChapter = () => {
    setDataBook((prev) => {
      return {
        ...prev,
        chapters: [...prev.chapters, chapterValue],
      };
    });
  };

  const handleSubmit = async () => {
    console.log(dataBook);

    try {
      const resultAction = await dispatch(editBooksThunk(dataBook));

      const result = unwrapResult(resultAction);
      if (result.data.status !== 201) {
        setMessage("Error Save");
      }
      setMessage("Save Success");
    } catch (error) {
      console.error("Submit failed:", error);
    }
  };

  // delete

  const showConfirm = (e) => {
    const parent = e.target.closest(".top");
    const boxConfirm = parent.querySelector(".top_comfirm");

    boxConfirm.classList.toggle("active");
  };

  const handleYes = () => {
    dispatch(deleteBooksThunk(data));
  };

  return (
    <div className="books_detail">
      <p className="back" onClick={handleBack}>
        {appSvg.arrowDown}
      </p>
      <div className="books_detail_content">
        <div className="books_detail_content_info">
          <div className="top">
            <p onClick={handleShowCreate}>Edit</p>
            <p onClick={showConfirm}>Delete</p>
            <div className="top_comfirm">
              <h4>Are you sure?</h4>
              <p onClick={handleYes}>Yes</p>
              <p onClick={showConfirm}>No</p>
            </div>
          </div>
          <div className="books_content_create">
            <div className="books_content_create_left">
              {message && <p className="message">{message}</p>}
              <div className="create_head_g">
                <div className="create_g">
                  <span>Public</span>
                  <select
                    name="public"
                    onChange={handleChange}
                    value={dataBook.public}
                  >
                    <option value={false}>False</option>
                    <option value={true}>True</option>
                  </select>
                </div>

                <div className="create_g">
                  <span>Slider</span>
                  <select
                    name="slider"
                    onChange={handleChange}
                    value={dataBook.slider}
                  >
                    <option value={false}>False</option>
                    <option value={true}>True</option>
                  </select>
                </div>
                <div className="create_g">
                  <span>Trending</span>
                  <select
                    name="trending"
                    onChange={handleChange}
                    value={dataBook.trending}
                  >
                    <option value={false}>False</option>
                    <option value={true}>True</option>
                  </select>
                </div>
              </div>
              <div className="create_g">
                <span>Book Name</span>
                <input
                  placeholder="Book Name..."
                  name="title"
                  onChange={handleChange}
                  value={dataBook.title}
                />
              </div>
              <div className="create_g">
                <span>Book link thumbnail</span>
                <input
                  placeholder="Book image"
                  name="thumbnail"
                  onChange={handleChange}
                  value={dataBook.thumbnail}
                />
              </div>

              <div className="create_g">
                <span>Book link thumbnail Banner</span>
                <input
                  placeholder="Book thumbnail Banner"
                  name="thumbnailBanner"
                  onChange={handleChange}
                  value={dataBook.thumbnailBanner}
                />
              </div>

              <div className="create_g">
                <span>Book Link Youtube</span>
                <input
                  placeholder="Book link Youtube"
                  name="linkYoutube"
                  onChange={handleChange}
                  value={dataBook.linkYoutube}
                />
              </div>

              <div className="create_g">
                <span>Book Category</span>
                <select
                  name="category"
                  onChange={handleChange}
                  value={dataBook.category._id}
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
                  placeholder="Book release"
                  name="release"
                  onChange={handleChange}
                  value={dataBook.release}
                />
              </div>

              <div className="create_g">
                <span>Book description</span>
                <textarea
                  placeholder="Book description"
                  name="description"
                  onChange={handleChange}
                  value={dataBook.description}
                />
              </div>
              <p className="submit" onClick={handleSubmit}>
                Save
              </p>
            </div>
            <div className="books_content_create_right">
              <div className="books_content_create_right_g">
                <div className="head">
                  <span>Adding Chapter</span>
                  <select onChange={handleChangeChapter}>
                    <option value="">Choose</option>
                    {chapters.map((chapter) => (
                      <option value={chapter._id} key={chapter._id}>
                        {chapter.title}
                      </option>
                    ))}
                  </select>
                  <p onClick={handleAddingChapter}>Adding Chapter</p>
                </div>
                <p>List Chapters</p>
                <div className="list_chapter">
                  {dataBook?.chapters?.map((item) => (
                    <span key={item?._id}>
                      <p onClick={() => handleDelteChapter(item.chapter._id)}>
                        {appSvg.close}
                      </p>
                      {item?.chapter?.title}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="head">
            <h1>{dataBook?.title}</h1>
            <p>{dataBook?.description}</p>
            <div className="head_box">
              <div className="item">
                <h4>Public</h4>
                {dataBook?.public ? appSvg.check : appSvg.none}
              </div>
              <div className="item">
                <h4>Views</h4>
                <p>{dataBook?.view}</p>
              </div>
              <div className="item">
                <h4>Share</h4>
                <p>{dataBook?.share}</p>
              </div>
              <div className="item">
                <h4>Cloudy</h4>
                <p>{dataBook?.cloudy?.length}</p>
              </div>
              <div className="item">
                <h4>Slider</h4>
                <p>{dataBook?.slider ? appSvg.check : appSvg.none}</p>
              </div>

              <div className="item">
                <h4>Release</h4>
                <p>{dataBook?.release}</p>
              </div>
              <div className="item">
                <h4>Category</h4>
                <p>{dataBook?.category?.categoryName}</p>
              </div>
            </div>
          </div>

          <div
            className="tabs_contents"
            dangerouslySetInnerHTML={{ __html: data?.blogContent }}
          ></div>
        </div>
        <div className="books_detail_content_relative">
          <div className="blogs_relative_other">
            <div className="other_head">
              <p onClick={relativeTabs} data-othertab="thumbnail">
                Thumbnail
              </p>
              <p onClick={relativeTabs} data-othertab="banner">
                Banner
              </p>
              <p onClick={relativeTabs} data-othertab="youtube">
                Youtube
              </p>
            </div>
            <div
              className="other_content other_content_thumbanil active"
              data-othercontent="thumbnail"
            >
              <img src={dataBook?.thumbnail} />
            </div>
            <div
              className="other_content other_content_banner"
              data-othercontent="banner"
            >
              <img src={dataBook?.thumbnailBanner} />
            </div>
            <div
              className="other_content other_content_youtube"
              data-othercontent="youtube"
            >
              <iframe
                width="560"
                height="315"
                src={dataBook?.linkYoutube?.replace(
                  "https://youtu.be",
                  "https://youtube.com/embed/"
                )}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
        <div className="books_detail_content_comments"></div>
      </div>
    </div>
  );
};

export default BookDetail;
