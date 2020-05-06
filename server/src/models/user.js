const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Task = require("./task")


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("email is invalid")
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Password cannot contain 'password'")
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive number")
      }
    }
  },

  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
}, {
  timestamps: true

})

userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner"
})

userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  delete (userObject.password)
  delete (userObject.tokens)
  return userObject
}

userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, "iamkingope")
  user.tokens = user.tokens.concat({ token })
  await user.save()
  return token
}


userSchema.statics.findByCredentials = async (email, password) => {
  const userr = await user.findOne({ email })
  if (!email) {
    throw new Error("unable to login")
  }

  const isMatch = await bcrypt.compare(password, userr.password)
  if (!isMatch) {
    throw new Error("Unable to login")
  }

  return userr
}

// hassh the platintext password before saving
userSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()

})

userSchema.pre('remove', async function (next) {
  const user = this
  await Task.deleteMany({ owner: user._id })
  next()
})

const user = mongoose.model("User", userSchema)

module.exports = user