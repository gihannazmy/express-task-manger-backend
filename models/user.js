
const  mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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


userSchema.pre('save', async function() {
  if (!this.isModified('password')) return ;

  this.password = await bcrypt.hash(this.password, 10);
  
});
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword ){ 
    return await bcrypt.compare(candidatePassword, userPassword);}
  
    
  

const User = mongoose.model('User', userSchema);

module.exports = User;