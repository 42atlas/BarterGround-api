import "./db/index.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import postsRouter from "./routes/postsRouter.js";
import authRouter from "./routes/authRouter.js";
import errorHandler from "./middlewares/errorHandler.js";
/* import sessionAuth from "./routes/sessionAuth.js"; */
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Set the configuration for your app
// TODO: Replace with your app's config object
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  storageBucket: process.env.STORAGE_BUCKET
};
const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(firebaseApp);


const app = express();
const port = process.env.PORT || 5000;

process.env.NODE_ENV !== "production" && app.use(morgan("dev"));

//file upload
/* app.post("/file", fileUpload.single("file"), (req, res) => {
  res.status(201).json(req.file);
}); */
//
app.use(cors({ origin: "*" }));
app.use(express.json());
/* app.use("/session-auth", sessionAuth); */
app.use("/auth", authRouter);
app.use("/posts", postsRouter);
app.use("*", (req, res) => res.sendStatus(404));
app.use(errorHandler);

app.listen(port, () =>
  console.log(`Server is running at http://localhost:${port}`)
);
