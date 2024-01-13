import 'dotenv/config'
import connectDB from "./db/indexDB.js";
import { app } from "./app.js";

const PORT=process.env.PORT || 8000;

connectDB()
.then(()=>{
    app.on("Error",(error)=>{
        console.error("index/connectDB .then Error= ",error);
    });
    app.listen(PORT,()=>{
        console.log(`Listening to Port ${PORT}`);
    });
})
.catch((err)=>{
    console.error("src/index.js Error= ",err);
});