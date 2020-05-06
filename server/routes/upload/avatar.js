const express = require("express");
const path = require("path");
const multer = require("multer");
const userDB = require("../../db/user");

let router = express.Router();

let storage =  multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,'../../public/img/upload/avatar'));
  },
  filename: function (req, file, cb) {
    let fileName = "";
    if (req.session.login) {
      fileName = req.session.login._id + file.originalname.match(/\.(jpg|png|gif|jpeg)$/i)[0];
    }else {
      fileName = file.fieldname + '-' + Date.now() + file.originalname.match(/\.(jpg|png|gif|jpeg)$/i)[0];
    }
    cb(null, fileName)
  }
});

const upload = multer({storage}).single("file");

router.post('/',(req,res)=>{
  upload(req,res, function (err) {

    //发生错误
    if (err instanceof multer.MulterError){
      res.send(500);
    }else if (err){
      res.send(500);
    }else {
      //一切都好

      /*判断是否登录*/
      if (!req.session.login){
        res.sendStatus(500);
        return;
      }
      /*更新用户表*/
      userDB.updateOne(
        {_id:req.session.login._id},
        {photo:"http://localhost:3000/img/upload/avatar/"+req.file.filename}
        ).then(()=>{
        //需要更新session存储的数据
        req.session.login.photo = "http://localhost:3000/img/upload/avatar/"+req.file.filename;
        console.log(req.session.login.photo);
        res.send("OK")
      }).catch(()=>{
        res.sendStatus(500);
      });
    }
  })
});


module.exports = router;

