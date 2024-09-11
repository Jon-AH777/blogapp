'use client'

import { blog_data } from "@/Assets/assets";
import React from "react";
import BlogItem from "./blogItem";
import { useState } from "react";
const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const menuItems = ["All", "Technology", "Startup", "Lifestyle"];
  return (
    <div>
      <div className="flex justify-center gap-6 my-10">
      {menuItems.map((item) => (
      <button
        key={item}
        onClick={() => setMenu(item)}
        className={menu === item ? 'bg-black text-white py-1 px-4 rounded-sm' : ""}
      >
        {item}
      </button>
    ))}
      </div>
      <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
        {blog_data.filter((item) => menu === "All" ? true : item.category === menu).map((item, index) => {
          return (
            <BlogItem
            key={index}
            id={item.id}
              image={item.image}
              title={item.title}
              description={item.description}
              category={item.category}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BlogList;
