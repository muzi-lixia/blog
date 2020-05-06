let express = require('express');
let router = express.Router();


/*文章信息接口*/
router.use("/article",require('./article/index'));
/*注册信息接口*/
router.use("/register",require('./register/index'));
/*登录信息接口*/
router.use("/login",require('./login/index'));
/*留言信息接口*/
router.use("/message",require('./message/index'));
/*最近访客*/
router.use("/visitor",require('./visitor/index'));
/*上传接口*/
router.use("/upload",require('./upload/index'));
/*获取日记接口*/
router.use("/diary",require('./diary/index'));
/*获取友链接口*/
router.use("/links",require('./links/index'));

module.exports = router;
