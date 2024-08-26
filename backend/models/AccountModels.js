/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: { type: String },
  lastname: { type: String },
  middlename: { type: String },
  suffix: { type: String },

  role: {
    type: String,
    enum: ["student", "faculty", "staff", "admin"],
    required: true,
  },
  position: String,
  course: String,
  year: String,
  schoolyear: String,
  semestertype: String,
  address: String,
  contactnumber: String,
  contactperson: String,
  contactpersonnumber: String,
  signature: String,
  birthdate: Date,
  isIdIssued: Boolean,
  position: String,
  designation: String,
  hgt: String,
  wgt: String,
  sss: String,
  tin: String,
  picture: {
    type: String,
    required: false,
  },
  affidavit: String,
  schoolid: String,
  message: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});


module.exports = mongoose.model("Account", userSchema);