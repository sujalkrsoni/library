import app from "../app.js"
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import path from "path";


dotenv.config({ path: path.resolve(".env") });


const PORT = process.env.PORT;
console.log(PORT);


app.get("/", (req, res) => {    
    res.send("API is running...");
});


// Start server only after DB is connected
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
