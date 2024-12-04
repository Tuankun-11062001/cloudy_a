import { useDispatch } from "react-redux";
import { appSvg } from "../../../../../data/svg";
import { deleteCategoryThunk } from "../../../../../store/slices/categorySlide";
import { deleteAlbumThunk } from "../../../../../store/slices/albumsSlice";
import { deleteSingerThunk } from "../../../../../store/slices/singerSlice";
import { useNavigate } from "react-router-dom";
import { deletePartnerThunk } from "../../../../../store/slices/partnerSlice";

export const ShopCard = ({ data, indx }) => {
  const navigate = useNavigate();
  const handleCheck = () => {
    navigate(`/website/shop/${data._id}`, {
      state: {
        data,
      },
    });
  };
  return (
    <div className="shop_card" onClick={handleCheck}>
      <p>{indx + 1}</p>
      <p>{data.public ? appSvg.check : appSvg.none}</p>
      <p>{data.trending ? appSvg.check : appSvg.none}</p>
      <p>{data.slider ? appSvg.check : appSvg.none}</p>
      <p>{data.myProduct ? appSvg.check : appSvg.none}</p>
      <p className="shop_title">
        <abbr title={data.title}>{data.title}</abbr>
      </p>
      <p>{data.view}</p>
      <p>{data.share}</p>
      <p className="shop_youtube">
        <abbr title={data.linkProduct}>{data.linkProduct}</abbr>
      </p>
      <p>
        <abbr title={data.partner.partnerName}>{data.partner.partnerName}</abbr>
      </p>
      <p>
        <abbr title={data.category.categoryName}>
          {data.category.categoryName}
        </abbr>
      </p>
      <p>
        <abbr title={data.season}>{data.season}</abbr>
      </p>
      <p>{data.cloudy.length}</p>
      <p>{data.price}</p>
    </div>
  );
};

export const ShopCategoryCard = ({ data }) => {
  const dispatch = useDispatch();
  const showConfirm = (e) => {
    const parent = e.target.closest(".shop_category_card");
    const askBox = parent.querySelector(".shop_category_card_ask");
    askBox.classList.add("active");
    e.target.classList.add("active");
  };

  const confirmNo = (e) => {
    const parent = e.target.closest(".shop_category_card");
    const butonClose = parent.querySelector(".shop_category_card_close");
    const askBox = parent.querySelector(".shop_category_card_ask");
    askBox.classList.remove("active");
    butonClose.classList.remove("active");
  };

  const comfirmYes = (e) => {
    dispatch(deleteCategoryThunk(data));
    const parent = e.target.closest(".shop_category_card");
    const butonClose = parent.querySelector(".shop_category_card_close");
    const askBox = parent.querySelector(".shop_category_card_ask");
    askBox.classList.remove("active");
    butonClose.classList.remove("active");
  };
  return (
    <div className="shop_category_card">
      <div className="shop_category_card_ask">
        <h4>Are you sure?</h4>
        <div className="shop_category_card_ask_g">
          <p onClick={comfirmYes}>Yes</p>
          <p onClick={confirmNo}>no</p>
        </div>
      </div>
      <p className="shop_category_card_close" onClick={showConfirm}>
        {appSvg.close}
      </p>
      <img src={data.categoryImage} />
      <h2>{data.categoryName}</h2>
    </div>
  );
};

