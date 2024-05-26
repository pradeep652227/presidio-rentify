import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const dbUrl = String(process.env.DB_URL);

/*Schemas*/
const propertySchema = mongoose.Schema({
  place: { type: String, required: true },
  state: { type: String, required: true },
  area: { type: String, required: true },
  pin_code: { type: Number, required: true },
  price:{type:String, required:true},
  slug:String,
  number_bedrooms: Number,
  number_bathrooms: Number,
  hospitals: Number,
  schools: Number,
  colleges: Number,
  listedBy:String
});

const userSchema = mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  phone:{type:Number, required:true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  user_role: { type: String, required: true },
  user_properties:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
  user_favourites:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }]
});

/*Models*/
const User = new mongoose.model("User", userSchema);
const Property = new mongoose.model("Property", propertySchema);

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
}

export { User, Property };
