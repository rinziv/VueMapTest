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
  props: [ 'pointList' ],
  data: function(){
    return {

    }
  },
  watch: {
    pointList: function(pl) {
      console.log("pointlist", pl);
      this._remove()
      this._add()
    }
  },
  mounted () {
    console.log("pointListM", this.pointList);
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
      var citiesUpd = sel.selectAll('circle').data(this.pointList);
      citiesUpd.exit().remove();
      citiesUpd.enter()
        .append('circle')
        .attr('r',function(d){return 2;})
        .attr('cx',function(d){return proj.latLngToLayerPoint([d.lat, d.lon]).x;})
        .attr('cy',function(d){return proj.latLngToLayerPoint([d.lat, d.lon]).y;})
        .attr('stroke','black')
        .attr('stroke-width',1)
        .attr('fill', "red");
    }
  }
}
</script>
