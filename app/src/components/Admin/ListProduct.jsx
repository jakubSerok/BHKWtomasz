import React, { useEffect, useState } from "react";
import cross_icon from "../../assets/admin/cross_icon.png";
const apiUrl = process.env.REACT_APP_PUBLIC_API_URL;

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null); // To track the product being edited
  const [editForm, setEditForm] = useState({
    title: "",
    price: "",
    stock: "",
    available: true,
    description: "",
    productCode: "",
  });

  // Fetch product data
  const fetchInfo = async () => {
    try {
      const response = await fetch(`${apiUrl}/allproducts`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setAllProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchInfo();
  }, []);

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
      title: product.title,
      price: product.price,
      stock: product.stock,
      available: product.available,
      description: product.description,
      productCode: product.productCode,
    });
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit the edited product details
  const handleSubmitEdit = async (e) => {
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

  return (
    <div className="flex flex-col items-center w-full h-[740px] py-[10px] px-[50px] m-[30px] rounded-md bg-white">
      <h1>All Products List</h1>
      <div className="grid grid-cols-7 gap-[10px] w-full py-[20px] text-[#454545] text-[15px] font-bold">
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Stock</p>
        <p>Description</p>
        <p>Edit</p>
        <p>Remove</p>
      </div>
      <div className="w-full overflow-y-auto">
        <hr />
        {allproducts.map((product) => (
          <React.Fragment key={product.id}>
            <div className="grid grid-cols-7 gap-[10px] w-full items-center">
              <img
                src={product.images[0]}
                alt={`${product.title} image`}
                className="h-[80px]"
              />
              <p>{product.title}</p>
              <p>${product.price}</p>
              <p>{product.stock}</p>
              <p>{product.description}</p>
              <img
                src={cross_icon} // Pencil icon for editing
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
    </div>
  );
};

export default ListProduct;
