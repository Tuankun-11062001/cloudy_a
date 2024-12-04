import { useDispatch } from "react-redux";
import { appSvg } from "../../../../../data/svg";
import { deleteCategoryThunk } from "../../../../../store/slices/categorySlide";
import { useNavigate } from "react-router-dom";

export const BlogCard = ({ data, indx }) => {
  const navigate = useNavigate();
  const handleCheck = () => {
    navigate(`/website/blog/${data._id}`, {
      state: {
        data,
      },
    });
  };
  return (
    <div className="blogs_card" onClick={handleCheck}>
      <p>{indx + 1}</p>
      <p>{data.public ? appSvg.check : appSvg.none}</p>

      <p>{data.slider ? appSvg.check : appSvg.none}</p>
      <p className="blogs_title">
        <abbr title={data.title}>{data.title}</abbr>
      </p>
      <p>{data.view}</p>
      <p>{data.share}</p>
      <p className="blogs_youtube">
        <abbr title={data.linkYoutube}>{data.linkYoutube}</abbr>
      </p>

      <p>
        <abbr title={data.category.categoryName}>
          {data.category.categoryName}
        </abbr>
      </p>

      <p>{data.cloudy.length}</p>

      <p>{data.comments.length}</p>
    </div>
  );
};

export const BlogCategoryCard = ({ data }) => {
  const dispatch = useDispatch();
  const showConfirm = (e) => {
    const parent = e.target.closest(".blog_category_card");
    const askBox = parent.querySelector(".blog_category_card_ask");
    askBox.classList.add("active");
    e.target.classList.add("active");
  };

  const confirmNo = (e) => {
    const parent = e.target.closest(".blog_category_card");
    const butonClose = parent.querySelector(".blog_category_card_close");
    const askBox = parent.querySelector(".blog_category_card_ask");
    askBox.classList.remove("active");
    butonClose.classList.remove("active");
  };

  const comfirmYes = (e) => {
    dispatch(deleteCategoryThunk(data));
    const parent = e.target.closest(".blog_category_card");
    const butonClose = parent.querySelector(".blog_category_card_close");
    const askBox = parent.querySelector(".blog_category_card_ask");
    askBox.classList.remove("active");
    butonClose.classList.remove("active");
  };
  return (
    <div className="blog_category_card">
      <div className="blog_category_card_ask">
        <h4>Are you sure?</h4>
        <div className="blog_category_card_ask_g">
          <p onClick={comfirmYes}>Yes</p>
          <p onClick={confirmNo}>no</p>
        </div>
      </div>
      <p className="blog_category_card_close" onClick={showConfirm}>
        {appSvg.close}
      </p>
      <img src={data.categoryImage} />
      <h2>{data.categoryName}</h2>
    </div>
  );
};
