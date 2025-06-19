"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export const saveSnippet = async (id: number, code: string) => {
  await prisma.snippet.update({
    where: { id },
    data: { code },
  });

  redirect(`/snippet/${id}`);
};



export const deleteSnippet = async (id: number) => {
  await prisma.snippet.delete({
    where: { id },
  });

  redirect("/");
};

// server action
export async function createSnippet(previous : {message : String }, formData: FormData) {
 
  const title = formData.get("title");
  const code = formData.get("snippet");


  if(typeof title !== "string" || title.trim() === "" ) {
    return {
      message: "Title is required",
    };  
  }

  if(typeof code !== "string" || code.trim() === "") {
    return {
      message: "Code is required",
    };
  }
    

  const snippet = await prisma.snippet.create({
    data: {
      title: title as string,
      code: code as string,
    },
  });

  console.log(snippet);
  redirect("/");
}
