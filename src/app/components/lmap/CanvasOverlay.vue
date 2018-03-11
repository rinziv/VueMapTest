<template>
<div>
  <slot></slot>
</div>
</template>

<script>
import 'leaflet-canvas-layer/L.CanvasLayer.js';
import 'leaflet/dist/leaflet.js';


export default {
  name: 'CanvasOverlay',
  props: ['pointList'],
  data: function() {
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
  mounted() {
    console.log("pointListM", this.pointList);
    this._add()
  },
  beforeDestroy() {
    this._remove()
  },
  methods: {
    deferredMountedTo(parent) {
      this.parent = parent
      this.mapObject.addTo(parent);
    },
    _remove() {
      this.parent.removeLayer(this.mapObject)
    },
    _add() {
      this.mapObject = L.canvasLayer()
        .delegate(this);

      if (this.$parent._isMounted) {
        this.deferredMountedTo(this.$parent.mapObject)
      }
    },
    onDrawLayer: function(info) {
      var ctx = info.canvas.getContext('2d');
      ctx.clearRect(0, 0, info.canvas.width, info.canvas.height);
      ctx.fillStyle = "rgba(255,116,0,0.4)";
      for (var i = 0; i < this.pointList.length; i++) {
        var d = this.pointList[i];
        if (info.bounds.contains([d.lat, d.lon])) {
          let dot = info.layer._map.latLngToContainerPoint([d.lat, d.lon]);
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.closePath();
        }
      }
    },
  }
}
</script>
