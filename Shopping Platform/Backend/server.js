const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;
mongoose.connect(URL, {
    useCreateIndex: true,
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useFindAndModify: false

});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongodb connection success!!");
});

const userRouter = require('./routes/users.js');
// http://localhost:8070/user
app.use('/user', userRouter);

const itemRouter = require('./routes/items.js');
app.use('/item', itemRouter);

app.listen(PORT, () => {
    console.log(`server is up and running in port ${PORT}`);
});

