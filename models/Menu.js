import { Schema, model } from "mongoose";

const menuSchema = new Schema(
  {
    title: {
      type: String,
    },
    volume: {
      type: String,
    },
    price: {
      type: String,
    },
    description: {
      type: String,
    },
    season: {
      type: Boolean,
    },
    type: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { versionKey: false }
);

const Menu = model("menu", menuSchema);

export default Menu;
