import React, { useContext, useState } from "react";
import { ProductContext } from "../contexts/ProductContext";
import Product from "../components/Product";
import Hero from "../components/Hero";

const Home = () => {
  // get products from product context
  const { products } = useContext(ProductContext);
  // state for search query
  const [searchQuery, setSearchQuery] = useState("");

  // filter products based on search query
  const filteredProducts = products.filter((item) => {
    // check if the product title or category includes the search query
    return (
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div>
      <Hero />
      <section className="py-20">
        <div className="container mx-auto">
          <h1 className="text-3xl font-semibold mb-10 text-center">
            Explore Our Products
          </h1>
          {/* Search bar */}
          <div className="mb-10 text-center">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg w-1/2 md:w-1/4 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:mx-8 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => {
                return <Product product={product} key={product.id} />;
              })
            ) : (
              <p className="text-center text-gray-500">No products found</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
