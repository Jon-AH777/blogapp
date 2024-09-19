"use client";
import { ToastContainer } from "react-toastify";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import BlogList from "./_components/blogList";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <>
      <ToastContainer theme="dark" />
      <Header />
      <BlogList />
      <Footer />
    </>
  );
}
