<template>
    <div id="app">
    <v-map :zoom=9 :center="[46.5218269,6.6327025]">
      <v-tilelayer url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png" attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'></v-tilelayer>
      <LMap></LMap>
    </v-map>
  </div>
</template>

<script>
import LMap from './app/components/lmap/lmap';

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
