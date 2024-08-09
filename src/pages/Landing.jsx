import React from "react";
import "../styles/landing.css";
import "../scss/customs.scss";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Elevate Your Beauty Routine</h1>
          <p className="hero-subtitle">
            Discover luxurious skincare and beauty essentials designed just for
            you.
          </p>
          <Link to="/shop" className="btn btn-pink font-primary">
            Shop Now
          </Link>
        </div>
        <img
          src="/assets/images/hero-bg.jpg"
          alt="Hero Background"
          className="hero-bg"
        />
      </section>

      {/* Featured Products Section */}
      <section className="featured-products">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          <div className="product-grid">
            <div className="product-card">
              <img
                src="/assets/images/productimage.jpg"
                alt="Product 1"
                className="product-image"
              />
              <h3 className="product-title">Hydrating Serum</h3>
              <p className="product-price">$29.99</p>
              <Link to="/product/1" className="btn-outline font-primary">
                View Details
              </Link>
            </div>
            <div className="product-card">
              <img
                src="/assets/images/productimage.jpg"
                alt="Product 2"
                className="product-image"
              />
              <h3 className="product-title font-secondary">Brightening Mask</h3>
              <p className="product-price font-secondary">$19.99</p>
              <Link to="/product/2" className="btn-outline font-primary">
                View Details
              </Link>
            </div>
            {/* Add more product cards as needed */}
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
        <img
          src="/assets/images/productimage.jpg"
          alt="Promotion"
          className="promo-bg"
        />
      </section>

      {/* Testimonials Section */}
      <section className="testimonials py-16">
        <div className="container mx-auto text-center">
          <h2 className="section-title">What Our Customers Say</h2>
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
            {/* Add more testimonial cards as needed */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
