Ext.define('grapheye.view.resultsbrowser.ResultsbrowserController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.resultsbrowser',

    onInit: function(){
	this.onRefresh();
    },
    showChart:function(){
	var results = [];
	var resultlist = this.view.up('container').lookupReference('rbresultlist');
	if (resultlist.getSelectionModel().hasSelection()) {
	    var row = resultlist.getSelectionModel().getSelection()[0];
	    this.prepareChart(row.data);
	}
    },
    compareResults:function(){
	var results = [];
	var resultlist = this.view.up('container').lookupReference('rbresultlist');
	if (resultlist.getSelectionModel().hasSelection()) {
	    var rows = resultlist.getSelectionModel().getSelection();
	    var i;
	    for(i = 0; i < rows.length; i++){
	    	results.push(rows[i].data);
	    }
	    this.prepareLineChart(results, []);
	}
    },

    onRefresh: function() {
    },

    prepareChart: function(resultItem) {
	var me = this;
	var jobID = resultItem.jobid;
	var urlString = "api/result/" + jobID;
	var resultData;
	Ext.Ajax.request({
	    url:urlString,
	    method:"GET",
	    success: function(result, request){
		resultData = Ext.JSON.decode(result.responseText);
		me.createChart(resultData);
		//grapheye.store.Results.results.push(jsonResult); Caching purpose
	    },
	    failure: function(result, request){
		Ext.Msg.alert("Result Fetch Failed");
	    }
	});
    },
    
    prepareLineChart: function(results, data) {
	var me = this;
	var jobID = results[data.length].jobid;
	var urlString = "api/result/" + jobID;
	var resultData;
	Ext.Ajax.request({
	    url:urlString,
	    method:"GET",
	    success: function(result, request){
		resultData = Ext.JSON.decode(result.responseText);
		data.push(resultData)
		if (data.length < results.length){
		    me.prepareLineChart(results, data);
		}
		else{
		    me.createLineChart(data);
		}
	    },
	    failure: function(result, request){
		Ext.Msg.alert("Result Fetch Failed");
	    }
	});
    },

    createChart: function(resultData) {
	var title = resultData.title;
	this.view.up('container').lookupReference('rbCharts').removeAll();
	this.view.up('container').lookupReference('rbCharts').add(
	    Ext.create({
		xtype: 'D3HorizontalBarChart',
	    	title: title,
		width: '100%',
		height: 400,
		resultData: resultData,
		dataUrl: 'resources/testdata/donutdata.json',
		chartTitle: '',
		showTotal: true
	    }));
    },

    createLineChart: function(dataSet) {
	this.view.up('container').lookupReference('linePanel').removeAll();
	this.view.up('container').lookupReference('linePanel').add(
	    Ext.create({
		xtype: 'chartcontainer',
		resultData: dataSet,
		chartType: 'line'
	    }));
    }

});
