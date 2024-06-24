import mongoose, { Schema } from "mongoose";

const MovieRequestSchema = new Schema(
  {
    fullName: { type: String, required: false },
    email: { type: String, required: true },
    movieName: { type: String, required: true },
    added: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const MovieRequestModel =
  mongoose.models.MovieRequests ||
  mongoose.model("MovieRequests", MovieRequestSchema);

export default MovieRequestModel;
