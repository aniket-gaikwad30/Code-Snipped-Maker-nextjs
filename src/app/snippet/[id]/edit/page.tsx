import EditSnippet from "@/components/ui/EditSnippet";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface EditPageSnippetProps {
  params: Promise<{ id: string }>;
}

const EditPageSnippet = async ({ params }: EditPageSnippetProps) => {
  const { id } = await params;
  const snippetId = parseInt(id);

  if (isNaN(snippetId)) {
    return notFound();
  }

  const snippet = await prisma.snippet.findUnique({
    where: { id: snippetId },
  });

  if (!snippet) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href={`/snippet/${snippet.id}`} className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Snippet
        </Link>

        {/* Header */}
        <div className="bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-2xl backdrop-blur-md border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-8 text-white">
            <h1 className="text-3xl font-bold neon-glow">✏️ Edit Snippet</h1>
            <p className="text-blue-100 mt-2">Edit your code snippet with the Monaco editor</p>
          </div>
        </div>

        {/* Editor Container */}
        <div className="bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-2xl backdrop-blur-md border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-8">
            <EditSnippet snippet={snippet} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPageSnippet;
