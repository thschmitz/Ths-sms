const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.js");
const app = express();
const port = process.env.PORT || 5000;

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/auth", authRoutes)

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.listen(port, () => console.log(`Server running on port ${port}`))