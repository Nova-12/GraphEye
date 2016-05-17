Ext.define('grapheye.view.chart.ChartController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.chart',

    compare: false,

    onInit: function(){
	console.log("Chart Controller, initialization called");
	this.onRefresh();
    },

    onRefresh: function() {
	console.log("Refresh called");
	me = this
	var chartType = this.view.chartType;
	var resultData = this.view.resultData;
	var nodeNum = Number(Ext.getCmp('nodeNum').getValue());
	switch(chartType){
	    case 'line':
		me.createLineChart(resultData, nodeNum);
		break;
	    case 'horbar':
		me.createHorbarChart(resultData);
		break;
	}
    },
    //input: Array of JSON
    createLineChart: function(resultData, nodeNum){
	console.log("creating Line Chart");
	this.lookupReference('chartbox').removeAll();
	this.lookupReference('chartbox').add(
	    Ext.create({
		xtype: 'D3TimeLineChart',
		width: '100%',
		height: 400,
		dataSet: resultData,
		dataUrl: 'resources/testdata/donutdata.json',
		chartTitle: 'Compare',
		showTotal: true,
		nodeNum: nodeNum
	    }));
    },
    //input: JSON
    createHorbarChart: function(resultData){
	var ctitle = resultData.title;
	this.lookupReference('chartbox').removeAll();
	this.lookupReference('chartbox').add(
	    Ext.create({
		xtype: 'D3HorizontalBarChart',
	    	title: ctitle,
		width: '100%',
		height: 400,
		resultData: resultData,
		dataUrl: 'resources/testdata/donutdata.json',
		chartTitle: ctitle,
		showTotal: true
	    }));
    }
});