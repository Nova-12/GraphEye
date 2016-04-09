/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('grapheye.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',
    onItemSelected: function (sender, record) {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },
    jobStatus	: null,
    jsonResult  : '',
    jobID	: '',
    jsonStatus  : null,

    onRunClick: function () {
	var me = this;
	var jsonResult;
        var jobId;
	var jsonStatus;
	var jobStatus = "running";
        console.log(grapheye.store.Request.exportDestination);
        console.log(grapheye.store.Request.algorithmName);
        var jsonRequest = 
        {
            "input": {
                "type": grapheye.store.Request.importType,
                "edge": grapheye.store.Request.importEdgeFile,
                "node": grapheye.store.Request.importNodeFile
            },
                "algorithm": grapheye.store.Request.algorithmName,
                "params": null,
                "output": grapheye.store.Request.exportDestination
        };
        console.log(jsonRequest);
        Ext.Ajax.request({

            url:"api/launch",
            method:"POST",
	    jsonData: jsonRequest,

            success:function(result, request){
                //console.log(result);
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
		if (me.jobStatus == "running" || me.jobStatus == null)
		{
		    me.onJobFinish();
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
		    console.log("Result fetched from MongoDB: ");
		    console.log(jsonResult);
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
	    if (jsonResult.error == null)
	    {
    	        me.lookupReference('visualPanel').add(
               	    Ext.create({
        	        xtype: 'D3HorizontalBarChart',
        	        title: 'Horizontal Bar Chart',
        	        width: 600,
        	        height: 400,
		        resultData: jsonResult,
        	        dataUrl: 'resources/testdata/donutdata.json',
        	        chartTitle: 'PageRank',
        	        showTotal: true
        	    }));
	    }
    }
});
