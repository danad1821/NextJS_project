"use client";
import { useState, useEffect } from "react";
import Header from "../_components/Header";
import Footer from "../_components/Footer";
import AddProductModal from "../_components/AddProductModal";
import AddCategoryModal from "../_components/AddCategoryModal";
import axios from "axios";
import ProductCard from "../_components/ProductCard";

export default function Dashboard() {
  const [products, setProducts] = useState<Array<any>>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Array<any>>([]);
  const [categories, setCategories] = useState<Array<any>>([]);
  const [showAddProductModal, setShowAddProductModal] =
    useState<boolean>(false);
  const [showAddCategoryModal, setShowAddCategoryModal] =
    useState<boolean>(false);

  const closeModals = () => {
    setShowAddProductModal(false);
    setShowAddCategoryModal(false);
  };

  const addCategory = async (categoryName: string) => {
    try {
      const response = await axios.post("/api/categories", {
        name: categoryName,
      });
      setCategories([...categories, response.data]);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const addProduct = async (productData: any) => {
    try {
      const response = await axios.post("/api/products", productData);
      setProducts([...products, response.data]);
      setDisplayedProducts([...displayedProducts, response.data]);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const editProduct = async (productId: string, updatedData: any) => {
    try {
      const response = await axios.put(`/api/products/${productId}`, updatedData);
      const updatedProducts = products.map((product) =>
        product._id === productId ? response.data : product
      );
      setProducts(updatedProducts);
      setDisplayedProducts(updatedProducts);
    }
    catch (error) {
      console.error("Error editing product:", error);
    }
  };

  const deleteProduct = async (productId: string) => {
    try{
      await axios.delete(`/api/products/${productId}`);
      const updatedProducts = products.filter(
        (product) => product._id !== productId
      );
      setProducts(updatedProducts);
      setDisplayedProducts(updatedProducts);
    }catch(error){
      console.error("Error deleting product:", error);
    }
  };

  const getAllProducts = async () => {
    try {
      const response = await axios.get("/api/products");
      setProducts(response.data);
      setDisplayedProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const getAllCategories = async () => {
    try {
      const response = await axios.get("/api/categories");
      console.log("Fetched categories:", response.data);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getAllProducts();
    getAllCategories();
  }, []);

  return (
    <>
      <Header />
      <main className="custom-container">
        <h2>Dashboard</h2>
        <section className="flex justify-end gap-4 mb-4">
          <button
            className="bg-blue-500 rounded-xl text-white p-2"
            onClick={() => {
              setShowAddProductModal(true);
            }}
          >
            Add Product
          </button>
          <button
            className="bg-blue-500 rounded-xl text-white p-2"
            onClick={() => {
              setShowAddCategoryModal(true);
            }}
          >
            Add Category
          </button>
          <button className="bg-blue-500 rounded-xl text-white p-2">
            Edit Categories
          </button>
        </section>
        <div className="flex gap-5 flex-wrap">
          <section className="bg-gray-200 h-full p-4 rounded-xl w-1/4">
            <h3>Filtering</h3>
            <div>
              <input type="text" name="" id="" />
            </div>
            <div>
              <div>
                <input type="checkbox" name="" id="" />
                <label htmlFor="">Active</label>
              </div>
              <div>
                <input type="checkbox" name="" id="" />
                <label htmlFor="">Inactive</label>
              </div>
            </div>
            <h4>Categories</h4>
            <div className="flex flex-col ">
              {categories.length === 0 ? (
                <p>No categories available.</p>
              ) : (
                categories.map((category) => (
                  <div key={category._id}>
                    <input
                      type="checkbox"
                      name={category._id}
                      id={category._id}
                    />
                    <label htmlFor={category._id}>{category.name}</label>
                  </div>
                ))
              )}
            </div>
          </section>
          <section>
            <h3>Products</h3>
            <div className="flex flex-wrap items-center">
              {displayedProducts.length === 0 ? (
                <p>No products available.</p>
              ) : (
                displayedProducts.map((product) => (
                  <ProductCard key={product._id} product={product} deleteProduct={deleteProduct} editProduct={editProduct} categories={categories} />
                ))
              )}
            </div>
          </section>
        </div>
      </main>
      <Footer />
      {showAddProductModal && (
        <AddProductModal
          closeModal={closeModals}
          addProduct={addProduct}
          categories={categories}
        />
      )}
      {showAddCategoryModal && (
        <AddCategoryModal closeModal={closeModals} addCategory={addCategory} />
      )}
    </>
  );
}
