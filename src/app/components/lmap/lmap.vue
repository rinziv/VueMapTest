<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'LMap',
  props: [ 'options' ],
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
    options: function() {
      this._remove()
      this._add()
    }
  },
  mounted () {
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
      this.mapObject = L.d3SvgOverlay(this.drawCallback);
      console.log('overlay', this.mapObject);
      console.log('parent', this.$parent);
      if (this.$parent._isMounted) {
        this.deferredMountedTo(this.$parent.mapObject)
      }
    },
    drawCallback: function(sel, proj){
      var citiesUpd = sel.selectAll('circle').data(this.cities);
      citiesUpd.enter()
        .append('circle')
        .attr('r',function(d){return Math.log2(d.population) - minLogPop + 2;})
        .attr('cx',function(d){return proj.latLngToLayerPoint([d.lat, d.lon]).x;})
        .attr('cy',function(d){return proj.latLngToLayerPoint([d.lat, d.lon]).y;})
        .attr('stroke','black')
        .attr('stroke-width',1)
        .attr('fill', "red");
    }
  }
}
</script>
