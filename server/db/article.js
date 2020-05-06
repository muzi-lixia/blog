const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let articleSchema = new Schema({
  type: {type: String,required: true},
  title: {type: String,required: true},
  content: {type: String,required: true},
  updateDate : {type: Date,default: Date.now},
  date: {type: Date,default: Date.now},
  tag: {type: String,required: true},
  surface: {type: String,default: "http://localhost:3000/img/defaultSurface.jpg"},
  pv: {type: Number,default: 0},
  comment: [
    {type: Schema.Types.ObjectID,ref: 'comment'}
  ]
});

let article = mongoose.model('article',articleSchema);

articleSchema.pre("update",function (next) {
  this.update = new Date;
  next();
});
/*创建假数据*/
/*for(let i=0;i<100;i++){
  article.create({
    type: ['原创','转载'][(Math.random()*2)|0],
    title: `第${i+1}篇文章`,
    content: (''+i+i+i+i+i+'哈哈哈哈哈我是文章的内容').repeat(10),
    pv : Math.random()*9999|0,
    tag: ["HTML5&CSS3","Javascript","NodeJs","Vue&React","Other"][(Math.random()*5)|0]
  })
}*/

module.exports = article;
