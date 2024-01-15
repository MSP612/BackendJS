import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));//cors basically allows our backend to connect with frontend

app.use(express.json({limit:"16kb"})); //allows to read json data and we can limit how much json data we need
app.use(express.urlencoded({extended:true, limit:"16kb"})); //to enable parsing for url encoded bodies
app.use(express.static("public")); //to basically store some publicaly available data in public folder
app.use(cookieParser()); //to operate crud operation on users secure cookies

export { app };