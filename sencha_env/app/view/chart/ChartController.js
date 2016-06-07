Ext.define('grapheye.view.chart.ChartController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.chart',

    compare: false,
/*
    constructor: function(){
	console.log("Chart Controller, initialization called");
	this.callParent();
	console.log(this);
	this.onRefresh();
    },
*/
    onRefresh: function() {
	console.log("Refresh called");
	me = this;
	var chartType = this.view.chartType;
	var resultData = this.view.resultData;
	var nodeNum = Number(Ext.getCmp('nodeNum').getValue());
	console.log("node number = ");
	console.log(nodeNum);
	switch(chartType){
	    case 'line':
		me.createLineChart(resultData, nodeNum);
		break;
	    case 'horbar':
		me.createHorbarChart(resultData, nodeNum);
        break;
        case 'topology':
        me.createTopologyChart(resultData, nodeNum);
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
    createHorbarChart: function(resultData, nodeNum){
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
		showTotal: true,
		nodeNum: nodeNum
	    }));
    },
    // input: JSON
    createTopologyChart: function(resultData) {
        var ctitle = resultData.title;
        console.log("before remove");
        this.lookupReference('chartbox').removeAll();
        console.log("after remove");
        this.lookupReference('chartbox').add(
            Ext.create({
                xtype: 'VisTopologyChart',
                title: ctitle,
                width: '100%',
                height: 400,
                resultData: resultData
        }));
    }
});
