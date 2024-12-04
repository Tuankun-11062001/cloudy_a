import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategoryThunk,
  getCategoryThunk,
} from "../../../../../store/slices/categorySlide";
import {
  LyricsAlbumsCard,
  LyricsCard,
  LyricsCategoryCard,
  LyricsCountryCard,
  LyricsSingerCard,
} from "./lyricsCard";
import {
  createCountryThunk,
  getCountryThunk,
} from "../../../../../store/slices/countrySlice";
import {
  createAlbumThunk,
  getAlbumsThunk,
} from "../../../../../store/slices/albumsSlice";
import {
  createSingerThunk,
  getSingersThunk,
} from "../../../../../store/slices/singerSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { appSvg } from "../../../../../data/svg";
import TipTap from "../../../components/rickText";
import {
  createLyricsThunk,
  getLyricsThunk,
} from "../../../../../store/slices/lyricsSlice";

export const LyricsContent = () => {
  const { songs } = useSelector((state) => state.lyrics);
  const { lyrics } = useSelector((state) => state.category);
  const { country } = useSelector((state) => state.country);
  const { singers } = useSelector((state) => state.singer);

  const dispatch = useDispatch();

  const [query, setQuery] = useState({
    category: "",
    singer: "",
    country: "",
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

    dispatch(getLyricsThunk(stringQuery));
  }, [query]);

  const handleShowCreate = (e) => {
    const boxCreate = e.target
      .closest(".lyrics_content")
      .querySelector(".lyrics_content_create");
    boxCreate.classList.toggle("active");
  };

  const handleCreateTab = (e) => {
    const parent = e.target.closest(".lyrics_content_create_right");
    const tabs = parent.querySelectorAll(".lyrics_content_create_right_tabs p");
    const contents = parent.querySelectorAll(".create_right_tab_content");

    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });

    const tabData = e.target.dataset.create;

    contents.forEach((content) => {
      content.classList.remove("active");
      if (tabData === content.dataset.createcontent) {
        content.classList.add("active");
      }
    });

    e.target.classList.add("active");
  };

  const initState = {
    thumbnailBanner: "",
    title: "",
    thumbnail: "",
    linkYoutube: "",
    singer: "",
    category: "",
    country: "",
    release: "",
    description: "",
    lyrics: "",
    chords: "",
    explain: "",
  };

  const [lyricsData, setLyricsData] = useState(initState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLyricsData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleChangeLyrics = (data) => {
    setLyricsData((prev) => {
      return {
        ...prev,
        lyrics: data,
      };
    });
  };

  const handleChangeChords = (data) => {
    setLyricsData((prev) => {
      return {
        ...prev,
        chords: data,
      };
    });
  };

  const handleChangeExplain = (data) => {
    setLyricsData((prev) => {
      return {
        ...prev,
        explain: data,
      };
    });
  };

  const handleSubmit = async () => {
    try {
      const resultAction = await dispatch(createLyricsThunk(lyricsData));
      const result = unwrapResult(resultAction);
      setLyricsData(initState);
    } catch (error) {
      console.error("Submit failed:", error);
    }
  };

  return (
    <div className="tab_content lyrics_content active" data-content="lyrics">
      <div className="lyrics_content_head">
        <p onClick={handleShowCreate}>Create one</p>
        <span>Filter</span>
        <p className="active">All</p>
        <select
          name="category"
          onChange={handleChangeQuery}
          value={query.category}
        >
          <option value="">Choose</option>
          {lyrics.map((item) => (
            <option value={item._id} key={item._id}>
              {item.categoryName}
            </option>
          ))}
        </select>
        <select
          name="country"
          onChange={handleChangeQuery}
          value={query.country}
        >
          <option value="">Choose</option>
          {country.map((item) => (
            <option value={item._id} key={item._id}>
              {item.countryName}
            </option>
          ))}
        </select>
        <select name="singer" onChange={handleChangeQuery} value={query.singer}>
          <option value="">Choose</option>
          {singers.map((singer) => (
            <option value={singer._id} key={singer._id}>
              {singer.singerName}
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

      <div className="lyrics_content_create">
        <div className="lyrics_content_create_left">
          <div className="create_g">
            <span>Lyrics Name</span>
            <input
              placeholder="Lyrics Name..."
              name="title"
              onChange={handleChange}
              value={lyricsData.title}
            />
          </div>
          <div className="create_g">
            <span>Lyrics link thumbnail</span>
            <input
              placeholder="Lyrics image"
              name="thumbnail"
              onChange={handleChange}
              value={lyricsData.thumbnail}
            />
          </div>

          <div className="create_g">
            <span>Lyrics link thumbnail Banner</span>
            <input
              placeholder="Lyrics thumbnail Banner"
              name="thumbnailBanner"
              onChange={handleChange}
              value={lyricsData.thumbnailBanner}
            />
          </div>

          <div className="create_g">
            <span>Lyrics Link Youtube</span>
            <input
              placeholder="Lyrics link Youtube"
              name="linkYoutube"
              onChange={handleChange}
              value={lyricsData.linkYoutube}
            />
          </div>

          <div className="create_g">
            <span>Lyrics Singer</span>
            <select
              name="singer"
              onChange={handleChange}
              value={lyricsData.singer}
            >
              <option value="">Choose</option>
              {singers.map((singer) => (
                <option value={singer._id} key={singer._id}>
                  {singer.singerName}
                </option>
              ))}
            </select>
          </div>

          <div className="create_g">
            <span>Lyrics Category</span>
            <select
              name="category"
              onChange={handleChange}
              value={lyricsData.category}
            >
              <option value="">Choose</option>
              {lyrics.map((item) => (
                <option value={item._id} key={item._id}>
                  {item.categoryName}
                </option>
              ))}
            </select>
          </div>

          <div className="create_g">
            <span>Lyrics Country</span>
            <select
              name="country"
              onChange={handleChange}
              value={lyricsData.country}
            >
              <option value="">Choose</option>
              {country.map((item) => (
                <option value={item._id} key={item._id}>
                  {item.countryName}
                </option>
              ))}
            </select>
          </div>

          <div className="create_g">
            <span>Lyrics release</span>
            <input
              placeholder="Lyrics release"
              name="release"
              onChange={handleChange}
              value={lyricsData.release}
            />
          </div>

          <div className="create_g">
            <span>Lyrics description</span>
            <textarea
              placeholder="Lyrics description"
              name="description"
              onChange={handleChange}
              value={lyricsData.description}
            />
          </div>
          <p className="submit" onClick={handleSubmit}>
            Create
          </p>
        </div>
        <div className="lyrics_content_create_right">
          <div className="lyrics_content_create_right_tabs">
            <p
              onClick={handleCreateTab}
              className="active"
              data-create="lyrics"
            >
              Lyrics
            </p>
            <p onClick={handleCreateTab} data-create="chords">
              chords
            </p>
            <p onClick={handleCreateTab} data-create="explain">
              Explain
            </p>
          </div>
          <div
            className="create_right_tab_content tab_content_lyrics"
            data-createcontent="lyrics"
          >
            <span>Lyrics song</span>
            <TipTap change={handleChangeLyrics} state={lyricsData.lyrics} />
          </div>

          <div
            className="create_right_tab_content tab_content_chords"
            data-createcontent="chords"
          >
            <span>Lyrics Chords</span>
            <TipTap change={handleChangeChords} state={lyricsData.chords} />
          </div>

          <div
            className="create_right_tab_content tab_content_explain"
            data-createcontent="explain"
          >
            <span>Lyrics Explain</span>
            <TipTap change={handleChangeExplain} state={lyricsData.explain} />
          </div>
        </div>
      </div>

      <div className="lyrics_content_list">
        <div className="lyrics_content_list_head">
          <p>No.</p>
          <p>Public</p>
          <p>Trending</p>
          <p>Slider</p>
          <p className="lyrics_title">Title</p>
          <p>Views</p>
          <p>Share</p>
          <p>LinkYoutube</p>
          <p>Singer</p>
          <p>category</p>
          <p>country</p>
          <p>cloudy</p>
          <p>translate</p>
          <p>Comment</p>
        </div>

        <div className="lyrics_content_list_content">
          {songs.map((song, i) => (
            <LyricsCard data={song} key={song._id} indx={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const LyricsCategoryContent = () => {
  const { lyrics } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoryThunk("lyrics"));
  }, []);

  const [dataCategory, setDataCategory] = useState({
    categoryName: "",
    categoryImage: "",
    categoryType: "lyrics",
  });

  const handleShowCreate = (e) => {
    const boxCreate = e.target.parentElement.querySelector(
      ".lyrics_category_create"
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
    <div
      className="tab_content lyrics_category_content"
      data-content="category"
    >
      <p onClick={handleShowCreate}>Create Category</p>

      <div className="lyrics_category_create">
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

      <div className="lyrics_category_content_list">
        {lyrics.map((item) => (
          <LyricsCategoryCard data={item} key={item._id} />
        ))}
      </div>
    </div>
  );
};

export const LyricsCountryContent = () => {
  const { country } = useSelector((state) => state.country);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountryThunk());
  }, []);

  const [dataCountry, setDataCountry] = useState({
    countryName: "",
    countryImage: "",
  });

  const handleShowCreate = (e) => {
    const boxCreate = e.target.parentElement.querySelector(
      ".lyrics_country_create"
    );
    boxCreate.classList.toggle("active");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDataCountry((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = () => {
    dispatch(createCountryThunk(dataCountry));
  };

  return (
    <div className="tab_content lyrics_country_content" data-content="country">
      <p onClick={handleShowCreate}>Create Country</p>

      <div className="lyrics_country_create">
        <div className="create_g">
          <span>Country Name</span>
          <input
            placeholder="Country Name..."
            onChange={handleChange}
            name="countryName"
            value={dataCountry.countryName}
          />
        </div>
        <div className="create_g">
          <span>Country Image</span>
          <input
            placeholder="Link country Image...."
            onChange={handleChange}
            name="countryImage"
            value={dataCountry.countryImage}
          />
        </div>

        <p onClick={handleSubmit}>Create</p>
      </div>

      <div className="lyrics_country_content_list">
        {country.map((item) => (
          <LyricsCountryCard data={item} key={item._id} />
        ))}
      </div>
    </div>
  );
};

export const LyricsAlbumsContent = () => {
  const { albums } = useSelector((state) => state.album);
  const { singers } = useSelector((state) => state.singer);
  const { songs } = useSelector((state) => state.lyrics);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAlbumsThunk());
  }, []);

  const initState = {
    albumName: "",
    albumImage: "",
    albumDetail: "",
    lyrics: [],
    singers: [],
  };

  const [dataAlbums, setDataAlbums] = useState(initState);

  const [dataSinger, setDataSinger] = useState(null);

  const handleChangeSinger = (e) => {
    const idSinger = e.target.value;
    const findSingerObj = singers.find((singer) => singer._id === idSinger);

    setDataSinger(findSingerObj);
  };

  const addSinger = () => {
    if (dataSinger) {
      setDataAlbums((prev) => {
        return {
          ...prev,
          singers: [...prev.singers, dataSinger],
        };
      });
    }
  };

  const [dataLyrics, setDataLyrics] = useState(null);

  const handleChangeLyrics = (e) => {
    const idLyrics = e.target.value;

    const findLyricsObj = songs.find((song) => song._id === idLyrics);

    setDataLyrics(findLyricsObj);
  };

  const addLyrics = () => {
    if (dataLyrics) {
      setDataAlbums((prev) => {
        return {
          ...prev,
          lyrics: [...prev.lyrics, dataLyrics],
        };
      });
    }
  };

  const handleShowCreate = (e) => {
    const boxCreate = e.target.parentElement.querySelector(
      ".lyrics_albums_create"
    );
    boxCreate.classList.toggle("active");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDataAlbums((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = () => {
    dispatch(createAlbumThunk(dataAlbums));
    setDataAlbums(initState);
  };

  return (
    <div className="tab_content lyrics_albums_content" data-content="albums">
      <p onClick={handleShowCreate}>Create Album</p>

      <div className="lyrics_albums_create">
        <div className="create_g">
          <span>Album Name</span>
          <input
            placeholder="Album Name..."
            onChange={handleChange}
            name="albumName"
            value={dataAlbums.albumName}
          />
        </div>
        <div className="create_g">
          <span>Album Image</span>
          <input
            placeholder="Link albums Image...."
            onChange={handleChange}
            name="albumImage"
            value={dataAlbums.albumImage}
          />
        </div>

        <div className="lyrics_albums_create_middle">
          <div className="create_g">
            <span>Singers of Album</span>

            <select
              placeholder="Singer"
              onChange={handleChangeSinger}
              value={dataSinger ? dataSinger._id : ""}
            >
              <option value="">Choose</option>
              {singers.map((singer) => (
                <option value={singer._id}>{singer.singerName}</option>
              ))}
            </select>
            <p onClick={addSinger}>Adding Singer</p>

            <div className="album_singer_list">
              {dataAlbums.singers.map((singer) => (
                <div className="item" key={singer._id}>
                  <img src={singer.singerImage} />
                  <span>{singer.singerName}</span>
                  <p>{appSvg.close}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="create_g">
            <span>Lyrics of Album</span>

            <select
              placeholder="Songs"
              onChange={handleChangeLyrics}
              value={dataLyrics ? dataLyrics._id : ""}
            >
              <option value="">Choose</option>
              {songs.map((song) => (
                <option value={song._id}>{song.title}</option>
              ))}
            </select>
            <p onClick={addLyrics}>Adding Lyrics</p>

            <div className="album_singer_list">
              {dataAlbums.lyrics.map((song) => (
                <div className="item" key={song._id}>
                  <img src={song.thumbnail} />
                  <span>{song.title}</span>
                  <p>{appSvg.close}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="create_g">
          <span>Album Detail</span>
          <textarea
            placeholder="Albums detail...."
            onChange={handleChange}
            name="albumDetail"
            value={dataAlbums.albumDetail}
          />
        </div>

        <p onClick={handleSubmit}>Create</p>
      </div>

      <div className="lyrics_albums_content_list">
        {albums.map((item) => (
          <LyricsAlbumsCard data={item} key={item._id} />
        ))}
      </div>
    </div>
  );
};

// lyrics Singer

export const LyricsSingerContent = () => {
  const { singers } = useSelector((state) => state.singer);
  const { country } = useSelector((state) => state.country);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingersThunk());
  }, []);

  const initState = {
    singerName: "",
    singerImage: "",
    singerSocial: [],
    singerCountry: "",
    description: "",
  };

  const [dataSinger, setDataSinger] = useState(initState);

  const [dataSocial, setDataSocial] = useState({
    nameSocial: "",
    linkSocial: "",
  });

  const handleSocial = (e) => {
    const { name, value } = e.target;

    setDataSocial((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const socialData = ["youtube", "facebook", "instagram", "twitter", "threads"];

  const addSocial = () => {
    setDataSinger((prev) => {
      return {
        ...prev,
        singerSocial: [...prev.singerSocial, dataSocial],
      };
    });
  };

  const deleteSocial = (index) => {
    setDataSinger((prev) => {
      const newSocial = prev.singerSocial.filter((_, i) => i !== index);
      return {
        ...prev,
        singerSocial: newSocial,
      };
    });
  };

  const handleShowCreate = (e) => {
    const boxCreate = e.target.parentElement.querySelector(
      ".lyrics_singer_create"
    );
    boxCreate.classList.toggle("active");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDataSinger((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async () => {
    try {
      const resultAction = await dispatch(createSingerThunk(dataSinger));
      const result = unwrapResult(resultAction);
      setDataSinger(initState);
    } catch (error) {
      console.error("Submit failed:", error);
    }
  };

  return (
    <div className="tab_content lyrics_singer_content" data-content="singer">
      <p onClick={handleShowCreate}>Create Singer</p>

      <div className="lyrics_singer_create">
        <div className="lyrics_singer_create_head">
          <div className="lyrics_singer_create_left">
            <div className="create_g">
              <span>Singer Name</span>
              <input
                placeholder="Country Name..."
                onChange={handleChange}
                name="singerName"
                value={dataSinger.singerName}
              />
            </div>
            <div className="create_g">
              <span>Singer Image</span>
              <input
                placeholder="Link country Image...."
                onChange={handleChange}
                name="singerImage"
                value={dataSinger.singerImage}
              />
            </div>

            <div className="create_g">
              <span>Singer Country</span>
              <select
                onChange={handleChange}
                name="singerCountry"
                value={dataSinger.singerCountry}
              >
                <option value="">None</option>
                {country.map((item) => (
                  <option value={item._id}>{item.countryName}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="lyrics_singer_create_right">
            <div className="create_g">
              <span>Social</span>
              <div className="lyrics_singer_create_right_g">
                <select
                  onChange={handleSocial}
                  name="nameSocial"
                  value={dataSocial.nameSocial}
                >
                  <option value="">None</option>
                  {socialData.map((item) => (
                    <option value={item}>{item}</option>
                  ))}
                </select>
                <input
                  placeholder="Link Social"
                  onChange={handleSocial}
                  name="linkSocial"
                  value={dataSocial.linkSocial}
                />
              </div>
            </div>
            <p onClick={addSocial}>Add Social</p>

            <div className="lyrics_singer_create_right_list_social">
              {dataSinger.singerSocial.map((item, i) => (
                <div className="list_g" key={i}>
                  <span>{item.nameSocial}</span>
                  <span>{item.linkSocial}</span>
                  <p onClick={() => deleteSocial(i)}>Delete</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="create_g">
          <span>Singer Description</span>
          <textarea
            placeholder="Albums detail...."
            onChange={handleChange}
            name="description"
            value={dataSinger.description}
          />
        </div>

        <p onClick={handleSubmit}>Create</p>
      </div>

      <div className="lyrics_singer_content_list">
        {singers.map((item) => (
          <LyricsSingerCard data={item} key={item._id} />
        ))}
      </div>
    </div>
  );
};
