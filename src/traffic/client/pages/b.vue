<template>
    <div><h2>我跳转了{{count}}次</h2>{{msg}}
        <div style="height:300px;width:300px;">
            <line-chart :options="options"></line-chart>
        </div>
    </div>
</template>
<script>
import lineChart from 'components/charts/line.vue';
import { mapState } from 'vuex'
export default {
    name: 'b',
    components: {
        lineChart
    },
    computed: {
        count(){
            return this.$store.getters.getCount;
        },
		...mapState({
			// 箭头函数可使代码更简练
			count: state => state.count,

			// 传字符串参数 'count' 等同于 `state => state.count`
			countAlias: 'count',

			// 为了能够使用 `this` 获取局部状态，必须使用常规函数
			countPlusLocalState (state) {
				return state.count + this.localCount
			}
		})
    },
    data () {
        return {
            options: '',
            msg: 'Welcome to Your Vue.js App , this is b view'
        }
    },
    created(){
        this.options = {
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
</script>
