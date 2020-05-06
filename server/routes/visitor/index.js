const express = require("express");
const visitorDB = require("../../db/visitor");
const router = express.Router();

/*最近访客接口*/
router.post('/',(req,res)=>{
  visitorDB.find({},{},{sort: {date: -1}}).populate("user",{_id:1,user:1,photo:1})
    .then(data=>{
    res.send({
      code : 0,
      msg : "请求成功",
      data
    })
  }).catch(()=>{
    res.send({
      code : 4,
      msg : "服务器错误~~",
      data : []
    })
  });
});


module.exports = router;