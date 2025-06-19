"use client";
import { useActionState } from "react";
import { createSnippet } from "@/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { X, Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";

function TagInput({ tags, setTags }: { tags: string[]; setTags: (tags: string[]) => void }) {
  const [input, setInput] = useState("");
  
  const addTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (input && !tags.includes(input)) {
      setTags([...tags, input]);
      setInput("");
    }
  };
  
  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag));
  
  return (
    <div className="flex flex-wrap gap-2 bg-white/30 dark:bg-gray-800/30 rounded-lg px-2 py-1 backdrop-blur-md">
      {tags.map((tag) => (
        <span key={tag} className="flex items-center gap-1 bg-gradient-to-r from-purple-400 to-blue-400 text-white px-2 py-0.5 rounded-full text-xs font-mono animate-in fade-in">
          {tag}
          <button type="button" onClick={() => removeTag(tag)} className="ml-1 hover:text-red-300">
            <X size={12} />
          </button>
        </span>
      ))}
      <form onSubmit={addTag} className="flex items-center">
        <input
          className="bg-transparent outline-none text-sm px-1 font-mono"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add tag"
        />
        <button type="submit" className="ml-1 text-blue-400">
          <Plus size={14} />
        </button>
      </form>
    </div>
  );
}

const Page = () => {
  const [state, dispatch] = useActionState(
    async (prevState: { message: string }, formData: FormData) => {
      return await createSnippet(formData);
    },
    { message: "" }
  );
  const [tags, setTags] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Snippets
        </Link>

        {/* Form Card */}
        <div className="bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-2xl backdrop-blur-md border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-8 text-white">
            <h1 className="text-3xl font-bold neon-glow">Create New Snippet</h1>
            <p className="text-blue-100 mt-2">Add your code snippet with tags for easy organization</p>
          </div>

          <div className="p-8">
            <form
              action={async (formData) => {
                formData.append("tags", JSON.stringify(tags));
                await dispatch(formData);
              }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <Label htmlFor="title" className="text-lg font-medium text-gray-800 dark:text-gray-100">
                  Title
                </Label>
                <Input
                  name="title"
                  id="title"
                  placeholder="Enter snippet title"
                  className="bg-gray-50/60 dark:bg-gray-800/60 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 focus-glow"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="snippet" className="text-lg font-medium text-gray-800 dark:text-gray-100">
                  Code Snippet
                </Label>
                <Textarea
                  name="snippet"
                  id="snippet"
                  placeholder="Write your code here..."
                  rows={12}
                  className="font-mono bg-gray-50/60 dark:bg-gray-800/60 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 focus-glow"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-lg font-medium text-gray-800 dark:text-gray-100">Tags</Label>
                <TagInput tags={tags} setTags={setTags} />
              </div>

              {state.message && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <p className="text-red-600 dark:text-red-400 animate-in fade-in">{state.message}</p>
                </div>
              )}

              <Button type="submit" className="w-full text-base glossy-btn">
                Create Snippet
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
