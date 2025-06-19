"use client";
import { useActionState } from "react";
import { createSnippet } from "@/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";

const Page = () => {
  const [state, dispatch] = useActionState(createSnippet, { message: "" });

  return (
    <form
      action={dispatch}
      className="max-w-xl mx-auto p-6 space-y-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow mt-10"
    >
      <div className="space-y-2">
        <Label htmlFor="title" className="text-lg font-medium text-gray-800 dark:text-gray-100">
          Title
        </Label>
        <Input
          name="title"
          id="title"
          placeholder="Enter snippet title"
          className="bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="snippet" className="text-lg font-medium text-gray-800 dark:text-gray-100">
          Snippet
        </Label>
        <Textarea
          name="snippet"
          id="snippet"
          placeholder="Write your code here..."
          rows={10}
          className="font-mono bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600"
        />
      </div>

      {state.message && <p className="text-red-500">{state.message}</p>}

      <Button type="submit" className="w-full text-base">
        Create Snippet
      </Button>
    </form>
  );
};

export default Page;
