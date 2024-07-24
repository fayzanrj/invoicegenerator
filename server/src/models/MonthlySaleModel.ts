import { Schema, model, models } from "mongoose";

const monthlySaleSchema = new Schema(
  {
    monthName: {
      type: String,
      required: true,
    },
    sales: [
      {
        type: Schema.ObjectId,
        ref: "Sale",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const MonthlySale = models.MonthlySale || model("MonthlySale", monthlySaleSchema);

export default MonthlySale;
