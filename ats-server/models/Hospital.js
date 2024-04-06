const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const hospitalSchema = new Schema({
  name: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    unique: true,
  },
  phone: {
    type: String,
    required: [true, "Phone is required"],
    trim: true,
    unique: true,
  },
  hospitalType: {
    type: String,
    enum: ["government", "private"],
    required: [true, "Type is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  pincode: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  location: {
    latitude: {
      type: String,
      required: [true, "Latitude is required"],
    },
    longitude: {
      type: String,
      required: [true, "Longitude is required"],
    },
  },
});

hospitalSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});
hospitalSchema.methods.isCorrectPassword = async function (
  providedPassword,
  userPassword
) {
  return await bcrypt.compare(providedPassword, userPassword);
};

const Hospital = mongoose.model("Hospital", hospitalSchema);

module.exports = Hospital;
