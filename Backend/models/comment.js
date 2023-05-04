const mongoose = require("mongoose");

const { Schema } = mongoose;

/* This code is defining a Mongoose schema for a comment. The schema has three fields: `content`, which
is a required string, `blog`, which is a reference to a blog document in the "blogs" collection, and
`author`, which is a reference to a user document in the "users" collection. The schema also
includes a `timestamps` option, which automatically adds `createdAt` and `updatedAt` fields to the
document. */

const commentSchema = new Schema({
    content: { type: String, required: true },
    blog: { type: mongoose.SchemaType.ObjectId, ref: "blogs" },
    author: { type: mongoose.SchemaType.ObjectId, ref: "users" }
}, { timestamps: true });

module.exports = mongoose.model("Comment", commentSchema, "comments")