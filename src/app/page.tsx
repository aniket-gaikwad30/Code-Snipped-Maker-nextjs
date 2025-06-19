import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  const snippets = await prisma.snippet.findMany();

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">📄 Snippets</h1>
        <Link href="/snippet/new">
          <Button>Add Snippet</Button>
        </Link>
      </div>

      {/* Snippet List */}
      <div className="space-y-4">
        {snippets.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400 italic">
            No snippets yet. Start by adding one!
          </p>
        ) : (
          snippets.map((snippet: any) => (
            <div
              key={snippet.id}
              className="flex justify-between items-center border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-base font-medium text-gray-900 dark:text-white truncate max-w-xs">
                {snippet.title}
              </h3>

              <Link href={`/snippet/${snippet.id}`}>
                <Button variant="outline" className="text-sm">
                  View
                </Button>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
