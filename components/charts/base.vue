<script>
var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/line');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

export default {
    name: 'base-chart',
    template: '<div :id="uuid" class="qqmap-component" :style="{ height: height, width: width}"></div>',
    data(){
        return {
            uuid: 'base-chart-' + Math.random().toString(36).substring(3, 8), //组件唯一标识
        }
    },
    props:{
        width: {
            type: [ Number, String],
            default: '100%'
        },
        height: {
            type: [ Number, String],
            default: '100%'
        },
        type: {
            type: String,
            default: 'line'
        },
        options: {
            type: Object
        }
    },
    mounted(){
        this.initChart();
    },
    methods: {
        initChart(){
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById(this.uuid));
            // 绘制图表
            myChart.setOption(this.options);
        }
    }
}
</script>
