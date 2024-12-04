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

const BlogDetail = () => {
  const { data } = useLocation().state;
  const { blogs } = useSelector((state) => state.category);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const [dataBlog, setDataBlog] = useState(data);

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
      .closest(".blogs_detail_content")
      .querySelector(".blogs_content_create");
    boxCreate.classList.toggle("active");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataBlog((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleChangeBlog = (data) => {
    setDataBlog((prev) => {
      return {
        ...prev,
        blogContent: data,
      };
    });
  };

  const handleSubmit = async () => {
    try {
      const resultAction = await dispatch(editBlogsThunk(dataBlog));

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
    dispatch(deleteBlogsThunk(data));
  };

  return (
    <div className="blogs_detail">
      <p className="back" onClick={handleBack}>
        {appSvg.arrowDown}
      </p>
      <div className="blogs_detail_content">
        <div className="blogs_detail_content_info">
          <div className="top">
            <p onClick={handleShowCreate}>Edit</p>
            <p onClick={showConfirm}>Delete</p>
            <div className="top_comfirm">
              <h4>Are you sure?</h4>
              <p onClick={handleYes}>Yes</p>
              <p onClick={showConfirm}>No</p>
            </div>
          </div>
          <div className="blogs_content_create">
            <div className="blogs_content_create_left">
              {message && <p className="message">{message}</p>}
              <div className="create_head_g">
                <div className="create_g">
                  <span>Public</span>
                  <select
                    name="public"
                    onChange={handleChange}
                    value={dataBlog.public}
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
                    value={dataBlog.slider}
                  >
                    <option value={false}>False</option>
                    <option value={true}>True</option>
                  </select>
                </div>
              </div>
              <div className="create_g">
                <span>Blog Name</span>
                <input
                  placeholder="Blog Name..."
                  name="title"
                  onChange={handleChange}
                  value={dataBlog.title}
                />
              </div>
              <div className="create_g">
                <span>Blog link thumbnail</span>
                <input
                  placeholder="Blog image"
                  name="thumbnail"
                  onChange={handleChange}
                  value={dataBlog.thumbnail}
                />
              </div>

              <div className="create_g">
                <span>Blog link thumbnail Banner</span>
                <input
                  placeholder="Blog thumbnail Banner"
                  name="thumbnailBanner"
                  onChange={handleChange}
                  value={dataBlog.thumbnailBanner}
                />
              </div>

              <div className="create_g">
                <span>Blog Link Youtube</span>
                <input
                  placeholder="Blog link Youtube"
                  name="linkYoutube"
                  onChange={handleChange}
                  value={dataBlog.linkYoutube}
                />
              </div>

              <div className="create_g">
                <span>Blog Category</span>
                <select
                  name="category"
                  onChange={handleChange}
                  value={dataBlog.category._id}
                >
                  <option value="">Choose</option>
                  {blogs.map((item) => (
                    <option value={item._id} key={item._id}>
                      {item.categoryName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="create_g">
                <span>Blog release</span>
                <input
                  placeholder="Lyrics release"
                  name="release"
                  onChange={handleChange}
                  value={dataBlog.release}
                />
              </div>

              <div className="create_g">
                <span>Blog description</span>
                <textarea
                  placeholder="Lyrics description"
                  name="description"
                  onChange={handleChange}
                  value={dataBlog.description}
                />
              </div>
              <p className="submit" onClick={handleSubmit}>
                Save
              </p>
            </div>
            <div className="blogs_content_create_right">
              <span>Blog song</span>
              <TipTap change={handleChangeBlog} state={dataBlog.blogContent} />
            </div>
          </div>

          <div className="head">
            <h1>{dataBlog?.title}</h1>
            <p>{dataBlog?.description}</p>
            <div className="head_box">
              <div className="item">
                <h4>Public</h4>
                {dataBlog?.public ? appSvg.check : appSvg.none}
              </div>
              <div className="item">
                <h4>Views</h4>
                <p>{dataBlog?.view}</p>
              </div>
              <div className="item">
                <h4>Share</h4>
                <p>{dataBlog?.share}</p>
              </div>
              <div className="item">
                <h4>Cloudy</h4>
                <p>{dataBlog?.cloudy?.length}</p>
              </div>
              <div className="item">
                <h4>Slider</h4>
                <p>{dataBlog?.slider ? appSvg.check : appSvg.none}</p>
              </div>

              <div className="item">
                <h4>Release</h4>
                <p>{dataBlog?.release}</p>
              </div>
              <div className="item">
                <h4>Category</h4>
                <p>{dataBlog?.category?.categoryName}</p>
              </div>
            </div>
          </div>

          <div
            className="tabs_contents"
            dangerouslySetInnerHTML={{ __html: data?.blogContent }}
          ></div>
        </div>
        <div className="blogs_detail_content_relative">
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
              <img src={dataBlog?.thumbnail} />
            </div>
            <div
              className="other_content other_content_banner"
              data-othercontent="banner"
            >
              <img src={dataBlog?.thumbnailBanner} />
            </div>
            <div
              className="other_content other_content_youtube"
              data-othercontent="youtube"
            >
              <iframe
                width="560"
                height="315"
                src={dataBlog?.linkYoutube?.replace(
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
        <div className="blogs_detail_content_comments"></div>
      </div>
    </div>
  );
};

export default BlogDetail;
