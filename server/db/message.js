const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let message = mongoose.model('message',new Schema({
  /*关联用户表*/
  user: {type: Schema.Types.ObjectId, ref: "user", required: true},
  /*留言内容*/
  content: {type: String, required: true},
  /*日期*/
  date: {type: Date, default: Date.now},
  /*子留言*/
  children: [
    {
      /*子留言 用户*/
      user: {type: Schema.Types.ObjectId, ref: "user", required: true},
      /*子留言 内容*/
      content: {type: String, required: true},
      /*子留言 对象*/
      reUser: {type: String, required: true},
      /*子留言 日期*/
      date: {type: Date, default: Date.now},
    }
  ]
}));

/*for(let i = 0;i<50;i++){
  message.create({
    user: "5e9317be4f06e12adc9e7128",
    content: "<p>h啊哈哈哈哈嗝儿</p>"
  });
}*/

module.exports = message;
