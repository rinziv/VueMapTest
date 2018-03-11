<template>
    <div id="app" style="height: 100%">
    <v-map :zoom=9 :center="[46.5218269,6.6327025]">
      <v-tilelayer url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png" attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'></v-tilelayer>
      <LMap filename="test.csv"></LMap>
    </v-map>
  </div>
</template>

<script>
import LMap from './components/lmap/lmap.vue';

export default {
  name: 'Hello',
  components: {
    LMap
  },
  data() {
    return {
      hello: 'Hello World!'
    };
  }
};
</script>
<style media="screen">
html, body, #app {
  min-height: 100% !important;
  height: 100%;
}
body{
  margin:0;
  padding:8px;
}
</style>
