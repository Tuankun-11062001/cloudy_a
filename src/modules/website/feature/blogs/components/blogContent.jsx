import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { appSvg } from "../../../../../data/svg";
import TipTap from "../../../components/rickText";
import {
  createLyricsThunk,
  getLyricsThunk,
} from "../../../../../store/slices/lyricsSlice";
import { BlogCard, BlogCategoryCard } from "./blogCard";
import {
  createCategoryThunk,
  getCategoryThunk,
} from "../../../../../store/slices/categorySlide";
import {
  createBlogsThunk,
  getBlogsThunk,
} from "../../../../../store/slices/blogSlice";

export const BlogsContent = () => {
  const { blog } = useSelector((state) => state.blogs);
  const { blogs } = useSelector((state) => state.category);

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

    dispatch(getBlogsThunk(stringQuery));
  }, [query]);

  const handleShowCreate = (e) => {
    const boxCreate = e.target
      .closest(".blogs_content")
      .querySelector(".blogs_content_create");
    boxCreate.classList.toggle("active");
  };

  const initState = {
    thumbnailBanner: "",
    title: "",
    thumbnail: "",
    linkYoutube: "",

    category: "",

    release: "",
    description: "",

    blogContent: "",
  };

  const [blogData, setBlogData] = useState(initState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleChangeBlogs = (data) => {
    setBlogData((prev) => {
      return {
        ...prev,
        blogContent: data,
      };
    });
  };

  const handleSubmit = async () => {
    try {
      const resultAction = await dispatch(createBlogsThunk(blogData));
      const result = unwrapResult(resultAction);
      setBlogData(initState);
    } catch (error) {
      console.error("Submit failed:", error);
    }
  };

  return (
    <div className="tab_content blogs_content active" data-content="lyrics">
      <div className="blogs_content_head">
        <p onClick={handleShowCreate}>Create one</p>
        <span>Filter</span>
        <p className="active">All</p>
        <select
          name="category"
          onChange={handleChangeQuery}
          value={query.category}
        >
          <option value="">Choose</option>
          {blogs.map((item) => (
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

      <div className="blogs_content_create">
        <div className="blogs_content_create_left">
          <div className="create_g">
            <span>Blog Name</span>
            <input
              placeholder="blog Name..."
              name="title"
              onChange={handleChange}
              value={blogData.title}
            />
          </div>
          <div className="create_g">
            <span>Blog link thumbnail</span>
            <input
              placeholder="Blog image"
              name="thumbnail"
              onChange={handleChange}
              value={blogData.thumbnail}
            />
          </div>

          <div className="create_g">
            <span>Blog link thumbnail Banner</span>
            <input
              placeholder="Blog thumbnail Banner"
              name="thumbnailBanner"
              onChange={handleChange}
              value={blogData.thumbnailBanner}
            />
          </div>

          <div className="create_g">
            <span>Blog Link Youtube</span>
            <input
              placeholder="Blog link Youtube"
              name="linkYoutube"
              onChange={handleChange}
              value={blogData.linkYoutube}
            />
          </div>

          <div className="create_g">
            <span>Blog Category</span>
            <select
              name="category"
              onChange={handleChange}
              value={blogData.category}
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
              placeholder="Blogs release"
              name="release"
              onChange={handleChange}
              value={blogData.release}
            />
          </div>

          <div className="create_g">
            <span>Blog description</span>
            <textarea
              placeholder="Blog description"
              name="description"
              onChange={handleChange}
              value={blogData.description}
            />
          </div>
          <p className="submit" onClick={handleSubmit}>
            Create
          </p>
        </div>
        <div className="blogs_content_create_right">
          <span>Blog Content</span>
          <TipTap change={handleChangeBlogs} state={blogData.blogContent} />
        </div>
      </div>

      <div className="blogs_content_list">
        <div className="blogs_content_list_head">
          <p>No.</p>
          <p>Public</p>
          <p>Slider</p>
          <p className="lyrics_title">Title</p>
          <p>Views</p>
          <p>Share</p>
          <p>LinkYoutube</p>
          <p>category</p>
          <p>cloudy</p>
          <p>Comment</p>
        </div>

        <div className="blogs_content_list_content">
          {blog.map((song, i) => (
            <BlogCard data={song} key={song._id} indx={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const BlogCategoryContent = () => {
  const { blogs } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoryThunk("blogs"));
  }, []);

  const [dataCategory, setDataCategory] = useState({
    categoryName: "",
    categoryImage: "",
    categoryType: "blogs",
  });

  const handleShowCreate = (e) => {
    const boxCreate = e.target.parentElement.querySelector(
      ".blogs_category_create"
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
    <div className="tab_content blogs_category_content" data-content="category">
      <p onClick={handleShowCreate}>Create Category</p>

      <div className="blogs_category_create">
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

      <div className="blogs_category_content_list">
        {blogs.map((item) => (
          <BlogCategoryCard data={item} key={item._id} />
        ))}
      </div>
    </div>
  );
};
