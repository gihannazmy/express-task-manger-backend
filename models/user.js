
const {default : mongoose} = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  
email: {
  type: String,
  required: true,
  unique: true,
  lowercase: true,
  trim: true
},
password: {
  type: String,
  required: true,
  select: false,
  minlength: 6
}

});


userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;