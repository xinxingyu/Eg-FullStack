<template>
    <div :id="uuid" class="qqmap-component" :style="{ height: height, width: width}"></div>
</template>
<script>
export default{
    name: 'qqmap',
    data(){
        return {
            uuid: 'qqmap-' + Math.random().toString(36).substring(3, 8), //组件唯一标识
            Map: ''
        }
    },
    props: {
        height: {
            type: [String, Number],
            default: '100%'
        },
        width: {
            type: [String, Number],
            default: '100%'
        },
        zoom: {
            type: Number,
            default: 12
        },
        center: {
            type: Object,
            default(){
                return {
                    x: 39.914850,
                    y: 116.403765
                }
            }

        }
    },
    mounted(){
        var _this = this;
        this.initScript();
        this.initMap();
    },
    methods: {
        initScript(){
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = "http://map.qq.com/api/js?v=2.exp&callback=qqmapScriptCallback&key=J7DBZ-FQU6D-SK54M-HFGR5-DZIWF-CLFNA";
            document.body.appendChild(script);
        },
        initMap(){
            var _this = this;
            window.qqmapScriptCallback = function(){
                _this.Map = new qq.maps.Map(document.getElementById(_this.uuid));
                _this.Map.panTo(new qq.maps.LatLng(_this.center.x, _this.center.y));
                _this.Map.zoomTo(_this.zoom);
            }
        }
    }
}
</script>
<style lang="less">

</style>
