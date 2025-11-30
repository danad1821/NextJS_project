"use client";
import { useState, useEffect } from "react";
import Header from "../_components/Header";
import Footer from "../_components/Footer";
import AddProductModal from "../_components/AddProductModal";
import AddCategoryModal from "../_components/AddCategoryModal";
import axios from "axios";
import ProductCard from "../_components/ProductCard";
import CategoryCard from "../_components/CategoryCard";
import Loader from "../_components/Loader";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Array<any>>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Array<any>>([]);
  const [toggleProducts, setToggleProducts] = useState<boolean>(true);
  const [categories, setCategories] = useState<Array<any>>([]);
  const [showAddProductModal, setShowAddProductModal] =
    useState<boolean>(false);
  const [showAddCategoryModal, setShowAddCategoryModal] =
    useState<boolean>(false);
  const [filterSettings, setFilterSettings] = useState<any>({
    searchQuery: "",
    categories: [true, false],
  });

  const closeModals = () => {
    setShowAddProductModal(false);
    setShowAddCategoryModal(false);
  };

  const filterProducts = () => {
    let filtered = [...products];

    // Filter by search query
    if (filterSettings.searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.title
            .toLowerCase()
            .includes(filterSettings.searchQuery.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(filterSettings.searchQuery.toLowerCase())
      );
    }

    // Filter by categories and categories combined
    if (filterSettings.categories.length > 0) {
      filtered = filtered.filter((product) => {
        const hasActiveFilter = filterSettings.categories.includes(true);
        const hasInactiveFilter = filterSettings.categories.includes(false);
        const hasCategoryFilter = filterSettings.categories.some(
          (cat: any) => typeof cat === "string"
        );

        // categories check
        const categoriesMatches =
          (hasActiveFilter && product.isActive) ||
          (hasInactiveFilter && !product.isActive);

        // Category check
        const categoryMatches = hasCategoryFilter
          ? filterSettings.categories.includes(product.category)
          : true;

        return categoriesMatches && categoryMatches;
      });
    }
    setDisplayedProducts(filtered);
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

  const editCategory = async (categoryId: string, updatedData: any) => {
    try {
      console.log("Editing category:", categoryId, updatedData);
      const response = await axios.put(
        `/api/categories/${categoryId}`,
        updatedData
      );
      const updatedCategories = categories.map((category) =>
        category._id === categoryId ? response.data : category
      );
      console.log("Updated Categories:", updatedCategories);
      setCategories(updatedCategories);
    } catch (error) {
      console.error("Error editing category:", error);
    }
  };

  const deleteCategory = async (categoryId: string) => {
    try {
      await axios.delete(`/api/categories/${categoryId}`);
      const updatedCategories = categories.filter(
        (category) => category._id !== categoryId
      );
      setCategories(updatedCategories);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const addProduct = async (productData: any) => {
    try {
      const response = await axios.post("/api/products", productData);
      setProducts([...products, response.data]);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const editProduct = async (productId: string, updatedData: any) => {
    try {
      const response = await axios.put(
        `/api/products/${productId}`,
        updatedData
      );
      const updatedProducts = products.map((product) =>
        product._id === productId ? response.data : product
      );
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      await axios.delete(`/api/products/${productId}`);
      const updatedProducts = products.filter(
        (product) => product._id !== productId
      );
      setProducts(updatedProducts);
    } catch (error) {
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
    return () => setIsLoading(false);
  }, []);

  useEffect(() => {
    filterProducts();
  }, [filterSettings, products]);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen w-full bg-[#F5F5F7]">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="custom-container">
        <section className="flex justify-end gap-4 my-4">
          <button
            className="bg-blue-500 rounded-xl text-white p-2 hover:brightness-90"
            onClick={() => {
              setShowAddProductModal(true);
            }}
          >
            Add Product
          </button>
          <button
            className="bg-blue-500 rounded-xl text-white p-2 hover:brightness-90"
            onClick={() => {
              setShowAddCategoryModal(true);
            }}
          >
            Add Category
          </button>
          <button
            className="bg-blue-500 rounded-xl text-white p-2 hover:brightness-90"
            onClick={() => setToggleProducts(!toggleProducts)}
          >
            {toggleProducts ? "Show Categories" : "Show Products"}
          </button>
        </section>
        {toggleProducts ? (
          <div className="flex gap-5 ">
            <section className="bg-gray-200 h-full p-4 rounded-xl w-[300px]">
              <h3 className="text-lg font-bold mb-2">Filtering</h3>
              <div>
                <input
                  className="text-black p-2 rounded-xl text-md"
                  placeholder="Search for product..."
                  type="text"
                  name=""
                  id=""
                  value={filterSettings.searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFilterSettings({
                      ...filterSettings,
                      searchQuery: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="flex gap-2 my-1">
                <div>
                  <input
                    type="checkbox"
                    name="activeFilter"
                    id="activeFilter"
                    checked={filterSettings.categories.includes(true)}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFilterSettings((prev: any) => {
                        if (e.target.checked) {
                          return {
                            ...prev,
                            categories: prev.categories.includes(true)
                              ? prev.categories
                              : [...prev.categories, true],
                          };
                        } else {
                          return {
                            ...prev,
                            categories: prev.categories.filter(
                              (s: boolean) => s !== true
                            ),
                          };
                        }
                      });
                    }}
                  />
                  <label htmlFor="activeFilter">Active</label>
                </div>
                <div className="">
                  <input
                    type="checkbox"
                    name="inactiveFilter"
                    id="inactiveFilter"
                    checked={filterSettings.categories.includes(false)}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFilterSettings((prev: any) => {
                        if (e.target.checked) {
                          // add false if missing
                          return {
                            ...prev,
                            categories: prev.categories.includes(false)
                              ? prev.categories
                              : [...prev.categories, false],
                          };
                        } else {
                          // remove false
                          return {
                            ...prev,
                            categories: prev.categories.filter(
                              (s: boolean) => s !== false
                            ),
                          };
                        }
                      });
                    }}
                  />
                  <label htmlFor="inactiveFilter">Inactive</label>
                </div>
              </div>
              <h4 className="text-md font-bold mt-2 mb-1">Categories</h4>
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
                        checked={filterSettings.categories.includes(
                          category._id
                        )}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setFilterSettings((prev: any) => {
                            if (e.target.checked) {
                              // add category._id if missing
                              return {
                                ...prev,
                                categories: prev.categories.includes(
                                  category._id
                                )
                                  ? prev.categories
                                  : [...prev.categories, category._id],
                              };
                            } else {
                              // remove category._id
                              return {
                                ...prev,
                                categories: prev.categories.filter(
                                  (s: boolean) => s !== category._id
                                ),
                              };
                            }
                          });
                        }}
                      />
                      <label htmlFor={category._id}>{category.name}</label>
                    </div>
                  ))
                )}
              </div>
            </section>
            <section>
              <h3 className="text-lg font-bold mb-2">Products</h3>
              <div className="flex flex-wrap items-center">
                {displayedProducts.length === 0 ? (
                  <p>No products available.</p>
                ) : (
                  displayedProducts.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      deleteProduct={deleteProduct}
                      editProduct={editProduct}
                      categories={categories}
                    />
                  ))
                )}
              </div>
            </section>
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-bold mb-2">Categories</h3>
            <div className="flex ">
              {categories.length === 0 ? (
                <p>No categories available.</p>
              ) : (
                categories.map((category) => (
                  <CategoryCard
                    key={category._id}
                    category={category}
                    editCategory={editCategory}
                    deleteCategory={deleteCategory}
                  />
                ))
              )}
            </div>
          </div>
        )}
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
