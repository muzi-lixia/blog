import axios from 'axios';

//配置默认参数
axios.defaults.baseURL = 'http://localhost:3000';//默认访问地址
//跨域允许携带cookie
axios.defaults.withCredentials = true;
//设置post请求格式
axios.defaults.headers.post["Content-Type"] = 'application/x-www-from-urlencoded';

export default {
  /*请求文章信息*/
  getArticleInfo(){
    return axios.post('/article/getInfo')
  },
  /*
  * 请求热门文章
  * @parmas
  *   limit: Number, 可选，默认值 8
  *            一共请求几条数据
  * @return
  *   返回axios的promise
  * */
  getArticleHot(limit=8){
    return axios.post('/article/getHot',{limit})
  },
  /*获取文章列表*/
  getArticleShow:(function(){
    //定义从哪篇文章开始加载
    let skip = 0;
    //每次加载多少篇
    let limit = 5;
    return function(index=0,ifFresh=false){
      /*mounted(重新加载页面)和watch(改变id值)的时候，重置skip、limit*/
      if(ifFresh){
        skip = 0;
        limit = 5;
      }
      let tag = ["","HTML5&CSS3","Javascript","NodeJs","Vue&React","Other"][index];
      //将data传到后端
      let data = {skip,limit,tag};
      skip += limit;
      return axios.post('/article/getShow',data);
    };
  })(),
  /*获取单篇文章的信息*/
  getArticle(_id){
    return axios.post('/article',{_id});
  },
  /*获取延伸阅读*/
  getArticleExtend(tag){
    return axios.post('/article/extend',{tag});
  },
  /*搜索文章*/
  getArticleSearch(keyWords){
    return axios.post('/article/search',{keyWords});
  },

  /*获取验证码图片*/
  getRegisterVCode(){
    return axios.post('/register/svgCode');
  },
  /*验证码的提交验证*/
  getRegisterCheckVCode(svgCode){
    return axios.post('/register/checkVCode',{svgCode});
  },
  /*用户名验证*/
  getRegisterUser(user){
    return axios.post('/register/checkUser',{user});
  },


  /*
  * 注册提交
  * @parmas
  *   options: Object,必须, 需要 user, psw, svgCode三条属性
  * @return
  *   返回axios的promise
  * */
  getRegister(options){
    return axios.post('/register',options);
  },


  /*登录接口*/
  getLogin(options){
    return axios.post('/login',options);
  },
  /*判断是否登录*/
  getIfLogin(){
    return axios.post('/login/ifLogin');
  },
  /*退出登录的接口*/
  getLogOut(){
    return axios.post('/login/logOut');
  },


  /*留言的接口
  * options
  *   {user: "id", content: ""}
  * */
  commitMessage(options){
    return axios.post('/message/commit',options);
  },
  /*留言的留言接口
  * options
  *     {parentId: "id", user: "id", content: "", $user: "", }
  * */
  commitChildMessage(options){
    return axios.post('/message/childCommit',options);
  },
  /*获取留言列表*/
  getMessageList(skip=0,limit=5){
      return axios.post('/message/getList',{skip,limit});
    },

  /*最近访客*/
  getVisitor(){
    return axios.post('/visitor');
  },

	/*请求日记*/
	getDiary(){
		return axios.get('/diary');
	  },
	
   /*友链接口*/
   getLinks(){
		return axios.get('/links');
   }
};

