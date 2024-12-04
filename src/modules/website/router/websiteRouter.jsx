import React from "react";
import { Route, Routes } from "react-router-dom";
import Website from "../pages/website";
import WebsiteLayout from "../layout/websiteLayout";
import CommunicationRouter from "../feature/communication/router/communicationRouter";
import LyricsRouter from "../feature/lyrics/router/lyricsRouter";
import BlogRoute from "../feature/blogs/router/blogRoute";
import BookRoute from "../feature/books/router/bookRoute";
import ShopRouter from "../feature/shop/router/shopRouter";
import ProfileRoute from "../feature/profile/router/profileRoute";
import UserRoute from "../feature/user/router/userRoute";
import SupportRoute from "../feature/support/routes/supportRoute";
import AdsRoute from "../feature/ads/routes/adsRoute";
import EventRoute from "../feature/event/routes/eventRoute";

const WebsiteRouter = () => {
  return (
    <WebsiteLayout>
      <Routes>
        <Route path="/" element={<Website />} />
        <Route path="communication/*" element={<CommunicationRouter />} />
        <Route path="lyrics/*" element={<LyricsRouter />} />
        <Route path="blog/*" element={<BlogRoute />} />
        <Route path="book/*" element={<BookRoute />} />
        <Route path="shop/*" element={<ShopRouter />} />
        <Route path="profile/*" element={<ProfileRoute />} />
        <Route path="user/*" element={<UserRoute />} />
        <Route path="support/*" element={<SupportRoute />} />
        <Route path="ads/*" element={<AdsRoute />} />
        <Route path="event/*" element={<EventRoute />} />
        <Route path="*" element={<p>Error</p>} />
      </Routes>
    </WebsiteLayout>
  );
};

export default WebsiteRouter;
