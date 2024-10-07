import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);
const apiUrl = process.env.REACT_APP_PUBLIC_API_URL;

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product, setAllProducts] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [all_blogs, setAllBlogs] = useState([]);
  const [currentBlog, setCurrentBlog] = useState(null);

  useEffect(() => {
    // Fetch all products
    fetch(`${apiUrl}/allproducts`)
      .then((res) => res.json())
      .then((data) => setAllProducts(data));

    // Fetch all blogs
    fetch(`${apiUrl}/allblogs`)
      .then((res) => res.json())
      .then((data) => setAllBlogs(data));

    // Load cart items if user is authenticated
    if (localStorage.getItem("auth-token")) {
      fetch(`${apiUrl}/getcart`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: "",
      })
        .then((res) => res.json())
        .then((data) => setCartItems(data));
    }
  }, []);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch(`${apiUrl}/addtocart`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch(`${apiUrl}/removefromcart`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    return Object.values(cartItems).reduce((total, count) => total + count, 0);
  };

  const fetchBlogById = (blogId) => {
    const blog = all_blogs.find((b) => b.id === blogId);
    setCurrentBlog(blog);
  };
  const clearCart = async () => {
    try {
      const token = localStorage.getItem("auth-token");
      const response = await fetch(`${apiUrl}/clearcart`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "auth-token": token, // Include the authentication token in the headers
        },
      });

      const data = await response.json();
      if (response.ok && data.success) {
        console.log("Cart cleared successfully");
      } else {
        console.error("Failed to clear cart:", data.message);
      }
    } catch (error) {
      console.error("Error clearing cart:", error.message);
    }
  };

  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
    clearCart,
    all_blogs,
    currentBlog,
    fetchBlogById,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
