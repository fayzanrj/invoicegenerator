import { Schema, model, models } from "mongoose";

const customerNumberSchema = new Schema(
  {
    number: {
      type: Number,
    },
  },
  { timestamps: true }
);

const CustomerNumber =
  models.CustomerNumber || model("CustomerNumber", customerNumberSchema);

export default CustomerNumber;
