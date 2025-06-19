import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="text-6xl font-bold gradient-text">404</div>
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Snippet Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-md">
          The snippet you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Button asChild className="glossy-btn">
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Snippets
          </Link>
        </Button>
      </div>
    </div>
  );
}
