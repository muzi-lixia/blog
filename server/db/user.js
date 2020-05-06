const mongoose = require('mongoose');
const crypto = require('crypto');

let userSchema = new mongoose.Schema({
  user: {type:String,require: true},
  psw: {type:String,require: true},
  /*注册时间*/
  regDate: {type:Number,default: Date.now},
  /*头像*/
  photo: {type:String,default: "http://localhost:3000/img/default.jpg"},
  /*权限*/
  disabled: {type:Boolean,default: false},
  /*管理员权限*/
  admin: {type:Boolean,default: false}
});

userSchema.pre("save",function(next) {
  let psw = this.psw;
  this.psw = crypto.createHash("sha256").update(psw).digest("hex");
  next();
});

module.exports = mongoose.model('user',userSchema);

