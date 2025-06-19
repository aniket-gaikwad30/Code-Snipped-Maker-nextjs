import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import SnippetClient from "@/components/snippet/SnippetClient";

interface SnippetPageProps {
  params: Promise<{ id: string }>;
}

const SnippetPage = async ({ params }: SnippetPageProps) => {
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

  return <SnippetClient snippet={snippet} />;
};

export default SnippetPage;
