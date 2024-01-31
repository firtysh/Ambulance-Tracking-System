const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const ambulanceSchema = new Schema({
  numberPlate: {
    type: String,
    // required: [true, 'Number Plate is required'],
    trim: true,
    unique: true,
  },
  ambulanceType: {
    type: String,
    enum: ['bls', 'als', 'micu', 'air', 'mortuary', 'boat'],
    required: [true, 'Type is required'],
  },
  driverName: {
    type: String,
    required: [true, 'Driver Name is required'],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Driver Phone is required'],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  // hospital: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Hospital',
  //   required: [true, 'Hospital is required'],
  // },
  isVerified: {
    type: Boolean,
    default: false,
  },
  location: {
    latitude: {
      type: String,
    },
    longitude: {
      type: String,
    }
  },
  source:{
    latitude :{
      type : String,
    },
    longitude : {
      type: String
    }
  },
  destination : {
    latitude :{
      type : String,
    },
    longitude : {
      type: String
    }
  },
  online : {
    type : Boolean
  },
  isAssigned : {
    type : Boolean
  },
  assignedTo : {
    type : Schema.Types.ObjectId,
    ref : 'User',
  }
});

ambulanceSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

ambulanceSchema.methods.isCorrectPassword = async function (providedPassword, userPassword) {
  return await bcrypt.compare(providedPassword, userPassword);
}

const Ambulance = mongoose.model('Ambulance', ambulanceSchema);

module.exports = Ambulance;