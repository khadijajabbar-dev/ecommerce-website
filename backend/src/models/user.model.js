import mongoose from "mongoose";
import bcrypt from "bcrypt";
import sendOTP from "../utils/sendOTP.js";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    phone: { type: String, required: true },
    role: { type: String, enum: ["seller", "buyer"], required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    otp: { type: String, default: null },
    otpExpiry: { type: Date, default: null },
    isVerified: { type: Boolean, default: false },

    profileImage: { type: String, trim: true, default: "" },

    // ===============================
    // Seller Store Profile
    // Only relevant when role === "seller"
    // ===============================
    storeProfile: {
      storeName: { type: String, trim: true, default: "" },
      storeDescription: { type: String, trim: true, default: "" },
      storeCategory: { type: String, trim: true, default: "" },
      businessType: {
        type: String,
        enum: ["individual", "partnership", "company", ""],
        default: "",
      },
      storeAddress: { type: String, trim: true, default: "" },
      storeCity: { type: String, trim: true, default: "" },
      ntnNumber: { type: String, trim: true, default: "" },
      storeLogo: { type: String, trim: true, default: "" },
    },

    isStoreSetup: {
      type: Boolean,
      default: false,
    },

    // ===============================
    // Buyer: Wishlist
    // (Cart is now a separate normalized collection — see cart.model.js)
    // ===============================
    wishlist: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  try {
    if (!this.isModified("password")) {
      return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    throw error;
  }
});

userSchema.post("save", async function (doc) {
  try {
    if (!doc.isVerified && doc.otp) {
      console.log(`🔑 OTP for ${doc.email}: ${doc.otp}`);
      console.log(`Sending OTP email to ${doc.email}...`);
      try {
        await sendOTP(doc.email, doc.otp);
        console.log("OTP email sent successfully");
      } catch (emailError) {
        console.error("Failed to send OTP email via SMTP:", emailError.message);
      }
    }
  } catch (error) {
    throw error;
  }
});

const User = mongoose.model("User", userSchema);

export default User;
