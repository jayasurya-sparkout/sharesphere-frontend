"use client";

import { useState, useEffect } from "react";
import ProductCard, { Product } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api";

export default function Page() {
  const [userId, setUserId] = useState<string>("");
  const [otherProducts, setOtherProducts] = useState<Product[]>([]);
  const [myProducts, setMyProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<{
    name: string;
    description: string;
    price: string;
    stock: string;
    category: string;
    imageUrl: string | FileList;
  }>({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    imageUrl: "",
  });
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const userDetails = localStorage.getItem('userDetails');
    if (userDetails) {
      const parsedData = JSON.parse(userDetails);
      setUserId(parsedData.userId);
    }
  }, [])
  const fetchProducts = async () => {
    try {
      const resOthers = await api.get(`/products/others/${userId}`);
      const resMine = await api.get(`/products/my-products/${userId}`);
      console.log(resMine);

      setOtherProducts(resOthers.data);
      setMyProducts(resMine.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchProducts();
    };
  }, [userId]);

  const handleAddProduct = async () => {
    try {
      const formData = new FormData();

      formData.append("name", newProduct.name);
      formData.append("description", newProduct.description);
      formData.append("price", newProduct.price);
      formData.append("stock", newProduct.stock);
      formData.append("category", newProduct.category);
      formData.append("userId", userId);

      for (let i = 0; i < newProduct.imageUrl.length; i++) {
        formData.append("imageUrl", newProduct.imageUrl[i]);
      }

      const res = await api.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res.data);

      setMyProducts((prev) => [...prev, res.data]);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        imageUrl: "",
      });
      setOpen(false);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="p-6 space-y-10">
      <section>
        <h2 className="text-2xl font-bold mb-4">Explore Products</h2>
          {otherProducts.length > 0 ? (
            <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3`}>
              {otherProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-muted-foreground text-center">
              No Avaliable Products
            </div>
          )}
      </section>

      <section>
        <div className="mt-6">
          <Dialog open={open} onOpenChange={setOpen}>
            <div className="flex justify-between mb-4">
              <h2 className="text-2xl font-bold">My Products</h2>
              <DialogTrigger asChild>
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg cursor-pointer px-5">+ Add Product</Button>
              </DialogTrigger>
            </div>
            {myProducts.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {myProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-muted-foreground text-center">
                No Avaliable Products
              </div>
            )}
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="mb-2">Name</Label>
                  <Input
                    id="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="mb-2">Description</Label>
                  <Textarea
                    id="description"
                    value={newProduct.description}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, description: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="price" className="mb-2">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="stock" className="mb-2">Stock</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="category" className="mb-2">Category</Label>
                  <Input
                    id="category"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="imageUrl" className="mb-2">Image URL</Label>
                  <Input
                    id="imageUrl"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                      console.log(e.target.files, 'e.target.files');
                      if (e.target.files) {
                        setNewProduct({ ...newProduct, imageUrl: e.target.files });
                      }
                    }}
                  />
                </div>

                <Button className="bg-indigo-600 w-full" onClick={handleAddProduct}>
                  Save Product
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </div>
  )
}
