//noinspection JSUnusedLocalSymbols
/**
 * Created by JetBrains WebStorm.
 * User: Joshua McDonald
 * To change this template use File | Settings | File Templates.
 */
Ext.define('grapheye.view.chart.D3TimeLineChart', {

    extend          : 'Ext.panel.Panel',
    xtype: 'D3TimeLineChart',
    dataUrl         : '',                       // url of json data for the chart, json should be in the
    // following format, label and value are required, any attached
    // data points will get passed to the click event i.e. primary keys etc .. :

    //{'results': 6, 'data':[{'some_value': 'not required', 'label': 'Required', 'value': 17}

    localData       : '',                       // placeholder so that data can be stored for faster resize
    layout          : 'fit',
    chartTitle      : '',                       // chart title displayed above the chart
    tooltipAppend   : '',                       // text to append to the tooltip value
    alias           : 'widget.D3TimeLineChart',
    showTooltips    : true,
    showControls    : false,
    showSeriesLegend: false,
    seriesTitle     : '',
    valueFormat     : 'float',                    // takes int, currency, float (two decimal places)
    barColor        : '#4f99b4',
    nodeNum	    : 0,

    dataSet  	    : [],

    initComponent : function(){

        this.on({
            resize:function(me){
                me.refreshSize(me,this.getSize().width,this.getSize().height);
            }
        });

        Ext.applyIf(this,{
            plain   : true,
            layout  : 'fit',
            html    : '<linechart></linechart>',
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
	console.log(record);

       // console.log(record);

    },

    drawChart: function(me, width, height){

        if(me.dataSet.length > 0){
            if(me.localData == ''){
                /*
                 Done to ensure that the standard JSON that
                 is used with extjs does not trip up teh json decode that
                 D3.js does.
                 */
		console.log("Data Set = ");
		console.log(me.dataSet);
		var singleKeyFormat = formatData(me.dataSet, me.nodeNum);
		me.localData = singleKeyFormat;
		console.log("Formatted Data = ");
		console.log(me.localData);
		setupChart(me.localData);
            } else {
                setupChart(me.localData);
            }
        } else {
            throw 'dataUrl is required';
        }

        function formatData(rawData, nodeNum){
	    var i;
	    var j;
	    var formattedData = [];
	    console.log("formatting data");
	    for (i = 0; i<nodeNum; i++)
	    {
	        formattedData.push(
		    	        {
		                    'values': [],
		    		    'key': rawData[0].data[i].node
		    		    //'color': '#ff7f0e'
			        }
			        );
	        for (j = 0; j<rawData.length; j++)
	        {
		    formattedData[i].values.push({'x': rawData[j].date, 'y': rawData[j].data[i].rank});
	        }
	    }
	    return formattedData;
        }

        function setupChart(data){
	    var givenDateString = d3.time.format('%Y-%m-%dT%H:%M%Z');
	    var formatDate = d3.time.format("%b %d");
	    var date = givenDateString.parse('2016-05-01T03:53+0000');
	    console.log(date);
            var formatString = d3.format('d');

            switch (me.valueFormat){
                case 'float':
                    formatString = d3.format(',.2f');
                    break;
                case 'currency':
                    formatString = d3.format('$,.2f');
                    break;
            }

            var selector = "#" + me.getId().toString() + " linechart svg";
	
            d3.select(selector).remove();
            selector = "#" + me.getId().toString() + " linechart";

            d3.select(selector).append("svg")
                .attr("width", width)
                .attr("height", height - 35);

            selector = "#" + me.getId().toString() + " linechart svg";
            var chart = nv.models.lineChart()
                .x(function(d) {
                    return givenDateString.parse(d.x);
                })
                .y(function(d) {
		    return d.y;
                })
                .margin({top: 30, right: 120, bottom: 50, left: 120})
		.useInteractiveGuideline(true)
                //.showValues(true)           //Show bar value next to each bar.
                //.tooltips(me.showTooltips)             //Show tooltips on hover.
		.showLegend(true)
		.showYAxis(true)
		.showXAxis(true)
                .transitionDuration(350)
                //.showControls(me.showControls);        //Allow user to switch between "Grouped" and "Stacked" mode.

            //chart.valueFormat(formatString);
	    chart.xAxis
		.axisLabel('Date')
		//.tickFormat(function(d) {return d3.time.format('%b %d')(new Date(d));})
		//.tickFormat(function(d) {return formatDate(givenDateString.parse(d));});
		.tickFormat(function(d) {return formatDate(new Date(d));});
            chart.yAxis
                .tickFormat(formatString);

            d3.select(selector)
                .datum(data)
                .call(chart);
	    d3.selectAll("#" + me.getId().toString() + " linechart svg .nv-line")
		.on('click', function(d){
		    me.onChartClick(d);
	    });
	    /*
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
	    */
        }
    }
});
