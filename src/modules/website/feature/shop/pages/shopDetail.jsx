import React, { useEffect, useState } from "react";
import { appSvg } from "../../../../../data/svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TipTap from "../../../components/rickText";

import { unwrapResult } from "@reduxjs/toolkit";
import {
  deleteProductThunk,
  editProductThunk,
} from "../../../../../store/slices/shopSlice";

const ShopDetail = () => {
  const { data } = useLocation().state;
  const { partners } = useSelector((state) => state.partners);
  const { shop } = useSelector((state) => state.category);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const [productData, setProductData] = useState(data);

  const relativeTabs = (e) => {
    const parent = e.target.closest(".shop_relative_other");
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
      .closest(".shop_detail_content")
      .querySelector(".shop_content_create");
    boxCreate.classList.toggle("active");
  };

  const [productDataImage, setProductDataImage] = useState({
    linkImage: "",
  });

  const handleChangeImage = (e) => {
    setProductDataImage({
      linkImage: e.target.value,
    });
  };

  const handleAddImage = () => {
    setProductData((prev) => {
      return {
        ...prev,
        imageProduct: [...prev.imageProduct, productDataImage],
      };
    });
  };

  const handleDeleteImage = (e, indx) => {
    e.stopPropagation();
    setProductData((prev) => {
      return {
        ...prev,
        imageProduct: prev.imageProduct.filter((_, index) => index !== indx),
      };
    });
  };

  const handleChooseThumbnail = (image) => {
    setProductData((prev) => {
      return {
        ...prev,
        thumbnail: image,
      };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleChangeContent = (data) => {
    setProductData((prev) => {
      return {
        ...prev,
        content: data,
      };
    });
  };

  const handleSubmit = async () => {
    try {
      const resultAction = await dispatch(editProductThunk(productData));

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
    dispatch(deleteProductThunk(data));
  };

  return (
    <div className="shop_detail">
      <p className="back" onClick={handleBack}>
        {appSvg.arrowDown}
      </p>
      <div className="shop_detail_content">
        <div className="shop_detail_content_info">
          <div className="top">
            <p onClick={handleShowCreate}>Edit</p>
            <p onClick={showConfirm}>Delete</p>
            <div className="top_comfirm">
              <h4>Are you sure?</h4>
              <p onClick={handleYes}>Yes</p>
              <p onClick={showConfirm}>No</p>
            </div>
          </div>
          <div className="shop_content_create">
            <div className="shop_content_create_left">
              {message && <p className="message">{message}</p>}
              <div className="create_head_g">
                <div className="create_g">
                  <span>Public</span>
                  <select
                    name="public"
                    onChange={handleChange}
                    value={productData.public}
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
                    value={productData.trending}
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
                    value={productData.slider}
                  >
                    <option value={false}>False</option>
                    <option value={true}>True</option>
                  </select>
                </div>
                <div className="create_g">
                  <span>My Product</span>
                  <select
                    name="myProduct"
                    onChange={handleChange}
                    value={productData.myProduct}
                  >
                    <option value={false}>False</option>
                    <option value={true}>True</option>
                  </select>
                </div>
              </div>
              <div className="create_g">
                <span>Product Name</span>
                <input
                  placeholder="Product Name..."
                  name="title"
                  onChange={handleChange}
                  value={productData.title}
                />
              </div>
              <div className="create_g">
                <span>Product link thumbnail</span>
                <input
                  placeholder="Product image"
                  name="thumbnail"
                  onChange={handleChange}
                  value={productData.thumbnail}
                />
              </div>

              <div className="create_g">
                <span>Product link thumbnail Banner</span>
                <input
                  placeholder="Product thumbnail Banner"
                  name="thumbnailBanner"
                  onChange={handleChange}
                  value={productData.thumbnailBanner}
                />
              </div>

              <div className="create_g">
                <span>List Image</span>
                <div className="head_image">
                  <input
                    placeholder="List Image"
                    name="linkImage"
                    onChange={handleChangeImage}
                    value={productDataImage.linkImage}
                  />
                  <p onClick={handleAddImage}>Adding</p>
                </div>
                <div className="list_image">
                  {productData.imageProduct.map((image, indx) => (
                    <div
                      className={
                        productData.thumbnail === image.linkImage
                          ? "item_image active"
                          : "item_image"
                      }
                      key={image._id || indx}
                      onClick={() => handleChooseThumbnail(image.linkImage)}
                    >
                      <img src={image.linkImage} />
                      <div className="item_image_control">
                        <p onClick={(e) => handleDeleteImage(e, indx)}>
                          {appSvg.close}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="create_g">
                <span>Product Link</span>
                <input
                  placeholder="Product link"
                  name="linkProduct"
                  onChange={handleChange}
                  value={productData.linkProduct}
                />
              </div>

              <div className="create_g">
                <span>Product Partner</span>
                <select
                  name="partner"
                  onChange={handleChange}
                  value={productData.partner._id}
                >
                  <option value="">Choose</option>
                  {partners?.map((partner) => (
                    <option value={partner._id} key={partner._id}>
                      {partner.partnerName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="create_g">
                <span>Product Category</span>
                <select
                  name="category"
                  onChange={handleChange}
                  value={productData.category._id}
                >
                  <option value="">Choose</option>
                  {shop.map((item) => (
                    <option value={item._id} key={item._id}>
                      {item.categoryName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="create_g">
                <span>Product Season</span>
                <select
                  name="season"
                  onChange={handleChange}
                  value={productData.season}
                >
                  <option value="">Choose</option>
                  <option value="winter">Winter</option>
                  <option value="autumn">Autumn</option>
                  <option value="spring">Spring</option>
                  <option value="summer">Summer</option>
                </select>
              </div>

              <div className="create_g">
                <span>Product release</span>
                <input
                  placeholder="Product release"
                  name="release"
                  onChange={handleChange}
                  value={productData.release}
                />
              </div>

              <div className="create_g">
                <span>Product description</span>
                <textarea
                  placeholder="Product description"
                  name="description"
                  onChange={handleChange}
                  value={productData.description}
                />
              </div>
              <p className="submit" onClick={handleSubmit}>
                Save
              </p>
            </div>
            <div className="shop_content_create_right">
              <span>Product Content</span>
              <TipTap
                change={handleChangeContent}
                state={productData.content}
              />
            </div>
          </div>

          <div className="head">
            <h1>{productData?.title}</h1>
            <p>{productData?.description}</p>
            <div className="head_box">
              <div className="item">
                <h4>Public</h4>
                {productData?.public ? appSvg.check : appSvg.none}
              </div>
              <div className="item">
                <h4>Trending</h4>
                {productData?.trending ? appSvg.check : appSvg.none}
              </div>
              <div className="item">
                <h4>My Product</h4>
                {productData?.myProduct ? appSvg.check : appSvg.none}
              </div>
              <div className="item">
                <h4>Image Product</h4>
                {productData?.imageProduct?.length}
              </div>
              <div className="item">
                <h4>Views</h4>
                <p>{productData?.view}</p>
              </div>
              <div className="item">
                <h4>Share</h4>
                <p>{productData?.share}</p>
              </div>
              <div className="item">
                <h4>Cloudy</h4>
                <p>{productData?.cloudy?.length}</p>
              </div>
              <div className="item">
                <h4>Slider</h4>
                <p>{productData?.slider ? appSvg.check : appSvg.none}</p>
              </div>
              <div className="item">
                <h4>Partner</h4>
                <p>{productData?.partner?.partnerName}</p>
              </div>
              <div className="item">
                <h4>Release</h4>
                <p>{productData?.release}</p>
              </div>
              <div className="item">
                <h4>Category</h4>
                <p>{productData?.category?.categoryName}</p>
              </div>
              <div className="item">
                <h4>Season</h4>
                <p>{productData?.season}</p>
              </div>
            </div>
          </div>
          <div
            className="content tiptap"
            dangerouslySetInnerHTML={{ __html: productData?.content }}
          ></div>
        </div>
        <div className="shop_detail_content_relative">
          <div className="shop_relative_other">
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
              <img src={productData?.thumbnail} />
            </div>
            <div
              className="other_content other_content_banner"
              data-othercontent="banner"
            >
              <img src={productData?.thumbnailBanner} />
            </div>
            <div
              className="other_content other_content_youtube"
              data-othercontent="youtube"
            >
              <iframe
                width="560"
                height="315"
                src={productData?.linkYoutube?.replace(
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
      </div>
    </div>
  );
};

export default ShopDetail;
