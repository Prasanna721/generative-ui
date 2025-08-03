import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Generative UI Test App
        </h1>
        <div className="space-y-4">
          <div className="space-x-4">
            <Link 
              href="/gen-ui" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Generative UI
            </Link>
            <Link 
              href="/components" 
              className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              View Components
            </Link>
          </div>
          <p className="text-gray-600 max-w-md mx-auto">
            Generate UI from content and design context using AI, or explore the 
            component library with Material Design 3 components.
          </p>
        </div>
      </div>
    </div>
  );
}
