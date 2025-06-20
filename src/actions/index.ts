"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createSnippet(formData: FormData) {
  const title = formData.get("title") as string;
  const code = formData.get("snippet") as string;
  const tagsString = formData.get("tags") as string;

  // Validation
  if (!title || !code) {
    return { message: "Title and code are required" };
  }

  if (title.length > 100) {
    return { message: "Title must be less than 100 characters" };
  }

  if (code.length > 10000) {
    return { message: "Code must be less than 10,000 characters" };
  }

  // Parse tags
  let tags: string[] = [];
  try {
    tags = JSON.parse(tagsString || "[]");
    if (!Array.isArray(tags)) {
      tags = [];
    }
    // Validate and clean tags
    tags = tags
      .filter(tag => typeof tag === "string" && tag.trim().length > 0)
      .map(tag => tag.trim().toLowerCase())
      .slice(0, 10); // Limit to 10 tags
  } catch {
    tags = [];
  }

  try {
    await prisma.snippet.create({
      data: {
        title: title.trim(),
        code: code.trim(),
        tags: JSON.stringify(tags), // Store as JSON string
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.error("Error creating snippet:", error);
    return { message: "Failed to create snippet. Please try again." };
  }

  redirect("/");
}

export async function saveSnippet(id: number, code: string) {
  try {
    if (!code || code.length > 10000) {
      return { message: "Invalid code content" };
    }

    await prisma.snippet.update({
      where: { id },
      data: { code: code.trim() },
    });

    revalidatePath("/");
    revalidatePath(`/snippet/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Error saving snippet:", error);
    return { message: "Failed to save snippet. Please try again." };
  }
}

export async function deleteSnippet(id: number) {
  try {
    await prisma.snippet.delete({
      where: { id },
    });

    revalidatePath("/");
  } catch (error) {
    console.error("Error deleting snippet:", error);
    return { message: "Failed to delete snippet. Please try again." };
  }

  redirect("/");
}
