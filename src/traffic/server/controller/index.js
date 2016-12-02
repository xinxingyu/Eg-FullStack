// var request = require('request');

module.exports = {
    index: function* (ctx) {
            yield this.render('traffic', {
                "title": "滴滴交通运行指数平台",
                "contextPath": "traffic"
            });
        }
        // route_broker_proxy: function *() {
        //     // use new route_plan
        //     var url = 'http://100.69.187.40:8080/route_broker_proxy?pid=&ip=map-traffic-routeplan00.gz01&port=9190&strategy=0&' +
        //         'startPoint=' + this.query.startPoint + '&' + 'endPoint=' + this.query.endPoint;
        //     this.body = yield new Promise (function (resolve) {
        //         request.get({url: url}, function (err, response, body) {
        //             if(err || response.statusCode !== 200){
        //                 resolve(err || response.statusCode);
        //             }else{
        //                 resolve(body);
        //             }
        //         });
        //     });
        // },
        // linkid_with_node: function *() {
        //     var options = {
        //         url: 'http://100.69.187.40:8080/link_query/linkid_with_node',
        //         method: 'POST',
        //         headers: {
        //             "Content-Type": 'application/x-www-form-urlencoded',
        //         },
        //         form: this.request.body
        //     };
        //     this.body = yield new Promise (function (resolve) {
        //         request(options, function (err, response, body) {
        //             if(err || response.statusCode !== 200){
        //                 resolve(err || response.statusCode);
        //             }else{
        //                 resolve(body);
        //             }
        //         });
        //     })
        // }
}
