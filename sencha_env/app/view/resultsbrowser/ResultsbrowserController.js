Ext.define('grapheye.view.resultsbrowser.ResultsbrowserController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.resultsbrowser',

    onInit: function(){
	this.onRefresh();
    },

    onRefresh: function() {
	this.lookupReference('rbresultlist').removeAll();
	/*grapheye.store.Results.results =
	[
	{
	    "date": new Date(),
	    "title": 'name1',
	    "group": 'group1',
	    "data":[{"node":"안재영","rank":0.5896026051463008},{"node":"박수영","rank":0.5962712563688575},{"node":"하현호","rank":0.8121247402523385},{"node":"이자룡","rank":1.0386762841584514},{"node":"김대성","rank":1.0472039833455964},{"node":"우재욱","rank":1.0662694425206383},{"node":"장영재","rank":1.2934896613776643},{"node":"정윤종","rank":1.551003670818911}],
	    "error":null,
	    "algorithm":"pagerank"
	}
	];*/
	var results = grapheye.store.Results.results;
	var i;
	var me = this;
	for(i = 0; i<results.length; i++)
	{
	    var title = results[i].title;
	    var data = results[i];
	    var buttonName = 'Date: {0}______Name: {1}______Group: {2}';
	    console.log(Ext.String.format(buttonName, results[i].date.toString(), title, results[i].group));
	    var result = Ext.create('Ext.Button',
		    {
			text: Ext.String.format(buttonName, results[i].date.toString(), title, results[i].group),
			index: i,
			handler: function () {
				me.onClick(this.index);
		    		}
		    });
	    this.lookupReference('rbresultlist').add(result);
	    console.log("this1 = ");
	    console.log(this);
	}
    },

    onClick: function(i) {
	var results = grapheye.store.Results.results;
	var ctitle = results[i].title;
	this.view.up('container').lookupReference('rbCharts').removeAll();
	this.view.up('container').lookupReference('rbCharts').add(
	    Ext.create({
		xtype: 'D3HorizontalBarChart',
	    	title: ctitle,
		width: '100%',
		height: 400,
		resultData: results[i],
		dataUrl: 'resources/testdata/donutdata.json',
		chartTitle: '',
		showTotal: true
	    }));
    }

});
