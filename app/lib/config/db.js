import mongoose from "mongoose";

export const ConnectDB = async () => {
    await mongoose.connect('mongodb+srv://sanarungsubba:0m0PCNHnhakKkzb3@cluster0.rtf3skk.mongodb.net/BlogApp')
    console.log("DB connected")
}