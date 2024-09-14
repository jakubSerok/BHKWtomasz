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

app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    succes: 1,
    image_url: `http://localhost:${3001}/images/${req.file.filename}`,
  });
});

//Schema for Creating Products

const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  avilable: {
    type: Boolean,
    default: true,
  },
});

//Creating Endpoint for adding product
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
    name: req.body.name,
    image: req.body.image,
    price: req.body.price, // Corrected this line
  });
  await product.save();
  res.json({
    succes: true,
    name: req.body.name,
  });
});

//Creating API for deleting product
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  res.json({
    succes: true,
    name: req.body.name,
  });
});

//Creating API for getting all prdocuts
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
    // Find the user by email
    let user = await Users.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, errors: "Wrong email address" });
    }

    // Compare the plain password with the hashed password
    const passCompare = await bcrypt.compare(req.body.password, user.password);
    if (!passCompare) {
      return res.status(400).json({ success: false, errors: "Wrong password" });
    }

    // Create JWT payload
    const data = {
      user: {
        id: user._id,
      },
    };

    // Generate a JWT token
    const token = jwt.sign(data, "tomasz_bhkw", { expiresIn: "1h" });

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

// Coonection test
app.listen(port, (error) => {
  if (!error) {
    console.log("Server Runninf on POrt " + port);
  } else {
    console.log("Error : " + error);
  }
});
