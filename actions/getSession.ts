"use server";

import { authOptions } from "@/utils/AuthOptions";
import { getServerSession } from "next-auth";

export default async function getSession() {
  return await getServerSession(authOptions);
}