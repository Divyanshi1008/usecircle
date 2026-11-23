
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 70
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    passwordHash: {
      type: String,
      required: true,
      select: false
    },

    // Location instead of mandatory college details
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

    // Optional legacy field for existing accounts
    collegeName: {
      type: String,
      default: ""
    },

    role: {
      type: String,
      enum: ["member", "admin"],
      default: "member"
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("passwordHash")) return;

  this.passwordHash = await bcrypt.hash(
    this.passwordHash,
    12
  );
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.passwordHash);
};

export default mongoose.model("User", userSchema);
