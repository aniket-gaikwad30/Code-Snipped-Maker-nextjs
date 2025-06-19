import prisma from "@/lib/prisma";
import SnippetListClient from "@/components/snippet/SnippetListClient";

export default async function Home() {
  const snippets = await prisma.snippet.findMany();
  return <SnippetListClient snippets={snippets} />;
}
