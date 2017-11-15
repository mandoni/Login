const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

mongoose.connect('mongodb://localhost/Chat', function (err) {
    if (err) console.log('error al conectarse');
    console.log('se conectó la base de datos MongoDB');
  });

var userSchema = new mongoose.Schema({
    userName: {type: String, unique: true},
    name: String,
    password: String
});
userSchema.methods.cryptPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

userSchema.methods.validatePassword = function(password){
    return bcrypt.compareSync(password, this.local.password);
}

var User  = mongoose.model('userModel', userSchema);
module.exports = User;