export const ShopPartnerCard = ({ data }) => {
  const dispatch = useDispatch();
  const showConfirm = (e) => {
    const parent = e.target.closest(".partner_card");
    const askBox = parent.querySelector(".partner_card_ask");
    askBox.classList.add("active");
    e.target.classList.add("active");
  };

  const confirmNo = (e) => {
    const parent = e.target.closest(".partner_card");
    const butonClose = parent.querySelector(".partner_card_close");
    const askBox = parent.querySelector(".partner_card_ask");
    askBox.classList.remove("active");
    butonClose.classList.remove("active");
  };

  const comfirmYes = (e) => {
    dispatch(deletePartnerThunk(data));
    const parent = e.target.closest(".partner_card");
    const butonClose = parent.querySelector(".partner_card_close");
    const askBox = parent.querySelector(".partner_card_ask");
    askBox.classList.remove("active");
    butonClose.classList.remove("active");
  };

  return (
    <div className="partner_card">
      <div className="partner_card_ask">
        <h4>Are you sure?</h4>
        <div className="partner_card_ask_g">
          <p onClick={comfirmYes}>Yes</p>
          <p onClick={confirmNo}>no</p>
        </div>
      </div>
      <p className="partner_card_close" onClick={showConfirm}>
        {appSvg.close}
      </p>
      <img src={data.partnerImage} />
      <h2>{data.partnerName}</h2>
    </div>
  );
};

export const ShopSingerCard = ({ data }) => {
  const dispatch = useDispatch();
  const showConfirm = (e) => {
    const parent = e.target.closest(".lyrics_singer_card");
    const askBox = parent.querySelector(".lyrics_singer_card_ask");
    askBox.classList.add("active");
    e.target.classList.add("active");
  };

  const confirmNo = (e) => {
    const parent = e.target.closest(".lyrics_singer_card");
    const butonClose = parent.querySelector(".lyrics_singer_card_close");
    const askBox = parent.querySelector(".lyrics_singer_card_ask");
    askBox.classList.remove("active");
    butonClose.classList.remove("active");
  };

  const comfirmYes = (e) => {
    dispatch(deleteSingerThunk(data));
    const parent = e.target.closest(".lyrics_singer_card");
    const butonClose = parent.querySelector(".lyrics_singer_card_close");
    const askBox = parent.querySelector(".lyrics_singer_card_ask");
    askBox.classList.remove("active");
    butonClose.classList.remove("active");
  };

  return (
    <div className="lyrics_singer_card">
      <div className="lyrics_singer_card_ask">
        <h4>Are you sure?</h4>
        <div className="lyrics_singer_card_ask_g">
          <p onClick={comfirmYes}>Yes</p>
          <p onClick={confirmNo}>no</p>
        </div>
      </div>
      <p className="lyrics_singer_card_close" onClick={showConfirm}>
        {appSvg.close}
      </p>
      <img src={data.singerImage} />
      <h2>{data.singerName}</h2>
    </div>
  );
};

export const ShopAlbumsCard = ({ data }) => {
  const dispatch = useDispatch();
  const showConfirm = (e) => {
    const parent = e.target.closest(".lyrics_albums_card");
    const askBox = parent.querySelector(".lyrics_albums_card_ask");
    askBox.classList.add("active");
    e.target.classList.add("active");
  };

  const confirmNo = (e) => {
    const parent = e.target.closest(".lyrics_albums_card");
    const butonClose = parent.querySelector(".lyrics_albums_card_close");
    const askBox = parent.querySelector(".lyrics_albums_card_ask");
    askBox.classList.remove("active");
    butonClose.classList.remove("active");
  };

  const comfirmYes = (e) => {
    dispatch(deleteAlbumThunk(data));
    const parent = e.target.closest(".lyrics_albums_card");
    const butonClose = parent.querySelector(".lyrics_albums_card_close");
    const askBox = parent.querySelector(".lyrics_albums_card_ask");
    askBox.classList.remove("active");
    butonClose.classList.remove("active");
  };

  return (
    <div className="lyrics_albums_card">
      <div className="lyrics_albums_card_ask">
        <h4>Are you sure?</h4>
        <div className="lyrics_albums_card_ask_g">
          <p onClick={comfirmYes}>Yes</p>
          <p onClick={confirmNo}>no</p>
        </div>
      </div>
      <p className="lyrics_albums_card_close" onClick={showConfirm}>
        {appSvg.close}
      </p>
      <img src={data.albumImage} />
      <h2>{data.albumName}</h2>
    </div>
  );
};
