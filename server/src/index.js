import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"; 
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";   
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { verifyToken } from "./middleware/auth.js";
import {createPost} from "./controllers/posts.js";
import connectDB from "./config/db.js";

const __filename= fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
connectDB();
const app = express();
app.use(express.json());    
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("common"));
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "server/src/public/assets")));
 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {cb(null, "src/public/assets");}, 
    filename: (req, file, cb) => {cb(null, file.originalname);}
});
const upload = multer({storage: storage});

app.post("/auth/register",upload.single("picture"),register);
app.post("/post",verifyToken,upload.single("picture"),createPost);

app.use("/auth",authRoutes);
app.use("/users",userRoutes);
app.use("/posts",postRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
