const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/content", require("./routes/contentRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/property", require("./routes/propertyRoutes"));

app.get("/", (req, res) => {
    res.send("API Running...");
});

const PORT = process.env.PORT || 8080;
const chatRoutes = require("./routes/chatRoutes");

app.use("/api/chat", chatRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})