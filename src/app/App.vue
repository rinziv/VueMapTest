<template>
    <div id="app" style="height: 100%">
    <v-map :zoom=9 :center="[46.5218269,6.6327025]">
      <v-tilelayer url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png" attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'></v-tilelayer>
      <CanvasOverlay :pointList="cities"></CanvasOverlay>
    </v-map>
  </div>
</template>

<script>
import SVGOverlay from './components/lmap/SVGOverlay.vue';
import CanvasOverlay from './components/lmap/CanvasOverlay.vue';

export default {
  name: 'App',
  components: {
    SVGOverlay,
    CanvasOverlay
  },
  data: function() {
    return {
      hello: 'Hello World!',
      cities:[
        {
          city:'Genève',
          population:195177,
          lon:6.1466014,
          lat:46.2017559
        },{
            city:'Lausanne',
            population:132626,
            lon:6.6327025,
            lat:46.5218269
        }
      ]
    };
  },
  mounted: function(){
    let that = this.cities;
    d3.csv("seeds.csv", function(row){
      let r = {
        cid:+row['cid'],
        lat:+row['lat'],
        lon:+row['lon']
      };
      that.push(r);
      return r;
    },
    function(error, data){

    })
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
