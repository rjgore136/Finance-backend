import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    notes: {
      type: String,
      trim: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

transactionSchema.index({ type: 1 });
transactionSchema.index({ category: 1 });

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
