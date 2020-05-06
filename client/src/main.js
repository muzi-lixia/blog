import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/*element-ui组件*/
import {Button,Container,Aside,Main,MessageBox,Message,Form,FormItem,Input,Link,Timeline
,TimelineItem,Card,Popover,Dialog,Upload} from 'element-ui'
Vue.use(Button);
Vue.use(Container);
Vue.use(Aside);
Vue.use(Main);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Link);
Vue.use(Timeline);
Vue.use(TimelineItem);
Vue.use(Card);
Vue.use(Popover);
Vue.use(Dialog);
Vue.use(Upload);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
