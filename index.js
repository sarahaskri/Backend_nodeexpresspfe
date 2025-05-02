require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
app.use("/api", require("./routes/app.routes"));
 // doit être avant tout `require` utilisant une variable .env


app.listen(4001,function(){
    console.log("Server is running on port 4001");
}
) 