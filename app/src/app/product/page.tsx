import { GridItem, GridLayout, LinearLayout, RelativeItem, RelativeLayout } from '@generative-ui/core';
import React from 'react';

const Button = ({ children, className = '', variant = 'default', ...props }: any) => {
  const baseClass = "px-4 py-2 rounded-md font-medium transition-colors";
  const variantClass = variant === 'outline'
    ? "border border-gray-300 text-gray-700 hover:bg-gray-50"
    : "bg-blue-600 text-white hover:bg-blue-700";

  return (
    <button className={`${baseClass} ${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Badge = ({ children, className = '' }: any) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 ${className}`}>
    {children}
  </span>
);

const Card = ({ children, className = '' }: any) => (
  <div className={`bg-white rounded-lg border shadow-sm ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = '' }: any) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

export default function ProductPage() {
  return (
    <LinearLayout
      orientation="vertical"
      className="min-h-screen bg-gray-50 p-4 gap-6"
    >
      {/* Header */}
      <LinearLayout
        orientation="horizontal"
        className="justify-between items-center bg-white p-4 rounded-lg shadow-sm"
      >
        <h1 className="text-2xl font-bold text-gray-900">TechStore</h1>
        <LinearLayout orientation="horizontal" className="gap-4">
          <Button variant="outline">Cart (2)</Button>
          <Button>Sign In</Button>
        </LinearLayout>
      </LinearLayout>

      {/* Main Content */}
      <GridLayout columns={3} className="gap-6 max-w-7xl mx-auto w-full">

        {/* Product Images - Span 2 columns */}
        <GridItem span={2}>
          <RelativeLayout className="h-96 bg-white rounded-lg overflow-hidden shadow-sm">
            <img
              src="https://via.placeholder.com/600x400/e5e7eb/6b7280?text=Product+Image"
              alt="Product"
              className="w-full h-full object-cover"
            />
            <RelativeItem position="top-right" className="m-4">
              <Badge>New</Badge>
            </RelativeItem>
            <RelativeItem position="bottom-left" className="m-4">
              <Button className="bg-white text-gray-900 hover:bg-gray-100">
                🔍 Zoom
              </Button>
            </RelativeItem>
          </RelativeLayout>

          {/* Thumbnail Images */}
          <LinearLayout orientation="horizontal" className="gap-2 mt-4">
            {[1, 2, 3, 4].map(i => (
              <div
                key={i}
                className="w-20 h-20 bg-gray-200 rounded-md border-2 border-transparent hover:border-blue-500 cursor-pointer"
              >
                <img
                  src={`https://via.placeholder.com/80x80/e5e7eb/6b7280?text=${i}`}
                  alt={`Thumbnail ${i}`}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            ))}
          </LinearLayout>
        </GridItem>

        {/* Product Info - Span 1 column */}
        <GridItem span={1}>
          <Card className="h-fit">
            <CardContent>
              <LinearLayout orientation="vertical" className="gap-4">

                {/* Product Title & Rating */}
                <LinearLayout orientation="vertical" className="gap-2">
                  <h2 className="text-3xl font-bold text-gray-900">
                    Premium Wireless Headphones
                  </h2>
                  <LinearLayout orientation="horizontal" className="items-center gap-2">
                    <div className="flex text-yellow-400">★★★★★</div>
                    <span className="text-sm text-gray-600">(127 reviews)</span>
                  </LinearLayout>
                </LinearLayout>

                {/* Price */}
                <LinearLayout orientation="horizontal" className="items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-900">$299</span>
                  <span className="text-lg text-gray-500 line-through">$399</span>
                  <Badge>25% OFF</Badge>
                </LinearLayout>

                {/* Actions */}
                <LinearLayout orientation="vertical" className="gap-2">
                  <Button className="w-full">Add to Cart</Button>
                  <Button variant="outline" className="w-full">Buy Now</Button>
                </LinearLayout>
              </LinearLayout>
            </CardContent>
          </Card>
        </GridItem>
      </GridLayout>

      {/* Related Products */}
      <LinearLayout orientation="vertical" className="gap-4 max-w-7xl mx-auto w-full">
        <h3 className="text-xl font-bold text-gray-900">Related Products</h3>
        <GridLayout columns={4} className="gap-4">
          {[1, 2, 3, 4].map(i => (
            <GridItem key={i}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <div className="aspect-square bg-gray-200 rounded-t-lg">
                  <img
                    src={`https://via.placeholder.com/200x200/e5e7eb/6b7280?text=Product+${i}`}
                    alt={`Related Product ${i}`}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </div>
                <CardContent className="p-4">
                  <LinearLayout orientation="vertical" className="gap-2">
                    <h4 className="font-medium text-gray-900">Related Product {i}</h4>
                    <div className="text-lg font-bold text-gray-900">$199</div>
                    <Button className="w-full text-sm">View Details</Button>
                  </LinearLayout>
                </CardContent>
              </Card>
            </GridItem>
          ))}
        </GridLayout>
      </LinearLayout>
    </LinearLayout>
  );
}