/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('grapheye.view.dashboard.DashboardController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.dashboard',
    onItemSelected: function (sender, record) {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },
    jobStatus	: null,
    jsonResult  : '',
    jobID	: '',
    jsonStatus  : null,


    onImport: function() {
	var me = this;
	var edgefilepath = Ext.getCmp('edgefilepath').getValue();
	var nodefilepath = Ext.getCmp('nodefilepath').getValue();
	var date = Ext.getCmp('collectiondate').getValue();
	//edgefilepath = edgefilepath.replace('C:\\fakepath\\', '/Users/sypark0614/Desktop/'); //hard-coded
	//nodefilepath = nodefilepath.replace('C:\\fakepath\\', '/Users/sypark0614/Desktop/'); //hard-coded
    grapheye.store.Request.importType = Ext.ComponentQuery.query('[name=sourcetype]')[0].getGroupValue();
	grapheye.store.Request.importEdgeFile = edgefilepath;
	grapheye.store.Request.importNodeFile = nodefilepath;
	grapheye.store.Request.date = date;
	console.log(grapheye.store.Request);
    },

    onAlgChoice: function() {
	var me = this;
	grapheye.store.Request.algorithmName=Ext.ComponentQuery.query('[name=algorithm]')[0].getGroupValue();
	console.log(grapheye.store.Request);
    },

    onRunClick: function () {
	var me = this;
	var jsonResult;
        var jobId;
	var jsonStatus;
	var jobStatus = "running";
        var jsonRequest = 
        {
            "input": {
                "type": grapheye.store.Request.importType,
                "edge": grapheye.store.Request.importEdgeFile,
                "node": grapheye.store.Request.importNodeFile
            },
                "algorithm": grapheye.store.Request.algorithmName,
                "params": null,
                "title": grapheye.store.Request.title,
		"group": grapheye.store.Request.group,
		"date": grapheye.store.Request.date
        };
        Ext.Ajax.request({
            url:"api/launch",
            method:"POST",
	    jsonData: jsonRequest,
            success:function(result, request){
                jobId = Ext.JSON.decode(result.responseText);
		me.jobID = jobId.jobid;
                Ext.Msg.alert("Success", "Algorithm is running: " + me.jobID);
		me.onJobFinish();
            },
            failure:function(result, request){
                Ext.Msg.alert("Failed");
            }
        });
    },

    onJobFinish: function () {
	var jsonStatus;
	var jobStatus;
	var jsonResult;
	var jobId;
	var me = this;
	var urlString = "api/status/" + me.jobID;
	Ext.Ajax.request({
	    url:urlString,
	    method:"GET",
	    success:function(result, request){
                jsonStatus = Ext.JSON.decode(result.responseText);
		me.jobStatus = jsonStatus.status;
		if (me.jobStatus == "running" || me.jobStatus === null)
		{
		    console.log("Waiting for results...");
		    window.setTimeout(function(){me.onJobFinish()}, 1000);
		}
		else
		{
		    me.getResults();
		}
	    },
	    failure:function(result, request){
		Ext.Msg.alert("Failed to get job status");
	    }
	});
    },
    getResults: function() {
	    var me = this;
	    var urlString = "api/result/" + me.jobID;
	    console.log("In else....");
            Ext.Ajax.request({
                url:urlString,
                method:"GET",

                success:function(result, request){
                    var jsonResult = Ext.JSON.decode(result.responseText);
		    me.getChart(jsonResult);
                    Ext.Msg.alert("Success", "Data return from mongodb" + jsonResult.algorithm);
                },
                failure:function(result, request){
                    Ext.Msg.alert("Failed");
                }
            });
    },

    getChart: function(jsonResult) {
	    var me = this;
	    console.log(jsonResult)
	    if (jsonResult.error === null)
	    {
    	        me.lookupReference('visualPanel').add(
               	    Ext.create({
        	        xtype: 'chartcontainer',
        	        reference: 'horbarchart',
		        resultData: jsonResult,
        	        chartType: 'horbar'
        	    }));
	    }
    }
});
