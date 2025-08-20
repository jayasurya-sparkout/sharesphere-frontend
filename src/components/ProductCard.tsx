"use client";

import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import placeHolder from "@/assets/images/placeholder.png";

export interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string[];
  stock?: number;
  isAvailable?: boolean;
  sku?: string;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ProductCardProps {
  product: Product;
  productClass?: string;
}

export default function ProductCard({ product, productClass }: ProductCardProps) {
  return (
    <Card className={`w-full max-w-sm rounded-2xl shadow-lg overflow-hidden border hover:shadow-xl transition-shadow bg-white pt-0 gap-0 ${productClass && productClass}`}>
      <div className="relative w-full">
        <AspectRatio ratio={16 / 9}>
          <Image
            src={product.imageUrl && product.imageUrl.length > 0 ? product.imageUrl[0] : placeHolder}
            alt={product.name}
            fill
            className="object-cover rounded-t-2xl"
          />
        </AspectRatio>

        <div className="absolute top-3 right-3">
          {product.isAvailable ? (
            <Badge className="bg-green-600 text-white shadow-md">In Stock</Badge>
          ) : (
            <Badge variant="destructive" className="shadow-md">Out of Stock</Badge>
          )}
        </div>
      </div>

      <CardHeader className="pt-4 pb-2">
        <h2 className="text-lg font-semibold text-gray-900">{product.name}</h2>
        <p className="text-sm text-gray-500">{product.category}</p>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-gray-600 line-clamp-2 min-h-[40px]">{product.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xl font-bold text-indigo-600">
            ₹ {product.price}
          </span>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between pt-2">
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg cursor-pointer px-5">
          View
        </Button>
        <Button
          variant="secondary"
          className="rounded-lg border-indigo-600 text-indigo-600 hover:bg-indigo-100 cursor-pointer"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
