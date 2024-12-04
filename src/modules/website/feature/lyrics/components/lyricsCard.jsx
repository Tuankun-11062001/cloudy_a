import { useDispatch } from "react-redux";
import { appSvg } from "../../../../../data/svg";
import { deleteCategoryThunk } from "../../../../../store/slices/categorySlide";
import { deleteCountryThunk } from "../../../../../store/slices/countrySlice";
import { deleteAlbumThunk } from "../../../../../store/slices/albumsSlice";
import { deleteSingerThunk } from "../../../../../store/slices/singerSlice";
import { useNavigate } from "react-router-dom";

export const LyricsCard = ({ data, indx }) => {
  const navigate = useNavigate();
  const handleCheck = () => {
    navigate(`/website/lyrics/${data._id}`, {
      state: {
        data,
      },
    });
  };
  return (
    <div className="lyrics_card" onClick={handleCheck}>
      <p>{indx + 1}</p>
      <p>{data.public ? appSvg.check : appSvg.none}</p>
      <p>{data.trending ? appSvg.check : appSvg.none}</p>
      <p>{data.slider ? appSvg.check : appSvg.none}</p>
      <p className="lyrics_title">
        <abbr title={data.title}>{data.title}</abbr>
      </p>
      <p>{data.view}</p>
      <p>{data.share}</p>
      <p className="lyrics_youtube">
        <abbr title={data.linkYoutube}>{data.linkYoutube}</abbr>
      </p>
      <p>
        <abbr title={data.singer.singerName}>{data.singer.singerName}</abbr>
      </p>
      <p>
        <abbr title={data.category.categoryName}>
          {data.category.categoryName}
        </abbr>
      </p>
      <p>
        <abbr title={data.country?.countryName}>
          {data.country?.countryName}
        </abbr>
      </p>
      <p>{data.cloudy.length}</p>
      <p>{data.translate.length}</p>
      <p>{data.comments.length}</p>
    </div>
  );
};

export const LyricsCategoryCard = ({ data }) => {
  const dispatch = useDispatch();
  const showConfirm = (e) => {
    const parent = e.target.closest(".lyrics_category_card");
    const askBox = parent.querySelector(".lyrics_category_card_ask");
    askBox.classList.add("active");
    e.target.classList.add("active");
  };

  const confirmNo = (e) => {
    const parent = e.target.closest(".lyrics_category_card");
    const butonClose = parent.querySelector(".lyrics_category_card_close");
    const askBox = parent.querySelector(".lyrics_category_card_ask");
    askBox.classList.remove("active");
    butonClose.classList.remove("active");
  };

  const comfirmYes = (e) => {
    dispatch(deleteCategoryThunk(data));
    const parent = e.target.closest(".lyrics_category_card");
    const butonClose = parent.querySelector(".lyrics_category_card_close");
    const askBox = parent.querySelector(".lyrics_category_card_ask");
    askBox.classList.remove("active");
    butonClose.classList.remove("active");
  };
  return (
    <div className="lyrics_category_card">
      <div className="lyrics_category_card_ask">
        <h4>Are you sure?</h4>
        <div className="lyrics_category_card_ask_g">
          <p onClick={comfirmYes}>Yes</p>
          <p onClick={confirmNo}>no</p>
        </div>
      </div>
      <p className="lyrics_category_card_close" onClick={showConfirm}>
        {appSvg.close}
      </p>
      <img src={data.categoryImage} />
      <h2>{data.categoryName}</h2>
    </div>
  );
};

export const LyricsCountryCard = ({ data }) => {
  const dispatch = useDispatch();
  const showConfirm = (e) => {
    const parent = e.target.closest(".lyrics_country_card");
    const askBox = parent.querySelector(".lyrics_country_card_ask");
    askBox.classList.add("active");
    e.target.classList.add("active");
  };

  const confirmNo = (e) => {
    const parent = e.target.closest(".lyrics_country_card");
    const butonClose = parent.querySelector(".lyrics_country_card_close");
    const askBox = parent.querySelector(".lyrics_country_card_ask");
    askBox.classList.remove("active");
    butonClose.classList.remove("active");
  };

  const comfirmYes = (e) => {
    dispatch(deleteCountryThunk(data));
    const parent = e.target.closest(".lyrics_country_card");
    const butonClose = parent.querySelector(".lyrics_country_card_close");
    const askBox = parent.querySelector(".lyrics_country_card_ask");
    askBox.classList.remove("active");
    butonClose.classList.remove("active");
  };

  return (
    <div className="lyrics_country_card">
      <div className="lyrics_country_card_ask">
        <h4>Are you sure?</h4>
        <div className="lyrics_country_card_ask_g">
          <p onClick={comfirmYes}>Yes</p>
          <p onClick={confirmNo}>no</p>
        </div>
      </div>
      <p className="lyrics_country_card_close" onClick={showConfirm}>
        {appSvg.close}
      </p>
      <img src={data.countryImage} />
      <h2>{data.countryName}</h2>
    </div>
  );
};

export const LyricsSingerCard = ({ data }) => {
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

export const LyricsAlbumsCard = ({ data }) => {
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
