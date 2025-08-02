import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Generative UI Test App
        </h1>
        <div className="space-y-4">
          <div>
            <Link 
              href="/product" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Product Page
            </Link>
          </div>
          <p className="text-gray-600 max-w-md mx-auto">
            This is a test app for the Generative UI layout primitives. 
            Click above to see the ProductPage example using LinearLayout, 
            GridLayout, and RelativeLayout components.
          </p>
        </div>
      </div>
    </div>
  );
}
