const express = require("express");
const cors = require("cors");
const connectDB = require("./config/index");
const transferRoutes = require("./routes/transferRoutes");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api", transferRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
