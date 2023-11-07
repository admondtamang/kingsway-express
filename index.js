const express = require("express");
const mongoose = require("mongoose"); //-

const User = require("./models/user"); //-

const app = express();
const PORT = 3000;

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://admondtamang:16xnIsnBM5KdBPoZ@cluster0.k9jqujr.mongodb.net/test"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Routes
app.post("/users", async (req, res) => {
  try {
    const { name, email, age } = req.body;

    const newUser = new User({ name, email, age });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error?.message });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error?.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
