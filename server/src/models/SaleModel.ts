import { Schema, model, models } from "mongoose";

const saleSchema = new Schema(
  {
    item: {
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
      type: String,
      required: true,
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
