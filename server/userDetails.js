const mongoose = require("mongoose");

const userDetails = new mongoose.Schema(
    {
        fname:{ type: String, required: true },
        lname:{ type: String, required: true },
        email: { type: String, unique: true, required: true},
        password:{ type: String, required: true },
    },
    {
        collection: "users",
    }
);

mongoose.model("users", userDetails)