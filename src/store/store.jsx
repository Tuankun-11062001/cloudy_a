import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlices";
import communicationReducer from "./slices/communicationSlide";
import categoryReducer from "./slices/categorySlide";
import countryReducer from "./slices/countrySlice";
import albumReducer from "./slices/albumsSlice";
import singerReducer from "./slices/singerSlice";
import lyricsReducer from "./slices/lyricsSlice";
import blogsReducer from "./slices/blogSlice";
import booksReducer from "./slices/bookSlice";
import chaptersReducer from "./slices/chapterSlice";
import partnerReducer from "./slices/partnerSlice";
import shopReducer from "./slices/shopSlice";
import userReducer from "./slices/userSlice";
import profileReducer from "./slices/profileSlice";
import supportReducer from "./slices/supportSlice";
import adsReducer from "./slices/adsSlice";
import eventReducer from "./slices/eventSlice";

export const storeApp = configureStore({
  reducer: {
    auth: authReducer,
    communication: communicationReducer,
    category: categoryReducer,
    country: countryReducer,
    album: albumReducer,
    singer: singerReducer,
    lyrics: lyricsReducer,
    blogs: blogsReducer,
    books: booksReducer,
    chapters: chaptersReducer,
    partners: partnerReducer,
    shop: shopReducer,
    user: userReducer,
    profile: profileReducer,
    support: supportReducer,
    ads: adsReducer,
    event: eventReducer,
  },
});
