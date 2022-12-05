import mongoose from "mongoose";
import { getCurrentTime } from "../utils/getCurrentTime";

const Token = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: getCurrentTime(),
  },
});

export default mongoose.model("Token", Token);
