import { Noto_Nastaliq_Urdu } from "next/font/google";

const UrduFont = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400", "600"],
});

export default UrduFont.className;
