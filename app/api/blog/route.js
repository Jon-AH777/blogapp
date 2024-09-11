import { ConnectDB } from "@/app/lib/config/db"
import { writeFile} from 'fs/promises';
const { NextResponse } = require("next/server")

const LoadDB = async () => {
    await ConnectDB();
}

LoadDB();

export async function GET(req) {

    return NextResponse.json({msg: "API Working"})
}

export async function POST(req) {
    const formData = await req.formData();
    const timestamp = Date.now();

    const image = formData.get('image');
    const imageByData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByData);
    const path = `./public/${timestamp}_${image.name}`;
    await writeFile(path,buffer);
    const imgUrl = `/${timestamp}_${image.name}`;
    console.log(imgUrl);
    return NextResponse.json({imgUrl});
}