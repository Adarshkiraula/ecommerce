// Admin Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt=require('bcrypt');
const SALT_WORK_FACTOR=10;
const AdminSchema = new Schema({
    first_name: {type:String},
    last_name: {type:String},
    email: {type:String,unique:true},
    pswd: {type:String},
    phone_number: {type:String},
    is_deleted: {
        type: Boolean,
        default: false
    },
    address: {type:String},
    country: {type:String},
    state: {type:String},
    city: {type:String},
    zip_code: {type:Number},
    profile_pic: {type:String},

},
{timestamps:true}
)

AdminSchema.pre('save', function(next) {
    var user = this;
  
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('pswd')) return next();
  
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
  
            // hash the password using our new salt
        bcrypt.hash(user.pswd, salt, function(err, hash) {
            if (err) return next(err);
  
            // override the cleartext password with the hashed one
            user.pswd = hash;
            next();
        });
    });
  });
  
  AdminSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.pswd, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
  };	

module.exports=mongoose.model("Admin",AdminSchema);