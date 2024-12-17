import React, { useEffect, useState } from "react";
import cross_icon from "../../assets/admin/cross_icon.png";
import upload_area from "../../assets/upload_area.svg";
const apiUrl = process.env.REACT_APP_PUBLIC_API_URL;

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);
  const [image, setImage] = useState(false);
  const [displayedProducts, setDisplayedProducts] = useState([]); // for paginated products
  const [editingProduct, setEditingProduct] = useState(null); // To track the product being edited
  const [editForm, setEditForm] = useState({
    title: "",
    price: "",
    stock: "",
    available: true,
    description: "",
    productCode: "",
    category: "",
    images: [],
  });
  const [currentPage, setCurrentPage] = useState(1); // state for current page
  const [productsPerPage, setProductsPerPage] = useState(10); // state for products per page
  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  // Fetch product data
  const fetchInfo = async () => {
    try {
      const response = await fetch(`${apiUrl}/allproducts`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setAllProducts(data);
      setDisplayedProducts(
        getPaginatedProducts(data, currentPage, productsPerPage)
      );
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchInfo();
  }, [currentPage]);

  // Remove a product
  const removeProduct = async (id) => {
    try {
      await fetch(`${apiUrl}/removeproduct`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      fetchInfo(); // Refresh product list after removal
    } catch (error) {
      console.error("Failed to remove product:", error);
    }
  };

  // Open the edit form and set the current product's details
  const openEditForm = (product) => {
    setEditingProduct(product.id);
    setEditForm({
      images: product.images[0],
      title: product.title,
      price: product.price,
      stock: product.stock,
      available: product.available,
      description: product.description,
      productCode: product.productCode,
      category: product.category,
    });
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit the edited product details
  const handleSubmitEdit = async (e) => {
    let formData = new FormData();
    formData.append("productImage", image);

    // Upload the image and get the URL
    const uploadResponse = await fetch(`${apiUrl}/upload/product`, {
      method: "POST",
      body: formData,
    });

    const uploadData = await uploadResponse.json();
    const imageUrl = uploadData.image_url;
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/editproduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: editingProduct, ...editForm }),
      });
      const result = await response.json();
      if (result.success) {
        fetchInfo(); // Refresh products after edit
        setEditingProduct(null); // Close the edit form
      }
    } catch (error) {
      console.error("Failed to edit product:", error);
    }
  };

  const getPaginatedProducts = (products, currentPage, productsPerPage) => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return products.slice(startIndex, endIndex);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-col items-center w-full h-[740px] py-[10px] px-[50px] m-[30px] rounded-md bg-white">
      <h1>All Products List</h1>
      <div className="grid grid-cols-8 gap-[10px] w-full py-[20px] text-[#454545] text-[15px] font-bold">
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Stock</p>
        <p>Description</p>
        <p>Category</p>
        <p>Edit</p>
        <p>Remove</p>
      </div>
      <div className="w-full overflow-y-auto">
        <hr />
        {displayedProducts.map((product) => (
          <React.Fragment key={product.id}>
            <div className="grid grid-cols-8 gap-[10px] w-full items-center">
              <img
                src={product.images[0]}
                alt={`${product.title} image`}
                className="h-[80px]"
              />
              <p>{product.title}</p>
              <p>€{product.price}</p>
              <p>{product.stock}</p>
              <p>{product.description}</p>
              <p>{product.category}</p>
              <img
                src={cross_icon} // P encil icon for editing
                onClick={() => openEditForm(product)}
                alt="Edit product"
                className="m-auto cursor-pointer"
              />
              <img
                src={cross_icon}
                onClick={() => removeProduct(product.id)}
                alt="Remove product"
                className="m-auto cursor-pointer"
              />
            </div>
            <hr />

            {/* Conditional rendering of the edit form */}
            {editingProduct === product.id && (
              <form
                onSubmit={handleSubmitEdit}
                className="w-full bg-gray-100 p-4 rounded-md mt-2"
              >
                <div className="flex gap-4">
                  <div className="flex flex-col">
                    <label>Product Title</label>
                    <input
                      type="text"
                      name="title"
                      value={editForm.title}
                      onChange={handleChange}
                      className="p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="h-[120px] w-[120px] rounded-xl object-contain my-[10px]">
                    <label htmlFor="file-input">
                      <img
                        src={image ? URL.createObjectURL(image) : upload_area}
                        alt=""
                      />
                    </label>
                    <input
                      onChange={imageHandler}
                      type="file"
                      name="image"
                      id="file-input"
                      hidden
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Price</label>
                    <input
                      type="number"
                      name="price"
                      value={editForm.price}
                      onChange={handleChange}
                      className="p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Stock</label>
                    <input
                      type="number"
                      name="stock"
                      value={editForm.stock}
                      onChange={handleChange}
                      className="p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Description</label>
                    <textarea
                      name="description"
                      value={editForm.description}
                      onChange={handleChange}
                      className="p-2 border border-gray-300 rounded-md"
                    />
                  </div>{" "}
                  <div className="flex flex-col">
                    <label>Category</label>
                    <textarea
                      name="category"
                      value={editForm.category}
                      onChange={handleChange}
                      className="p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Product Code</label>
                    <input
                      type="text"
                      name="productCode"
                      value={editForm.productCode}
                      onChange={handleChange}
                      className="p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Available</label>
                    <select
                      name="available"
                      value={editForm.available}
                      onChange={handleChange}
                      className="p-2 border border-gray-300 rounded-md"
                    >
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Save Changes
                </button>
              </form>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="flex justify-center mt-10">
        {[...Array(Math.ceil(allproducts.length / productsPerPage))].map(
          (_, index) => (
            <button
              key={index}
              className={`px-4 py-2 mx-2 rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default ListProduct;
