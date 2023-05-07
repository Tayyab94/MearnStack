const express = require("express");

const dbConnect = require("./database/index");
const { SERVER_PORT } = require("./config");
const router = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");

const PORT = SERVER_PORT;

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(router);
dbConnect();
app.use("/storeage", express.static("storeage"))
// app.get("/", (req, res) => {
//     res.json({ msg: "Tayyab" });

// })

app.use(errorHandler)
app.listen(PORT, console.log(`Backend server is runningon port ${PORT}`))