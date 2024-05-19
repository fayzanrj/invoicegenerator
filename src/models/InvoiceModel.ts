import { Schema, model, models } from "mongoose";

const invoiceSchema = new Schema(
  {
    invoiceNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    buyerName: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    list: [
      {
        details: String,
        quantity: Number,
        rate: Number,
        total: Number,
        date: String,
      },
    ],
    note: {
      type: String,
    },
    total: {
      type: Number,
      required: true,
    },
    outstanding: {
      type: Number,
    },
    createdBy: {
      type: String,
    },
  },
  { timestamps: true }
);

const Invoice = models.Invoice || model("Invoice", invoiceSchema);

export default Invoice;
