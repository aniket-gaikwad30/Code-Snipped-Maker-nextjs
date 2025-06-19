import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { deleteSnippet } from "@/actions";
import { notFound } from "next/navigation";
import { Pencil, Trash2, ArrowLeft } from "lucide-react";

interface SnippetPageProps {
  params: { id: string };
}

const SnippetPage = async ({ params }: SnippetPageProps) => {
  await new Promise((resolve) => setTimeout(resolve, 500)); // simulate delay

  const id = parseInt(params.id);

  const snippet = await prisma.snippet.findUnique({
    where: { id },
  });

  const deleteSnippetAction = deleteSnippet.bind(null, id);

  if (!snippet) return notFound();

  return (
    <div className="max-w-3xl mx-auto p-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          {snippet.title}
        </h1>
        <Link href="/">
          <Button variant="ghost" className="flex items-center gap-2 text-sm">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
      </div>

      {/* Snippet Code */}
      <div className="rounded-lg border border-gray-300 dark:border-gray-700 bg-muted dark:bg-gray-900 p-4 shadow-sm overflow-auto">
        <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800 dark:text-gray-100 leading-relaxed">
          {snippet.code}
        </pre>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Link href={`/snippet/${snippet.id}/edit`}>
          <Button variant="secondary" className="flex items-center gap-2 text-sm">
            <Pencil className="h-4 w-4" />
            Edit
          </Button>
        </Link>
        <form action={deleteSnippetAction}>
          <Button
            type="submit"
            variant="destructive"
            className="flex items-center gap-2 text-sm"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SnippetPage;
