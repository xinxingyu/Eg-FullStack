<template>
    <div class="panel"><h2>我跳转了{{count}}次</h2>{{msg}}
        <div style="height:200px;width:200px;">
            <qq-map></qq-map>
        </div>
        <div style="height:200px;width:200px;">
            <line-chart :options="options"></line-chart>
        </div>
    </div>
</template>
<script>
import qqMap from 'components/maps/qqMap.vue'
import lineChart from 'components/charts/line.vue'
export default {
    name: 'a',
    components: {
        qqMap,
        lineChart
    },
    computed: {
        count(){
            return this.$store.getters.getCount;
        }
    },
    data () {
        return {
            msg: 'Welcome to Your Vue.js App , this is aaa view',
            options: {
                title: {
                    text: '折线图堆叠'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['周一','周二','周三','周四','周五','周六','周日']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name:'邮件营销',
                        type:'line',
                        stack: '总量',
                        data:[120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name:'联盟广告',
                        type:'line',
                        stack: '总量',
                        data:[220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name:'视频广告',
                        type:'line',
                        stack: '总量',
                        data:[150, 232, 201, 154, 190, 330, 410]
                    },
                    {
                        name:'直接访问',
                        type:'line',
                        stack: '总量',
                        data:[320, 332, 301, 334, 390, 330, 320]
                    },
                    {
                        name:'搜索引擎',
                        type:'line',
                        stack: '总量',
                        data:[820, 932, 901, 934, 1290, 1330, 1320]
                    }
                ]
            }
        }
    }
}
</script>
<style lang="less">
h2{
    color: red;
}
</style>
