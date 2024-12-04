import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategoryThunk,
  getCategoryThunk,
} from "../../../../../store/slices/categorySlide";
import {
  createCountryThunk,
  getCountryThunk,
} from "../../../../../store/slices/countrySlice";

import { unwrapResult } from "@reduxjs/toolkit";
import { appSvg } from "../../../../../data/svg";
import TipTap from "../../../components/rickText";
import {
  createLyricsThunk,
  getLyricsThunk,
} from "../../../../../store/slices/lyricsSlice";
import { ShopCard, ShopCategoryCard, ShopPartnerCard } from "./shopCard";
import {
  createPartnerThunk,
  getPartnerThunk,
} from "../../../../../store/slices/partnerSlice";
import {
  createProductThunk,
  getProductThunk,
} from "../../../../../store/slices/shopSlice";

export const ShopContent = () => {
  const { products } = useSelector((state) => state.shop);
  const { shop } = useSelector((state) => state.category);
  const { partners } = useSelector((state) => state.partners);

  const dispatch = useDispatch();

  const [query, setQuery] = useState({
    category: "",
    season: "",
    partner: "",
    title: "",
    myProduct: false,
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

    dispatch(getProductThunk(stringQuery));
  }, [query]);

  const handleShowCreate = (e) => {
    const boxCreate = e.target
      .closest(".shop_content")
      .querySelector(".shop_content_create");
    boxCreate.classList.toggle("active");
  };

  const initState = {
    thumbnailBanner: "",
    season: "",
    title: "",
    thumbnail: "",
    linkProduct: "",
    price: "",
    category: "",
    partner: "",
    release: "",
    description: "",
    content: "",
    imageProduct: [],
  };

  const [productData, setProductData] = useState(initState);

  const [dataProductImage, setDataProductImage] = useState({
    linkImage: "",
  });

  const handleChangeImage = (e) => {
    setDataProductImage({
      linkImage: e.target.value,
    });
  };

  const handleAddImage = () => {
    setProductData((prev) => {
      return {
        ...prev,
        imageProduct: [...prev.imageProduct, dataProductImage],
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
  console.log(productData);

  const handleSubmit = async () => {
    try {
      const resultAction = await dispatch(createProductThunk(productData));
      const result = unwrapResult(resultAction);
      setProductData(initState);
    } catch (error) {
      console.error("Submit failed:", error);
    }
  };

  return (
    <div className="tab_content shop_content active" data-content="shop">
      <div className="shop_content_head">
        <p onClick={handleShowCreate}>Create one</p>
        <span>Filter</span>
        <p className="active">All</p>
        <select
          name="category"
          onChange={handleChangeQuery}
          value={query.category}
        >
          <option value="">Choose Category</option>
          {shop.map((item) => (
            <option value={item._id} key={item._id}>
              {item.categoryName}
            </option>
          ))}
        </select>
        <select
          name="partner"
          onChange={handleChangeQuery}
          value={query.partner}
        >
          <option value="">Choose Partner</option>
          {partners.map((item) => (
            <option value={item._id} key={item._id}>
              {item.partnerName}
            </option>
          ))}
        </select>
        <select name="season" onChange={handleChangeQuery} value={query.season}>
          <option value="">Choose season</option>
          <option value="winter">Winter</option>
          <option value="autumn">Autumn</option>
          <option value="spring">Spring</option>
          <option value="summer">Summer</option>
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
        <p
          onClick={() => handleQuery("myProduct", !query.myProduct)}
          className={query.myProduct ? "active" : ""}
        >
          My Product
        </p>
        <input
          placeholder="Search Lyrics"
          name="title"
          onChange={handleChangeQuery}
          value={query.title}
        />
      </div>

      <div className="shop_content_create">
        <div className="shop_content_create_left">
          <div className="create_g">
            <span>Product Name</span>
            <input
              placeholder="Lyrics Name..."
              name="title"
              onChange={handleChange}
              value={productData.title}
            />
          </div>
          <div className="create_g">
            <span>Product link thumbnail</span>
            <input
              placeholder="Lyrics image"
              name="thumbnail"
              onChange={handleChange}
              value={productData.thumbnail}
            />
          </div>

          <div className="create_g">
            <span>Product link thumbnail Banner</span>
            <input
              placeholder="Lyrics thumbnail Banner"
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
                value={dataProductImage.linkImage}
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
            <span>Product Price</span>
            <input
              placeholder="Product price"
              name="price"
              onChange={handleChange}
              value={productData.price}
            />
          </div>

          <div className="create_g">
            <span>Partner Product</span>
            <select
              name="partner"
              onChange={handleChange}
              value={productData.partner}
            >
              <option value="">Choose</option>
              {partners.map((partner) => (
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
              value={productData.category}
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
            Create
          </p>
        </div>
        <div className="shop_content_create_right">
          <span>Product Content</span>
          <TipTap change={handleChangeContent} state={productData.content} />
        </div>
      </div>

      <div className="shop_content_list">
        <div className="shop_content_list_head">
          <p>No.</p>
          <p>Public</p>
          <p>Trending</p>
          <p>Slider</p>
          <p>My Product</p>
          <p className="shop_title">Title</p>
          <p>Views</p>
          <p>Share</p>
          <p>Link Product</p>
          <p>Partner</p>
          <p>category</p>
          <p>Season</p>
          <p>cloudy</p>
          <p>Price</p>
        </div>

        <div className="shop_content_list_content">
          {products.map((product, i) => (
            <ShopCard data={product} key={product._id} indx={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const ShopCategoryContent = () => {
  const { shop } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoryThunk("shop"));
  }, []);

  const [dataCategory, setDataCategory] = useState({
    categoryName: "",
    categoryImage: "",
    categoryType: "shop",
  });

  const handleShowCreate = (e) => {
    const boxCreate = e.target.parentElement.querySelector(
      ".shop_category_create"
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
    <div className="tab_content shop_category_content" data-content="category">
      <p onClick={handleShowCreate}>Create Category</p>

      <div className="shop_category_create">
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

      <div className="shop_category_content_list">
        {shop.map((item) => (
          <ShopCategoryCard data={item} key={item._id} />
        ))}
      </div>
    </div>
  );
};

export const ShopPartnerContent = () => {
  const { partners } = useSelector((state) => state.partners);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPartnerThunk());
  }, []);

  const [dataPartner, setDataPartner] = useState({
    partnerName: "",
    partnerImage: "",
  });

  const handleShowCreate = (e) => {
    const boxCreate = e.target.parentElement.querySelector(".partner_create");
    boxCreate.classList.toggle("active");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDataPartner((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = () => {
    dispatch(createPartnerThunk(dataPartner));
  };

  return (
    <div className="tab_content partner_content" data-content="partner">
      <p onClick={handleShowCreate}>Create Partner</p>

      <div className="partner_create">
        <div className="create_g">
          <span>Partner Name</span>
          <input
            placeholder="Partner Name..."
            onChange={handleChange}
            name="partnerName"
            value={dataPartner.partnerName}
          />
        </div>
        <div className="create_g">
          <span>Partner Image</span>
          <input
            placeholder="Link partner Image...."
            onChange={handleChange}
            name="partnerImage"
            value={dataPartner.partnerImage}
          />
        </div>

        <p onClick={handleSubmit}>Create</p>
      </div>

      <div className="partner_content_list">
        {partners.map((item) => (
          <ShopPartnerCard data={item} key={item._id} />
        ))}
      </div>
    </div>
  );
};
