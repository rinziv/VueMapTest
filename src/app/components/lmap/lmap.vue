<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import Ld3SvgOverlay from 'leaflet-d3-svg-overlay/L.D3SvgOverlay.js';
import 'leaflet/dist/leaflet.js';


export default {
  name: 'LMap',
  props: [ 'filename' ],
  data: function(){
    return {
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
    }
  },
  watch: {
    filename: function(file) {
      console.log("filename", file);
      this._remove()
      this._add()
    }
  },
  mounted () {
    console.log("filename", this.filename);
    this._add()
  },
  beforeDestroy () {
    this._remove()
  },
  methods: {
    deferredMountedTo (parent) {
      this.parent = parent
      console.log("parent", parent);
      this.mapObject.addTo(parent);
      // [
      //   'clusterclick',
      //   'clustermouseover',
      //   'clustermouseout',
      //   'animationend',
      //   'spiderfied',
      //   'unspiderfied'
      // ].forEach(eName =>
      //   this.markerCluster.on(
      //     eName,
      //     e => this.$emit('l-' + eName, e)
      //   )
      // )
    },
    _remove () {
      this.parent.removeLayer(this.mapObject)
    },
    _add () {
      this.mapObject = Ld3SvgOverlay(this.drawCallback);
      console.log('overlay', this.mapObject
    );
      console.log('parent', this.$parent);
      if (this.$parent._isMounted) {
        this.deferredMountedTo(this.$parent.mapObject)
      }
    },
    drawCallback: function(sel, proj){
      var citiesUpd = sel.selectAll('circle').data(this.cities);
      citiesUpd.enter()
        .append('circle')
        .attr('r',function(d){return 10;})
        .attr('cx',function(d){return proj.latLngToLayerPoint([d.lat, d.lon]).x;})
        .attr('cy',function(d){return proj.latLngToLayerPoint([d.lat, d.lon]).y;})
        .attr('stroke','black')
        .attr('stroke-width',1)
        .attr('fill', "red");
    }
  }
}
</script>
