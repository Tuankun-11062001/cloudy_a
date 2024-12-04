import React from "react";
import BlogTabs from "../components/blogTab";
import { BlogCategoryContent, BlogsContent } from "../components/blogContent";

const BlogPage = () => {
  return (
    <div className="blogs">
      <BlogTabs />
      <div className="blogs_container">
        <BlogsContent />
        <BlogCategoryContent />
      </div>
    </div>
  );
};

export default BlogPage;
