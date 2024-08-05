//Requiring packages
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");
const app = express();
const employee = require("./models/Employee");
const methodOverride = require("method-override");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

dotenv.config();

//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/views/public")));
app.use(methodOverride("_method"));

//Establishing connection with MongoDB
async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}
main()
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.log(err));

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//Home route
app.get("/", (req, res) => {
  res.render("Home");
});
// Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.redirect("/employee");
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
// Register
app.get("/register", (req, res) => {
  res.render("register.ejs");
});
app.post("/register", async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();
    res.status(201).redirect("/");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//Logout Route
app.get("/logout", (req, res) => {
  res.redirect("/");
});

//Index Route
app.get("/employee", async (req, res) => {
  let allEmployees = await employee.find();
  res.render("Index", { allEmployees });
});

// Add Route
app.get("/employee/new", (req, res) => {
  res.render("New");
});
//Create Route
app.post("/employee", (req, res) => {
  let { name, position, department, salary } = req.body;
  let newEmployee = new employee({
    name: name,
    position: position,
    department: department,
    salary: salary,
  });
  newEmployee
    .save()
    .then(() => {
      console.log("new employee saved");
    })
    .catch((err) => {
      console.log("some error occured");
    });
  res.redirect("/employee");
});

//Edit Route
app.get("/employee/:id", async (req, res) => {
  let { id } = req.params;
  let emp = await employee.findById(id);
  res.render("edit", { emp });
});
//Update route
app.put("/employee", async (req, res) => {
  let id = req.body.id;
  await employee.findByIdAndUpdate(id, { ...req.body.emp });
  res.redirect("/employee");
});
//Delete Route
app.delete("/employee/:_id", async (req, res) => {
  let id = req.params;
  let del = await employee.findByIdAndDelete(id);
  console.log(del);
  res.redirect("/employee");
});
