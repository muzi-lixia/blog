/*登录*/
const express = require("express");
const userDB = require("../../db/user");
const visitorDB = require("../../db/visitor");
const crypto = require("crypto");
let router = express.Router();

/*登录接口*/
router.post("/",(req,res)=>{
  /*查看是否已经登陆*/
  if (req.session.login) {
    res.send({
      code: 2,
      msg: "已经登录，请退出后再登录。"
    });
    return;
  }
  let {user,psw} = req.body;
  /*验证数据有效性*/
  if( !user || !psw ){
    res.send({
      code: 1,
      msg: "数据无效，请检查后重试。"
    });
    return;
  }
  /*验证用户名与密码*/
  if(!/^[\w\u4e00-\u9fa5]{3,8}$/.test(user) || !/^[\w.?!*<>{},;'"^\/\\\[\]]{6,12}$/.test(psw)){
    res.send({
      code: 2,
      msg: "用户名或密码不符合规则"
    });
    return;
  }
  userDB.findOne({user}).then((data)=>{
    if(data){
      /*用户存在*/
      if(data.psw === crypto.createHash("sha256").update(psw).digest("hex")){
        /*密码正确*/
        /*写入session*/
        req.session.login = data;
        /*返回前端*/
        res.send({
          code: 0,
          msg: "登录成功"
        });
        /*添加到最近访客*/
        visitorDB.deleteMany({user:data._id}).then(()=>{
          visitorDB.create({
            user : data._id
          },()=>{});
        }).catch()
      }else{
        /*密码不正确*/
        res.send({
          code: 2,
          msg: "密码错误!"
        })
      }
    }else{
      /*用户不存在*/
      res.send({
        code: 1,
        msg: "用户不存在!"
      })
    }
  }).catch(()=>{
    res.send({
      code: 4,
      msg: "服务器错误"
    })
  });
});

/*判断是否登录接口*/
router.post("/ifLogin",(req,res)=>{
  let data = req.session.login;
  let resData = false;
  if(data){
      delete data.psw;
      delete data.__v;
      resData = data
  }
  res.send({
    userInfo : resData,
  });
});

/*退出登录接口*/
router.post("/logOut",(req,res)=>{
    req.session.destroy();
    res.send({
      code : 0,
      msg : "退出登录成功"
    })
});

module.exports = router;