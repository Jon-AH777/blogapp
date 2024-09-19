import { ConnectDB } from "@/app/lib/config/db";
import EmailModel from "@/app/lib/models/emailModel";
import { NextResponse } from "next/server";

const LoadDB = async () => {
  await ConnectDB();
};
LoadDB();

export async function POST(req) {
  const formData = await req.formData();
  const emailData = {
    email: `${formData.get("email")}`,
  };
  await EmailModel.create(emailData);
  return NextResponse.json({ success: true, msg: "Email subscribed" });
}

export async function GET(req) {
  const emails = await EmailModel.find({});
  return NextResponse.json({ emails });
}

export async function DELETE(req) {
  const id = await req.nextUrl.searchParams.get("id");
  await EmailModel.findByIdAndDelete(id);
  return NextResponse.json({ success: true, msg: "Email Deleted" });
}
