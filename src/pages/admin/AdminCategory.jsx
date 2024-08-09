import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  createCategoryApi,
  deleteCategoryApi,
  getAllCategoriesApi,
  updateCategoryApi,
} from "../../apis/Apis";
import { Link } from "react-router-dom";

const AdminCategory = () => {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState("");

  useEffect(() => {
    getAllCategoriesApi().then((res) => {
      setCategories(res.data.categories || []);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newCategoryName.trim() === "") return;

    createCategoryApi({ categoryName: newCategoryName })
      .then((res) => {
        if (!res.data.success) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          setCategories([...categories, res.data.category]);
          setNewCategoryName("");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Internal Server Error!");
      });
  };

  const handleEdit = (category) => {
    setEditCategoryId(category._id);
    setEditCategoryName(category.categoryName);
  };

  const handleSaveEdit = (id) => {
    updateCategoryApi(id, { categoryName: editCategoryName })
      .then((res) => {
        if (!res.data.success) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          setCategories(
            categories.map((cat) =>
              cat._id === id ? { ...cat, categoryName: editCategoryName } : cat
            )
          );
          setEditCategoryId(null);
          setEditCategoryName("");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Internal Server Error!");
      });
  };

  const handleCancelEdit = () => {
    setEditCategoryId(null);
    setEditCategoryName("");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      deleteCategoryApi(id)
        .then((res) => {
          if (!res.data.success) {
            toast.error(res.data.message);
          } else {
            toast.success(res.data.message);
            setCategories(categories.filter((cat) => cat._id !== id));
          }
        })
        .catch((error) => {
          console.error("Error deleting category:", error);
          toast.error("Internal Server Error!");
        });
    }
  };

  return (
    <div className="tw-container tw-mx-auto tw-py-10">
      <p className="font-primary font-bold mb-3" style={{ fontSize: "30px" }}>
        All Categories
      </p>

      <div className="bg-white p-4 shadow">
        <form onSubmit={handleSubmit} className="tw-mb-8">
          <div className="tw-mb-4">
            <label htmlFor="newCategoryName" className="font-primary mb-3">
              New Category Name
            </label>
            <input
              type="text"
              id="newCategoryName"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="font-secondary tw-input tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-black focus:tw-border-transparent"
              required
            />
          </div>
          <button type="submit" className="btn btn-black font-primary">
            Add Category
          </button>
        </form>

        <div className="tw-overflow-x-auto">
          <table className="table table-bordered table-hover">
            <thead className="table-dark text-center font-primary">
              <tr>
                <th scope="col">Category Name</th>
                <th className="tw-px-4 tw-py-2 tw-border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id}>
                  <td className="tw-px-4 tw-py-2 tw-border">
                    {editCategoryId === category._id ? (
                      <input
                        type="text"
                        value={editCategoryName}
                        onChange={(e) => setEditCategoryName(e.target.value)}
                        className="font-secondary tw-input tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-black focus:tw-border-transparent"
                      />
                    ) : (
                      <input
                        type="text"
                        value={category.categoryName}
                        onChange={(e) => setEditCategoryName(e.target.value)}
                        className="font-secondary tw-input tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-black focus:tw-border-transparent"
                        readOnly
                      />
                    )}
                  </td>
                  <td className="tw-px-4 tw-py-2 tw-border text-center">
                    {editCategoryId === category._id ? (
                      <div
                        className="btn-group"
                        role="group"
                        aria-label="Basic example"
                      >
                        <button
                          className="tw-mr-1 btn btn-success tw-text-white tw-px-4 tw-py-1 font-primary"
                          onClick={() => handleSaveEdit(category._id)}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-black tw-text-white tw-px-4 tw-py-1 font-primary"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div
                        className="btn-group"
                        role="group"
                        aria-label="Basic example"
                      >
                        <button
                          className="tw-mr-1 btn btn-black font-primary"
                          onClick={() => handleEdit(category)}
                        >
                          Edit
                        </button>
                        <button
                          className="tw-mr-1 btn btn-danger font-primary"
                          onClick={() => handleDelete(category._id)}
                        >
                          Delete
                        </button>
                        <Link
                          to={`/admin/category/products/${category._id}`}
                          type="button"
                          className="btn btn-black font-primary"
                        >
                          View Products
                        </Link>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCategory;
