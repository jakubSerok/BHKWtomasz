const port = 3001;
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

//Database Connection with MonoDB
mongoose.connect(
  "mongodb+srv://admin:Nimda209$@cluster0.ku8q9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Image Storage Engine

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

//Creating Upload Endpoin for images
app.use("/images", express.static("upload/images"));

app.post("/upload/product", upload.single("productImage"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: 0, message: "No file uploaded" });
  }

  res.json({
    success: 1,
    image_url: `http://localhost:3001/images/${req.file.filename}`,
  });
});

// New Blog Image Upload Endpoint
app.post("/upload/blog", upload.single("blogImage"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: 0, message: "No file uploaded" });
  }

  res.json({
    success: 1,
    image_url: `http://localhost:3001/images/${req.file.filename}`,
  });
});

//Schema for Creating Products
// Schema for Creating Products
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    default: [],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  description: {
    type: String,
    required: true,
  },
  productCode: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Creating Endpoint for adding product
app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;

  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  const product = new Product({
    id: id,
    title: req.body.title,
    images: req.body.images,
    price: req.body.price,
    stock: req.body.stock,
    available: req.body.available,
    description: req.body.description,
    productCode: req.body.productCode,
  });
  await product.save();
  res.json({
    success: true,
    title: req.body.title,
  });
});

// Creating API for deleting product
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  res.json({
    success: true,
    title: req.body.title,
  });
});

// Creating API for editing a product with partial updates
app.post("/editproduct", async (req, res) => {
  try {
    const {
      id,
      title,
      images,
      price,
      stock,
      available,
      description,
      productCode,
    } = req.body;

    // Create an update object only with fields that are present in the request body
    let updateFields = {};
    if (title) updateFields.title = title;
    if (images) updateFields.images = images;
    if (price) updateFields.price = price;
    if (stock) updateFields.stock = stock;
    if (available !== undefined) updateFields.available = available; // Check for undefined because 'false' is a valid value
    if (description) updateFields.description = description;
    if (productCode) updateFields.productCode = productCode;

    // Check if there's something to update
    if (Object.keys(updateFields).length === 0) {
      return res
        .status(400)
        .json({ success: false, errors: "No fields to update" });
    }

    // Find the product by its ID and update its details
    let updatedProduct = await Product.findOneAndUpdate(
      { id: id },
      { $set: updateFields },
      { new: true } // Return the updated product
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, errors: "Product not found" });
    }

    res.json({
      success: true,
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, errors: "Server error" });
  }
});

// Creating API for getting all products
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  res.send(products);
});

//Shema creating for user model

const Users = mongoose.model("Users", {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cartData: {
    type: Object,
  },
  data: {
    type: Date,
    default: Date.now,
  },
  accountType: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

//Creating Endpoint for regisaring user
app.post("/signup", async (req, res) => {
  try {
    // Check if a user already exists with the same email
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
      return res.status(400).json({
        success: false,
        errors: "User already exists with this email address",
      });
    }

    // Initialize an empty cart
    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create the new user with hashed password
    const user = new Users({
      name: req.body.username,
      email: req.body.email,
      password: hashedPassword, // Store hashed password
      cartData: cart,
    });

    // Save the user to the database
    await user.save();

    // Create JWT payload
    const data = {
      user: {
        id: user._id, // Use _id as the unique identifier
      },
    };

    // Generate a JWT token
    const token = jwt.sign(data, "tomasz_bhkw", { expiresIn: "1h" }); // Set token expiration to 1 hour

    // Respond with success and the token
    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, errors: "Server error" });
  }
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, errors: "Invalid email" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, errors: "Invalid password" });
    }

    const data = {
      user: {
        id: user.id,
        accountType: user.accountType, // Include account type in token data
      },
    };

    // Generate JWT token
    const token = jwt.sign(data, "tomasz_bhkw");
    res.json({ success: true, token, accountType: user.accountType }); // Send account type in response
  } catch (error) {
    res.status(500).json({ success: false, errors: "Server error" });
  }
});

// Admin Authentication Middleware
const isAdmin = (req, res, next) => {
  if (req.user.accountType !== "admin") {
    return res.status(403).json({ errors: "Access denied, admin only" });
  }
  next();
};

// Token Middleware to Fetch User
const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .json({ errors: "Please authenticate using a valid token" });
  }

  try {
    const data = jwt.verify(token, "tomasz_bhkw");
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).json({ errors: "Please authenticate using a valid token" });
  }
};

//creating endpoint for add to cart
app.post("/addtocart", fetchUser, async (req, res) => {
  console.log(req.body, req.user);
  let userData = await Users.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;

  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
});

app.post("/removefromcart", fetchUser, async (req, res) => {
  console.log(req.body, req.user);
  let userData = await Users.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] > 0) {
    userData.cartData[req.body.itemId] -= 1;
  }

  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
});

app.post("/getcart", fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});

// Blog Schema
const Blog = mongoose.model("Blog", {
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    default: [],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
// Endpoint for adding a blog post
app.post("/addblog", async (req, res) => {
  let blogs = await Blog.find({});
  let id;

  if (blogs.length > 0) {
    let last_blog_array = blogs.slice(-1);
    let last_blog = last_blog_array[0];
    id = last_blog.id + 1;
  } else {
    id = 1;
  }

  const blog = new Blog({
    id: id,
    title: req.body.title,
    images: req.body.images, // This should be an array of image URLs
    description: req.body.description,
  });

  await blog.save();
  res.json({
    success: true,
    blog: blog,
  });
});

// Endpoint for editing a blog post
app.post("/editblog", async (req, res) => {
  const { id, title, images, description } = req.body;

  const updatedBlog = await Blog.findOneAndUpdate(
    { id: id },
    {
      $set: {
        title: title,
        images: images,
        description: description,
      },
    },
    { new: true } // Return the updated blog post
  );

  if (!updatedBlog) {
    return res.status(404).json({ success: false, message: "Blog not found" });
  }

  res.json({ success: true, blog: updatedBlog });
});

// Endpoint for deleting a blog post
app.post("/removeblog", async (req, res) => {
  await Blog.findOneAndDelete({ id: req.body.id });
  res.json({
    success: true,
    message: "Blog post deleted",
  });
});

// Endpoint for getting all blog posts
app.get("/allblogs", async (req, res) => {
  let blogs = await Blog.find({});
  res.send(blogs);
});

// Coonection test
app.listen(port, (error) => {
  if (!error) {
    console.log("Server Runninf on POrt " + port);
  } else {
    console.log("Error : " + error);
  }
});
