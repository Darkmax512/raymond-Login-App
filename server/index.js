require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookiesParser = require("cookie-parser");
const connectDB = require("./database/connect");
const authRouter = require("./routes/auth");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");
const app = express();
const port = process.env.PORT || 5000;

app.use(helmet());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(cookiesParser());

app.use("/api/v1/auth", authRouter);

app.use(express.static(path.resolve(__dirname, "../client", "build")));
app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
});

app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`SERVER IS UP AND RUNNING ON PORT: ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};
start();
