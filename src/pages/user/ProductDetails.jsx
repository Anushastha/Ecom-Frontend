import React, { useEffect, useState } from "react";
import {
  getSingleProductApi,
  getSingleCategoryApi,
  addSaveApi,
  getSavedApi,
  removeSavedApi,
} from "../../apis/Apis";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { MdAddShoppingCart } from "react-icons/md";
import { FaRegHeart, FaHeart } from "react-icons/fa6";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [savedItemId, setSavedItemId] = useState(null); // To track the saved item's ID

  useEffect(() => {
    // Fetch the product details
    getSingleProductApi(id)
      .then((res) => {
        const fetchedProduct = res.data.product;
        setProduct(fetchedProduct);
        fetchProductCategory(fetchedProduct.productCategory);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
      });

    // Check if the product is saved in the user's wishlist
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user._id) {
      getSavedApi(user._id)
        .then((res) => {
          const savedProducts = res.data.save;
          const savedItem = savedProducts.find(
            (item) => item.product._id === id
          );
          if (savedItem) {
            setIsFavorite(true);
            setSavedItemId(savedItem._id); // Store the saved item's ID
          }
        })
        .catch((error) => {
          console.error("Error fetching saved products:", error);
        });
    }
  }, [id]);

  const fetchProductCategory = async (categoryId) => {
    try {
      const res = await getSingleCategoryApi(categoryId);
      setCategory(res.data.category); // Assuming the API returns category details under `category`
    } catch (error) {
      console.error("Error fetching category:", error);
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
        // Remove from saved list
        const res = await removeSavedApi(savedItemId); // Use the saved item's ID
        if (!res.data.success) {
          toast.error(res.data.message);
        } else {
          toast.success("Product removed from wishlist");
          setIsFavorite(false); // Update state
          setSavedItemId(null); // Reset the saved item's ID
        }
      } else {
        // Add to saved list
        const data = {
          userId: user._id,
          productId: id,
          productImage: product.productImageUrl,
          productName: product.productName,
          productCategory: category?.categoryName,
          productPrice: product.productPrice,
        };
        const res = await addSaveApi(data);
        if (!res.data.success) {
          toast.error(res.data.message);
        } else {
          toast.success("Product added to wishlist");
          setIsFavorite(true); // Update state
          setSavedItemId(res.data.save._id); // Store the new saved item's ID
        }
      }
    } catch (error) {
      console.error("Error saving or removing product:", error);
      toast.error("Failed to save or remove product");
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
                  )}{" "}
                </span>
                {isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
              </button>
              <button className="tw-mr-1 btn btn-black font-secondary tw-flex tw-items-center tw-cursor-pointer">
                <span className="tw-mr-2">
                  <MdAddShoppingCart size={20} />
                </span>
                Add to Cart
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
