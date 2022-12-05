import mongoose from "mongoose";

const Token = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Token", Token);