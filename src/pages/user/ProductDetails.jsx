import React, { useEffect, useState } from "react";
import {
  getSingleProductApi,
  getSingleCategoryApi,
  addSaveApi,
  getSavedApi,
  removeSavedApi,
  createCartApi,
  getCartApi,
  deleteCartApi,
} from "../../apis/Apis";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  MdAddShoppingCart,
  MdOutlineRemoveShoppingCart,
} from "react-icons/md";
import { FaRegHeart, FaHeart } from "react-icons/fa6";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [savedItemId, setSavedItemId] = useState(null);
  const [cartItemId, setCartItemId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRes = await getSingleProductApi(id);
        const fetchedProduct = productRes.data.product;
        setProduct(fetchedProduct);
        fetchProductCategory(fetchedProduct.productCategory);

        // // Initial fetch of saved and cart items
        // await fetchSavedAndCartItems();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const fetchProductCategory = async (categoryId) => {
    try {
      const res = await getSingleCategoryApi(categoryId);
      setCategory(res.data.category);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  const fetchSavedAndCartItems = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user._id) {
        // Fetch saved items
        const savedRes = await getSavedApi(user._id);
        const savedProducts = savedRes.data.save;
        const savedItem = savedProducts.find((item) => item.product._id === id);
        if (savedItem) {
          setIsFavorite(true);
          setSavedItemId(savedItem._id);
        } else {
          setIsFavorite(false);
          setSavedItemId(null);
        }

        // Fetch cart items
        const cartRes = await getCartApi(user._id);
        const cartItems = cartRes.data.cart;
        const cartItem = cartItems.find((item) => item.product._id === id);
        if (cartItem) {
          setInCart(true);
          setCartItemId(cartItem._id);
        } else {
          setInCart(false);
          setCartItemId(null);
        }
      }
    } catch (error) {
      console.error("Error fetching saved and cart items:", error);
    }
  };

  const handleSaveToggle = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user._id) {
      toast.error("Please log in to add products to wishlist.");
      return;
    }

    try {
      if (isFavorite) {
        // Remove from wishlist
        const res = await removeSavedApi(savedItemId);
        if (res.data.success) {
          setIsFavorite(false);
          setSavedItemId(null);
          toast.success("Product removed from wishlist");
        } else {
          toast.error(res.data.message);
        }
      } else {
        // Add to wishlist
        const data = {
          userId: user._id,
          productId: id,
          productImage: product.productImageUrl,
          productName: product.productName,
          productCategory: category?.categoryName,
          productPrice: product.productPrice,
        };
        const res = await addSaveApi(data);
        if (res.data.success) {
          setIsFavorite(true);
          setSavedItemId(res.data.save._id);
          toast.success("Product added to wishlist");
        } else {
          toast.error(res.data.message);
        }
      }

      // Re-fetch saved items to ensure state consistency
      await fetchSavedAndCartItems();
    } catch (error) {
      console.error("Error saving or removing product:", error);
      toast.error("Failed to save or remove product");
    }
  };

  const handleCartToggle = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user._id) {
      toast.error("Please log in to add or remove items from the cart.");
      return;
    }

    try {
      if (inCart) {
        // Remove from cart
        const res = await deleteCartApi(cartItemId);
        if (res.data.success) {
          setInCart(false);
          setCartItemId(null);
          toast.success("Product removed from cart");
        } else {
          toast.error(res.data.message);
        }
      } else {
        // Add to cart
        const data = {
          userId: user._id,
          productId: id,
          quantity: 1,
          status: "pending",
        };
        const res = await createCartApi(data);
        if (res.data.success) {
          setInCart(true);
          setCartItemId(res.data.cart._id);
          toast.success("Product added to cart");
        } else {
          toast.error(res.data.message);
        }
      }

      // Re-fetch cart items to ensure state consistency
      await fetchSavedAndCartItems();
    } catch (error) {
      console.error("Error adding or removing from cart:", error);
      toast.error("Failed to add or remove product from cart");
    }
  };

  return (
    <div className="container p-5">
      {product && (
        <div className="row bg-white p-5 tw-rounded-2xl">
          <div className="col-md-5">
            <img
              src={product.productImageUrl}
              alt={product.productName}
              className="img-fluid"
              style={{ maxWidth: "100%", height: "90%" }}
            />
          </div>
          <div className="col-md-7">
            <p className="font-primary tw-text-xl mb-2">
              {product.productName}
            </p>

            <p className="font-secondary">
              <b>Category:</b> {category ? category.categoryName : "Loading..."}
            </p>
            <p className="font-secondary tw-text-pink tw-font-bold mb-4">
              Rs. {product.productPrice}
            </p>
            <div className="btn-group" role="group" aria-label="Basic example">
              <button
                className="tw-mr-1 btn btn-pink font-secondary tw-flex tw-items-center tw-cursor-pointer"
                onClick={handleSaveToggle}
              >
                <span className="tw-mr-2">
                  {isFavorite ? (
                    <FaHeart size={20} />
                  ) : (
                    <FaRegHeart size={20} />
                  )}
                </span>
                {isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
              </button>
              <button
                onClick={handleCartToggle}
                className="tw-mr-1 btn btn-black font-secondary tw-flex tw-items-center tw-cursor-pointer"
              >
                <span className="tw-mr-2">
                  {inCart ? (
                    <MdOutlineRemoveShoppingCart size={20} />
                  ) : (
                    <MdAddShoppingCart size={20} />
                  )}
                </span>
                {inCart ? "Remove from Cart" : "Add to Cart"}
              </button>
            </div>
          </div>
          <p className="font-secondary">{product.productDescription}</p>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
