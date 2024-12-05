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

const LyricsDetail = () => {
  const { data } = useLocation().state;
  const { singers } = useSelector((state) => state.singer);
  const { country } = useSelector((state) => state.country);
  const { lyrics } = useSelector((state) => state.category);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const [dataLyrics, setDataLyrics] = useState(data);

  const handleOriginal = () => {
    setDataLyrics({
      lyrics: dataLyrics?.lyrics,
      chords: dataLyrics?.chords,
      explain: dataLyrics?.explain,
    });
  };

  const handleTranslate = (item) => {
    setDataLyrics({
      lyrics: item.userLyrics,
      chords: item.userChords,
      explain: item.userExplain,
    });
  };

  const tabs = (e) => {
    const parent = e.target.closest(".tabs_contents");
    console.log(parent);
    const tabElements = parent.querySelectorAll(".tabs_contents_tab p");
    const tabContents = parent.querySelectorAll(".tab_content");
    tabElements.forEach((tab) => {
      tab.classList.remove("active");
    });

    let tabData = e.target.dataset.tabscontents;

    tabContents.forEach((content) => {
      content.classList.remove("active");
      if (tabData === content.dataset.tabcontent) {
        console.log(content);
        content.classList.add("active");
      }
    });

    e.target.classList.add("active");
  };

  const relativeTabs = (e) => {
    const parent = e.target.closest(".lyrics_relative_other");
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
      .closest(".lyrics_detail_content")
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataLyrics((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleChangeLyrics = (data) => {
    setDataLyrics((prev) => {
      return {
        ...prev,
        lyrics: data,
      };
    });
  };

  const handleChangeChords = (data) => {
    setDataLyrics((prev) => {
      return {
        ...prev,
        chords: data,
      };
    });
  };

  const handleChangeExplain = (data) => {
    setDataLyrics((prev) => {
      return {
        ...prev,
        explain: data,
      };
    });
  };

  const handleSubmit = async () => {
    console.log(dataLyrics);
    try {
      const resultAction = await dispatch(editLyricsThunk(dataLyrics));

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
    dispatch(deleteLyricsThunk(data));
  };

  return (
    <div className="lyrics_detail">
      <p className="back" onClick={handleBack}>
        {appSvg.arrowDown}
      </p>
      <div className="lyrics_detail_content">
        <div className="lyrics_detail_content_info">
          <div className="top">
            <p onClick={handleShowCreate}>Edit</p>
            <p onClick={showConfirm}>Delete</p>
            <div className="top_comfirm">
              <h4>Are you sure?</h4>
              <p onClick={handleYes}>Yes</p>
              <p onClick={showConfirm}>No</p>
            </div>
          </div>
          <div className="lyrics_content_create">
            <div className="lyrics_content_create_left">
              {message && <p className="message">{message}</p>}
              <div className="create_head_g">
                <div className="create_g">
                  <span>Public</span>
                  <select
                    name="public"
                    onChange={handleChange}
                    value={dataLyrics.public}
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
                    value={dataLyrics.trending}
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
                    value={dataLyrics.slider}
                  >
                    <option value={false}>False</option>
                    <option value={true}>True</option>
                  </select>
                </div>
              </div>
              <div className="create_g">
                <span>Lyrics Name</span>
                <input
                  placeholder="Lyrics Name..."
                  name="title"
                  onChange={handleChange}
                  value={dataLyrics.title}
                />
              </div>
              <div className="create_g">
                <span>Lyrics link thumbnail</span>
                <input
                  placeholder="Lyrics image"
                  name="thumbnail"
                  onChange={handleChange}
                  value={dataLyrics.thumbnail}
                />
              </div>

              <div className="create_g">
                <span>Lyrics link thumbnail Banner</span>
                <input
                  placeholder="Lyrics thumbnail Banner"
                  name="thumbnailBanner"
                  onChange={handleChange}
                  value={dataLyrics.thumbnailBanner}
                />
              </div>

              <div className="create_g">
                <span>Lyrics Link Youtube</span>
                <input
                  placeholder="Lyrics link Youtube"
                  name="linkYoutube"
                  onChange={handleChange}
                  value={dataLyrics.linkYoutube}
                />
              </div>

              <div className="create_g">
                <span>Lyrics Singer</span>
                <select
                  name="singer"
                  onChange={handleChange}
                  value={dataLyrics.singer._id}
                >
                  <option value="">Choose</option>
                  {singers?.map((singer) => (
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
                  value={dataLyrics.category._id}
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
                  value={dataLyrics.country?._id}
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
                  value={dataLyrics.release}
                />
              </div>

              <div className="create_g">
                <span>Lyrics description</span>
                <textarea
                  placeholder="Lyrics description"
                  name="description"
                  onChange={handleChange}
                  value={dataLyrics.description}
                />
              </div>
              <p className="submit" onClick={handleSubmit}>
                Save
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
                <TipTap change={handleChangeLyrics} state={dataLyrics.lyrics} />
              </div>

              <div
                className="create_right_tab_content tab_content_chords"
                data-createcontent="chords"
              >
                <span>Lyrics Chords</span>
                <TipTap change={handleChangeChords} state={dataLyrics.chords} />
              </div>

              <div
                className="create_right_tab_content tab_content_explain"
                data-createcontent="explain"
              >
                <span>Lyrics Explain</span>
                <TipTap
                  change={handleChangeExplain}
                  state={dataLyrics.explain}
                />
              </div>
            </div>
          </div>

          <div className="head">
            <h1>{dataLyrics?.title}</h1>
            <p>{dataLyrics?.description}</p>
            <div className="head_box">
              <div className="item">
                <h4>Public</h4>
                {dataLyrics?.public ? appSvg.check : appSvg.none}
              </div>
              <div className="item">
                <h4>Trending</h4>
                {dataLyrics?.trending ? appSvg.check : appSvg.none}
              </div>
              <div className="item">
                <h4>Views</h4>
                <p>{dataLyrics?.view}</p>
              </div>
              <div className="item">
                <h4>Share</h4>
                <p>{dataLyrics?.share}</p>
              </div>
              <div className="item">
                <h4>Cloudy</h4>
                <p>{dataLyrics?.cloudy?.length}</p>
              </div>
              <div className="item">
                <h4>Translate</h4>
                <p>{dataLyrics?.translate?.length}</p>
              </div>
              <div className="item">
                <h4>Slider</h4>
                <p>{dataLyrics?.slider ? appSvg.check : appSvg.none}</p>
              </div>
              <div className="item">
                <h4>Singer</h4>
                <p>{dataLyrics?.singer?.singerName}</p>
              </div>
              <div className="item">
                <h4>Release</h4>
                <p>{dataLyrics?.release}</p>
              </div>
              <div className="item">
                <h4>Category</h4>
                <p>{dataLyrics?.category?.categoryName}</p>
              </div>
              <div className="item">
                <h4>Country</h4>
                <p>{dataLyrics?.country?.countryName}</p>
              </div>
            </div>
          </div>
          <div className="tabs">
            <p onClick={handleOriginal}>Lyrics</p>
            <div className="tabs_translate">
              <span>Translate</span>
              {dataLyrics?.translate?.map((user) => (
                <p key={user._id} onClick={() => handleTranslate(user)}>
                  {user.user.userName}
                </p>
              ))}
            </div>
          </div>
          <div className="tabs_contents">
            <div className="tabs_contents_tab">
              <p onClick={tabs} data-tabsContents="lyrics">
                Lyircs
              </p>
              <p onClick={tabs} data-tabsContents="chords">
                Chords
              </p>
              <p onClick={tabs} data-tabsContents="explain">
                Explain
              </p>
            </div>
            <div
              className="tab_content tab_content_lyrics"
              data-tabContent="lyrics"
              dangerouslySetInnerHTML={{ __html: dataLyrics?.lyrics }}
            ></div>
            <div
              className="tab_content tab_content_chords"
              data-tabContent="chords"
              dangerouslySetInnerHTML={{ __html: dataLyrics?.chords }}
            ></div>
            <div
              className="tab_content tab_content_explain"
              data-tabContent="explain"
              dangerouslySetInnerHTML={{ __html: dataLyrics?.explain }}
            ></div>
          </div>
        </div>
        <div className="lyrics_detail_content_relative">
          <div className="lyrics_relative_other">
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
              <img src={dataLyrics?.thumbnail} />
            </div>
            <div
              className="other_content other_content_banner"
              data-othercontent="banner"
            >
              <img src={dataLyrics?.thumbnailBanner} />
            </div>
            <div
              className="other_content other_content_youtube"
              data-othercontent="youtube"
            >
              <iframe
                width="560"
                height="315"
                src={dataLyrics?.linkYoutube?.replace(
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
        <div className="lyrics_detail_content_comments"></div>
      </div>
    </div>
  );
};

export default LyricsDetail;
