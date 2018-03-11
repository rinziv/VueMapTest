import Vue from 'vue';

import Hello from './app/Hello.vue';
import Vue2Leaflet from 'vue2-leaflet';

import './index.css';
import 'leaflet/dist/leaflet.css';
// require("leaflet_css");

import VueRouter from 'vue-router';
Vue.use(VueRouter);

Vue.component('v-map', Vue2Leaflet.Map);
Vue.component('v-tilelayer', Vue2Leaflet.TileLayer);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      components: {
        default: Hello
      }
    }
  ]
});

export default new Vue({
  el: '#root',
  router,
  render: h => h('router-view')
});
