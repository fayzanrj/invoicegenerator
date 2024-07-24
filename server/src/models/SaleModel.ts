import { Schema, model, models } from "mongoose";

const saleSchema = new Schema(
  {
    details: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    builtyNo: {
      type: String,
      required: false,
    },
    date: {
      type: String,
      required: true,
    },
    month: {
      type: Schema.ObjectId,
      ref: "MonthlySale",
      required: false,
    },
    customer: {
      type: Schema.ObjectId,
      ref: "Customer",
      required: false,
    },
  },
  { timestamps: true }
);

const Sale = models.Sale || model("Sale", saleSchema);

export default Sale;
