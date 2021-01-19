import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as $ from 'jquery';
import * as Highcharts from 'highcharts';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public list: any[] = [];
    public search: any;
    public all: boolean = false;
    public Name: string;
    public January: any;
    public February: any;
    public March: any;
    constructor(public http: HttpClient) { }
    title = 'AngularAPI';


    ngOnInit() {
        // let api = "https://localhost:44371/api/Users";
        // this.http.get(api).subscribe((Response: any) => {
        //   this.list = Response;
        //   debugger;
        //   console.log(this.list);
        // })
        let _this = this;
        $.ajax({
            url: "https://localhost:44371/api/Users",
            type: "get",
            success: function (data) {
                var jsondata = JSON.parse(data);
                // debugger;
                _this.list = jsondata;
            }
        })
        $.ajax({
            url: "https://localhost:44371/api/Users/GetHighcharts",
            type: "get",
            success: function (data) {
                //console.log(data);
                var jsondata = JSON.parse(data);
                //console.log(jsondata);
                var options1 = {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: '图表'
                    },
                    xAxis: {
                        categories: ['一月', '二月', '三月'],
                        crosshair: true
                    },
                    yAxis: {
                        title: {
                            text: '-------------'
                        }
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:10">{series.name}: </td>' +
                            '<td style="padding:10"><b>{point.y:.1f} </b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                    },
                    series: jsondata
                };
                var chart1 = Highcharts.chart('container1', options1);
            }
        });
        $.ajax({
            url: "https://localhost:44371/api/Users/GetPieHighcharts",
            type: "get",
            success: function (data) {
                //console.log(data);
                var jsondata = [{name:"美国",y:23},{name:"英国",y:10},{name:"中国",y:32},{name:"日本",y:13}];
                console.log(jsondata);
                debugger;
                var options2 = {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: '2018年1月浏览器市场份额'
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    series:[{name:'Brands',data:jsondata}]
                };
                var chart2 = Highcharts.chart('container2', options2);
            }
        })
    }
    Del(id) {
        var param = { "Id": id };
        $.ajax({
            url: "https://localhost:44371/api/Users",
            type: "Delete",
            data: param,
            success: function (data) {
                alert("成功删除数据");
                window.location.reload();
            }
        })
        // const httpOptions = { headers: new HttpHeaders ({'Content-Type':'application/json'})}
        // let api="https://localhost:44371/api/Users/"+id;
        // this.http.delete(api).subscribe((Response: any) => {
        //   alert('删除成功')
        // })
    }
    Insert() {
        var param = { "Name": this.Name, "January": parseInt(this.January, 10), "February": parseInt(this.February, 10), "March": parseInt(this.March, 10) };
        if (this.Name == undefined || this.January == undefined || this.February == undefined || this.March == undefined) {
            alert("输入框不能为空")
        }
        else {
            $.ajax({
                url: "https://localhost:44371/api/Users",
                type: "post",
                data: param,
                success: function (data) {
                    alert("成功添加数据");
                    window.location.reload();
                }
            })
            this.all = false;
        }
    }
    UpdateHide(id) {
        $(".span-" + id).hide();
        $(".but-" + id).hide();
        $(".button-" + id).show();
        $("#Name-" + id).show();
        $("#January-" + id).show();
        $("#February-" + id).show();
        $("#March-" + id).show();
        $.ajax({
            url: "https://localhost:44371/api/Users/GetMonthDatagetByCountryId?id=" + id,
            type: "get",
            success: function (data) {
                var jsondata = JSON.parse(data);
                $("#January-" + id).val(jsondata[0].January);
                $("#February-" + id).val(jsondata[0].February);
                $("#March-" + id).val(jsondata[0].March);
            }
        })
        this.all = true;
    }
    Update(id) {
        var january = $("#January-" + id).val();
        var february = $("#February-" + id).val();
        var march = $("#March-" + id).val();
        var param = { "Id": id, "January": parseInt(january, 10), "February": parseInt(february, 10), "March": parseInt(march, 10) };
        if (january == "" || february == "" || march == "") {
            alert("输入框不能有空")
        }
        else {
            $.ajax({
                url: "https://localhost:44371/api/Users",
                type: "Put",
                data: param,
                success: function (data) {
                    alert("成功修改数据");
                    window.location.reload();
                }
            })
        }
    }
    UpdateCancel(id) {
        $(".span-" + id).show();
        $(".but-" + id).show();
        $(".button-" + id).hide();
        $("#Name-" + id).hide();
        $("#January-" + id).hide();
        $("#February-" + id).hide();
        $("#March-" + id).hide();
        this.all = false;
    }
    searchdata() {
        let _this = this;
        $.ajax({
            url: "https://localhost:44371/api/Users/GetSearch?name=" + this.search,
            type: "get",
            success: function (data) {
                var jsondata = JSON.parse(data);
                _this.list = jsondata;
                $.ajax({
                    url: "https://localhost:44371/api/Users/GetSearchHighcharts?name=" + _this.search,
                    type: "get",
                    success: function (data) {
                        //console.log(data);
                        var jsondata = JSON.parse(data);
                        //console.log(jsondata);
                        var options = {
                            chart: {
                                type: 'column'
                            },
                            title: {
                                text: '图表'
                            },
                            xAxis: {
                                categories: ['一月', '二月', '三月'],
                                crosshair: true
                            },
                            yAxis: {
                                title: {
                                    text: '-------------'
                                }
                            },
                            tooltip: {
                                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                                pointFormat: '<tr><td style="color:{series.color};padding:10">{series.name}: </td>' +
                                    '<td style="padding:10"><b>{point.y:.1f} </b></td></tr>',
                                footerFormat: '</table>',
                                shared: true,
                                useHTML: true
                            },
                            series: jsondata
                        };
                        var chart = Highcharts.chart('container', options);
                    }
                })
            }
        })
    }
}
