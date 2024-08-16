import React, { useEffect, useState } from "react";
import "../styles/landing.css";
import "../scss/customs.scss";
import { Link } from "react-router-dom";
import { getAllProductsApi } from "../apis/Apis";

const LandingPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProductsApi();
        if (response.data.success) {
          const allProducts = response.data.products;

          // Function to shuffle the array
          const shuffleArray = (array) => {
            let shuffledArray = array.slice();
            for (let i = shuffledArray.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [shuffledArray[i], shuffledArray[j]] = [
                shuffledArray[j],
                shuffledArray[i],
              ];
            }
            return shuffledArray;
          };

          // Shuffle the products and take the first 3
          const shuffledProducts = shuffleArray(allProducts);
          setProducts(shuffledProducts.slice(0, 3));
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="landing-page">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Elevate Your Beauty Routine</h1>
          <p className="hero-subtitle">
            Discover luxurious skincare and beauty essentials designed just for
            you.
          </p>
          <Link to="/user/dashboard" className="btn btn-pink font-primary">
            Shop Now
          </Link>
        </div>
        <div
          className="hero-bg"
          style={{
            backgroundImage: `url("/assets/images/hero-bg.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "auto",
          }}
          aria-label="Hero Background"
        ></div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>

          <div className="product-grid">
            {products.map((product) => (
              <div key={product._id} className="product-card">
                <div
                  className="product-image"
                  style={{
                    backgroundImage: `url(${product.productImageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "100%",
                    height: "200px",
                  }}
                  aria-label={product.productName}
                ></div>
                <h3 className="product-title font-primary">
                  {product.productName}
                </h3>
                <p className="product-price font-secondary tw-font-bold">
                  RS. {product.productPrice}
                </p>
                <Link
                  to={`/user/dashboard/productDetails/${product.id}`}
                  className="btn-outline font-primary"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Section */}
      <section className="promo">
        <div className="container">
          <h2 className="section-title tw-text-white">Exclusive Offer!</h2>
          <p className="promo-description tw-text-white">
            Enjoy 20% off your first purchase with code <b>FIRST20</b> at
            checkout.
          </p>
        </div>
        <div
          className="promo-bg"
          style={{
            backgroundImage: `url("/assets/images/productimage.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "100%",
          }}
          aria-label="Promotion"
        ></div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials py-16">
        <div className="container mx-auto text-center">
          <h2 className="section-title tw-text-white">
            What Our Customers Say
          </h2>
          <div className="testimonial-carousel flex overflow-x-auto space-x-6 pb-10">
            <div className="testimonial-card bg-white p-8 rounded-lg flex-shrink-0 w-80">
              <p className="testimonial-text mb-4 font-secondary text-gray-700">
                "Fantastic products! My skin feels rejuvenated and radiant."
              </p>
              <h4 className="testimonial-name text-xl font-primary mb-1">
                Anna Smith
              </h4>
              <span className="testimonial-role text-gray-500">
                Verified Customer
              </span>
            </div>
            <div className="testimonial-card bg-white p-8 rounded-lg flex-shrink-0 w-80">
              <p className="testimonial-text mb-4 font-secondary text-gray-700">
                "Great variety and top-notch quality. Will definitely be coming
                back."
              </p>
              <h4 className="testimonial-name text-xl font-primary mb-1">
                Mark Johnson
              </h4>
              <span className="testimonial-role text-gray-500">
                Regular Shopper
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
