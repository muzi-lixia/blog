const express = require("express");
const router = express.Router();

/*接口访问测试*/
/*router.post('/',(req,res)=>{
  res.send("OK");
});*/

/*头像上传接口*/
router.use('/avatar',require("./avatar"));

module.exports = router;