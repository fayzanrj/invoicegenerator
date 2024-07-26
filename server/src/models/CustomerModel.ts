import { Schema, model, models } from "mongoose";

const customerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
    customerNo: {
      type: Number,
      required: true,
      unique : true
    },
  },
  { timestamps: true }
);

const Customer = models.Customer || model("Customer", customerSchema);

export default Customer;
