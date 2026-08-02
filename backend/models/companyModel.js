import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    img: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    companyEmail: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const companyModel = mongoose.model("Company", companySchema);

export default companyModel;