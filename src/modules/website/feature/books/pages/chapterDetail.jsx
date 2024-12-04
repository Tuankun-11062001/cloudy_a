import React, { useEffect, useState } from "react";
import { appSvg } from "../../../../../data/svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TipTap from "../../../components/rickText";
import {
  deleteLyricsThunk,
  editLyricsThunk,
} from "../../../../../store/slices/lyricsSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  deleteBlogsThunk,
  editBlogsThunk,
} from "../../../../../store/slices/blogSlice";
import { editBooksThunk } from "../../../../../store/slices/bookSlice";
import {
  deleteChapterThunk,
  editChapterThunk,
} from "../../../../../store/slices/chapterSlice";

const ChaperDetail = () => {
  const { data } = useLocation().state;
  const { books } = useSelector((state) => state.books);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const [dataChapter, setDataChapter] = useState(data);

  // edit

  const handleShowCreate = (e) => {
    const boxCreate = e.target
      .closest(".chapter_detail_content")
      .querySelector(".chapter_content_create");
    boxCreate.classList.toggle("active");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataChapter((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleChangeChapter = (data) => {
    setDataChapter((prev) => {
      return {
        ...prev,
        content: data,
      };
    });
  };

  const handleSubmit = async () => {
    try {
      const resultAction = await dispatch(editChapterThunk(dataChapter));

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
    dispatch(deleteChapterThunk(data));
  };

  return (
    <div className="chapter_detail">
      <p className="back" onClick={handleBack}>
        {appSvg.arrowDown}
      </p>
      <div className="chapter_detail_content">
        <div className="chapter_detail_content_info">
          <div className="top">
            <p onClick={handleShowCreate}>Edit</p>
            <p onClick={showConfirm}>Delete</p>
            <div className="top_comfirm">
              <h4>Are you sure?</h4>
              <p onClick={handleYes}>Yes</p>
              <p onClick={showConfirm}>No</p>
            </div>
          </div>
          <div className="chapter_content_create">
            <div className="chapter_content_create_left">
              {message && <p className="message">{message}</p>}
              <div className="create_head_g">
                <div className="create_g">
                  <span>Book</span>
                  <select
                    name="book"
                    onChange={handleChange}
                    value={dataChapter.book._id}
                  >
                    <option value="">Choose</option>
                    {books.map((book) => (
                      <option value={book._id} key={book._id}>
                        {book.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="create_g">
                <span>Chapter Name</span>
                <input
                  placeholder="chapter Name..."
                  name="title"
                  onChange={handleChange}
                  value={dataChapter.title}
                />
              </div>

              <div className="create_g">
                <span>Chapter index</span>
                <input
                  placeholder="Chapter index"
                  name="index"
                  onChange={handleChange}
                  value={dataChapter.index}
                />
              </div>
              <p className="submit" onClick={handleSubmit}>
                Save
              </p>
            </div>
            <div className="chapter_content_create_right">
              <span>Chapter content</span>
              <TipTap
                change={handleChangeChapter}
                state={dataChapter.content}
              />
            </div>
          </div>

          <div className="head">
            <h1>{dataChapter?.title}</h1>
            {/* <p>{dataChapter?.description}</p> */}
            {/* <div className="head_box">
              
              <div className="item">
                <h4>Share</h4>
                <p>{dataChapter?.share}</p>
              </div>
              <div className="item">
                <h4>Cloudy</h4>
                <p>{dataChapter?.cloudy?.length}</p>
              </div>
              <div className="item">
                <h4>Slider</h4>
                <p>{dataChapter?.slider ? appSvg.check : appSvg.none}</p>
              </div>

              <div className="item">
                <h4>Release</h4>
                <p>{dataChapter?.release}</p>
              </div>
              <div className="item">
                <h4>Category</h4>
                <p>{dataChapter?.category?.categoryName}</p>
              </div>
            </div> */}
          </div>

          <div
            className="tabs_contents"
            dangerouslySetInnerHTML={{ __html: data?.content }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ChaperDetail;
