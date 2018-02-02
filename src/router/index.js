import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import editor from '@/views/editor.vue';
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      //name: 'HelloWorld',
      //component: HelloWorld
      name: 'ue',
      component: editor
    }
  ]
})
