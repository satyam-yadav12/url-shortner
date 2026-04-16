import mongoose from "mongoose";

const uriSchema = new mongoose.Schema({
  ident: {
    type: String,
    require: true,
  },
  originalUri: {
    type: String,
    require: true,
  },
});

const makeUrl = mongoose.model("makeUrl", uriSchema, "url");

export default makeUrl;
