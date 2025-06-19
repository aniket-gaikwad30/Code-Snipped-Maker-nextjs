import EditSnippet from "@/components/ui/EditSnippet";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";

const EditPageSnippet = async ({ params }: { params: { id: string } }) => {
  const id = parseInt(params.id);
  const snippet = await prisma.snippet.findUnique({
    where: { id },
  });

  if (!snippet) return notFound();

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          ✏️ Edit Snippet
        </h1>
      </div>

      {/* Form Container */}
      <div className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow p-6">
        <EditSnippet snippet={snippet} />
      </div>
    </div>
  );
};

export default EditPageSnippet;
