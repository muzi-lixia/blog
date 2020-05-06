/*注册*/
const express = require("express");
const svgCaptcha = require("svg-captcha");
const userDB = require("../../db/user");
let router = express.Router();

/*注册接口*/
router.post('/',(req,res)=>{
  let {user,psw,svgCode} = req.body;
  /*去掉req.session.registerCodeTime*/
  req.session.registerCodeTime = 0;
  /*验证数据有效性*/
  if( !user || !psw || !svgCode ){
    res.send({
      code: 1,
      msg: "数据无效，请检查后重试。"
    });
    return;
  }
  /*后端验证 验证码*/
  if ((svgCode.toLowerCase() !== req.session.registerCode.text.toLowerCase())) {
    res.send({
      code: 2,
      msg: "验证码错误。"
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
  /*检测用户名是否重复*/
  //findOne 没值是null,有值是一个对象，find 没值是[]
  userDB.findOne({user}).then(data=>{
      if(data){
        res.send({
          code: 3,
          msg: "用户名已存在"
        })
      }else {
        /*用户名不存在，存数据到数据库*/
        userDB.create({user,psw}).then(()=>{
          /*注册成功*/
          res.send({
            code: 0,
            msg: "注册成功"
          })
        }).catch(()=>{
          res.send({
            code: 4,
            msg: "服务器错误"
          })
        });
      }
    }).catch(()=>{
      res.send({
        code: 4,
        msg: "服务器错误"
      })
  })
});

/*blur时 检测用户名是否重复*/
router.post('/checkUser',(req,res)=>{
  let {user} = req.body;
  req.session.registerCodeTime = 0;
  if(!user)return;
  userDB.findOne({user}).then(data=>{
    if(!data){
      res.send({
        code: 1,
        msg: ""
      });
      return;
    }else{
      res.send({
        code: 3,
        msg: "用户名已存在"
      })
    }
  }).catch(()=>{
    res.send({
      code:4,
      msg: "服务器错误"
    })
  });
});

//验证码请求接口
router.post('/svgCode',(req,res)=>{
  if(req.session.registerCodeTime){
    let t_ = new Date() - new Date(req.session.registerCodeTime);
    if(t_ <= 5000){
      res.send({
        code: 2,
        data: req.session.registerCode.data,
        mag: "请求过于频繁",
        time: t_ - 5000
      });
      return;
    }
  }
  let captcha = svgCaptcha.create();
  /*将正确答案存储到session*/
  req.session.registerCode = captcha;
  req.session.registerCodeTime = new Date();
  /*将svg发送到前端*/
  res.send({
    code: 0,
    data: captcha.data,
    time: 5000
  })
});
/*验证码失去焦点的验证请求*/
router.post('/checkVCode',(req,res)=>{
  let {svgCode} = req.body;
    /*VCode不存在或匹配不成功，则验证失败*/
    if(!svgCode || (svgCode.toLowerCase() !== req.session.registerCode.text.toLowerCase())){
      res.send({
        code: 1,
        mag: "验证失败"
      })
    }else{
      res.send({
        code: 0,
        mag: "验证成功"
      })
    }
});

module.exports = router;