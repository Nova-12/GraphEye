//noinspection JSUnusedLocalSymbols
/**
 * Created by JetBrains WebStorm.
 * User: Joshua McDonald
 * To change this template use File | Settings | File Templates.
 */
Ext.define('tempapp.view.main.D3HorizontalBarChart', {

    extend          : 'Ext.panel.Panel',
    xtype: 'D3HorizontalBarChart',
    dataUrl         : '',                       // url of json data for the chart, json should be in the
    // following format, label and value are required, any attached
    // data points will get passed to the click event i.e. primary keys etc .. :

    //{'results': 6, 'data':[{'some_value': 'not required', 'label': 'Required', 'value': 17}

    localData       : '',                       // placeholder so that data can be stored for faster resize
    layout          : 'fit',
    chartTitle      : '',                       // chart title displayed above the chart
    tooltipAppend   : '',                       // text to append to the tooltip value
    alias           : 'widget.D3HorizontalBarChart',
    showTooltips    : true,
    showControls    : false,
    showSeriesLegend: false,
    seriesTitle     : '',
    valueFormat     : 'float',                    // takes int, currency, float (two decimal places)
    barColor        : '#4f99b4',

    resultData	    : '',

    initComponent : function(){

        this.on({
            resize:function(me){
                me.refreshSize(me,this.getSize().width,this.getSize().height);
            }
        });

        Ext.applyIf(this,{
            plain   : true,
            layout  : 'fit',
            html    : '<horbarchart></horbarchart>',
            border  : false
        });

        this.callParent();
    },

    refreshSize: function(me, width, height){
        me.drawChart(me, width, height)
    },
    /*
     Data includes the full JSON record that is passed
     to the chart slice, not just the key value pair.
     */
    onChartClick: function(record){

       // console.log(record);

    },

    drawChart: function(me, width, height){

        if(me.resultData){
            if(me.localData === ''){
                /*
                 Done to ensure that the standard JSON that
                 is used with extjs does not trip up teh json decode that
                 D3.js does.
                 */
		console.log("result Data = ");
		console.log(me.resultData);
		var singleKeyFormat = [{"key":me.seriesTitle, "color": me.barColor, "values":[]}];
		Ext.Array.each(me.resultData.data, function(item){
		    singleKeyFormat[0].values.push(item);
		});
		singleKeyFormat[0].values.sort(function(a,b) { return b.rank - a.rank});
		me.localData = singleKeyFormat;
		setupChart(me.localData);
            } else {
                setupChart(me.localData);
            }
        } else {
            throw 'result data is required';
        }

        function setupChart(data){

            // Int by default see https://github.com/mbostock/d3/wiki/Formatting for
            // adding additional formats

            var formatString = d3.format('d');

            switch (me.valueFormat){
                case 'float':
                    formatString = d3.format(',.2f');
                    break;
                case 'currency':
                    formatString = d3.format('$,.2f');
                    break;
            }

            var selector = "#" + me.getId().toString() + " horbarchart svg";

            d3.select(selector).remove();
            selector = "#" + me.getId().toString() + " horbarchart";

            d3.select(selector).append("svg")
                .attr("width", width)
                .attr("height", height - 35);

            selector = "#" + me.getId().toString() + " horbarchart svg";

            var chart = nv.models.multiBarHorizontalChart()
                .x(function(d) {
                    return d.node;
                })
                .y(function(d) {
		    switch(me.resultData.algorithm){
			case 'pagerank':
			    return d.rank;
			case 'trianglecount':
			    return d.trianglecount;
			case 'connectedcomponent':
			    return d.labelId;
			case 'labelpropagation':
			    return d.connected;
		    }
                })
                .margin({top: 30, right: 20, bottom: 50, left: 175})
                .showValues(true)           //Show bar value next to each bar.
                .tooltips(me.showTooltips)             //Show tooltips on hover.
                .transitionDuration(350)
                .showControls(me.showControls);        //Allow user to switch between "Grouped" and "Stacked" mode.

            chart.valueFormat(formatString);

            chart.yAxis
                .tickFormat(formatString);

            d3.select(selector)
                .datum(data)
                .call(chart);

            d3.selectAll("#" + me.getId().toString() + " horbarchart svg .nv-bar")
                .on('click', function(d){
                    me.onChartClick(d);
            });

            d3.select(selector)
                .append("text")
                .attr("x", width / 2 )
                .attr("y", 20)
                .attr("text-anchor", "middle")
                .style("font-size", "14px")
                .style("font-weight", "bold")
                .text(me.chartTitle);

            if(!me.showSeriesLegend){
                d3.select("#" + me.getId().toString() + " horbarchart svg .nv-legendWrap").remove();
            }
        }
    }
});
