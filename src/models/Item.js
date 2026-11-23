
import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 90
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1200
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Books & Education",
        "Electronics",
        "Tools & DIY",
        "Home & Kitchen",
        "Sports & Fitness",
        "Photography",
        "Travel & Outdoors",
        "Other"
      ]
    },

    condition: {
      type: String,
      required: true,
      enum: ["New", "Like New", "Good", "Fair"]
    },

    imageUrl: {
      type: String,
      default: ""
    },

    city: {
      type: String,
      required: true,
      trim: true
    },

    country: {
      type: String,
      required: true,
      trim: true
    },

    pickupSpot: {
      type: String,
      required: true,
      trim: true
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    status: {
      type: String,
      enum: ["available", "paused", "archived"],
      default: "available"
    }
  },
  { timestamps: true }
);

itemSchema.index({
  city: 1,
  country: 1,
  status: 1,
  createdAt: -1
});

const Item = mongoose.model("Item", itemSchema);

export default Item;
