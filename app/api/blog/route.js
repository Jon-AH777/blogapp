import { ConnectDB } from "@/app/lib/config/db";
import BlogModel from "@/app/lib/models/blogModel";
import { writeFile } from "fs/promises";
const { NextResponse } = require("next/server");
const fs = require("fs");

const LoadDB = async () => {
  await ConnectDB();
};

LoadDB();

//API endpoint to get blogs
export async function GET(req) {
  const blogId = req.nextUrl.searchParams.get("id");
  if (blogId) {
    const blog = await BlogModel.findById(blogId);
    return NextResponse.json(blog);
  } else {
    const blogs = await BlogModel.find({});
    return NextResponse.json({ blogs });
  }
}

//API endpoint for uploading blogs

export async function POST(req) {
  const formData = await req.formData();
  const timestamp = Date.now();

  const image = formData.get("image");
  const imageByData = await image.arrayBuffer();
  const buffer = Buffer.from(imageByData);
  const path = `./public/${timestamp}_${image.name}`;
  await writeFile(path, buffer);
  const imgUrl = `/${timestamp}_${image.name}`;

  const blogData = {
    title: `${formData.get("title")}`,
    description: `${formData.get("description")}`,
    category: `${formData.get("category")}`,
    author: `${formData.get("author")}`,
    image: `${imgUrl}`,
    authorImg: `${formData.get("authorImg")}`,
  };

  await BlogModel.create(blogData);
  console.log("blog saved");

  return NextResponse.json({ success: true, msg: "Blog added" });
}

//creating API endpoin to delete blog
export async function DELETE(req) {
  const id = await req.nextUrl.searchParams.get("id");
  const blog = BlogModel.findById(id);
  fs.unlink(`./public${blog.image}`, () => {});
  await BlogModel.findByIdAndDelete(id);
  return NextResponse.json({ msg: "Blog Deleted" });
}
