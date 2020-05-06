const express = require("express");
const linksDB = require("../../db/links");

const router = express.Router();
/*查询日记*/
router.get('/',(req,res)=>{
  linksDB.find({},{},{sort:{date:-1}})
    .then(data=>{
      res.send({
        code: 0,
        msg: "查询成功",
        data
      })
    })
    .catch(()=>{
      res.send({
        code: 0,
        msg: "服务器错误",
        data: []
      })
    });
});

module.exports = router;