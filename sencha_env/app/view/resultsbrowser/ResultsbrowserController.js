Ext.define('grapheye.view.resultsbrowser.ResultsbrowserController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.resultsbrowser',

    onInit: function(){
	this.onRefresh();
    },

    onRefresh: function() {
	this.lookupReference('rbresultlist').removeAll();
	grapheye.store.Results.results =
	[
{
	    "date": '2016-05-1T03:53+0000',
    "title": 'name1',
    "group": 'group1',
    "data":[{"node":"정윤종","rank":1.551003670818911},
	    {"node":"장영재","rank":1.2934896613776643},
	    {"node":"우재욱","rank":1.0662694425206383},
	    {"node":"김대성","rank":1.0472039833455964},
	    	    {"node":"이자룡","rank":1.0386762841584514},
		    	    {"node":"하현호","rank":0.8121247402523385},
			    	    {"node":"박수영","rank":0.5962712563688575},
				    	    {"node":"안재영","rank":0.5896026051463008}],
					        "error":null,
						    "algorithm":"pagerank"
},
{
	    "date": '2016-05-2T03:53+0000',
	        "title": 'name1',
		    "group": 'group1',
		        "data":[{"node":"정윤종","rank":1.541003670818911},
				    {"node":"장영재","rank":1.2834896613776643},
				    	    {"node":"우재욱","rank":1.0762694425206383},
					    	    {"node":"김대성","rank":1.0572039833455964},
						    	    {"node":"이자룡","rank":1.0586762841584514},
							    	    {"node":"하현호","rank":0.9121247402523385},
								    	    {"node":"박수영","rank":0.6962712563688575},
									    	    {"node":"안재영","rank":0.5996026051463008}],
										        "error":null,
											    "algorithm":"pagerank"
},
{
	    "date": '2016-05-3T03:53+0000',
	        "title": 'name1',
		    "group": 'group1',
		        "data":[{"node":"정윤종","rank":1.531003670818911},
				    {"node":"장영재","rank":1.3934896613776643},
				    	    {"node":"우재욱","rank":1.0542694425206383},
					    	    {"node":"김대성","rank":1.0372039833455964},
						    	    {"node":"이자룡","rank":1.0486762841584514},
							    	    {"node":"하현호","rank":0.9121247402523385},
								    	    {"node":"박수영","rank":0.6962712563688575},
									    	    {"node":"안재영","rank":0.7896026051463008}],
										        "error":null,
											    "algorithm":"pagerank"
},
{
	    "date": '2016-05-4T03:53+0000',
	        "title": 'name1',
		    "group": 'group1',
		        "data":[{"node":"정윤종","rank":1.451003670818911},
				    {"node":"장영재","rank":1.5934896613776643},
				    	    {"node":"우재욱","rank":1.1662694425206383},
					    	    {"node":"김대성","rank":1.0472039833455964},
						    	    {"node":"이자룡","rank":1.0186762841584514},
							    	    {"node":"하현호","rank":0.8121247402523385},
								    	    {"node":"박수영","rank":0.7962712563688575},
									    	    {"node":"안재영","rank":0.8896026051463008}],
										        "error":null,
											    "algorithm":"pagerank"
},
{
	    "date": '2016-05-5T03:53+0000',
	        "title": 'name1',
		    "group": 'group1',
		        "data":[{"node":"정윤종","rank":1.351003670818911},
				    {"node":"장영재","rank":1.4934896613776643},
				    	    {"node":"우재욱","rank":1.1462694425206383},
					    	    {"node":"김대성","rank":1.0472039833455964},
						    	    {"node":"이자룡","rank":1.2386762841584514},
							    	    {"node":"하현호","rank":1.0121247402523385},
								    	    {"node":"박수영","rank":0.9962712563688575},
									    	    {"node":"안재영","rank":0.8896026051463008}],
										        "error":null,
											    "algorithm":"pagerank"
},
{
	    "date": '2016-05-6T03:53+0000',
	        "title": 'name1',
		    "group": 'group1',
		        "data":[{"node":"정윤종","rank":1.251003670818911},
				    {"node":"장영재","rank":1.3934896613776643},
				    	    {"node":"우재욱","rank":1.1662694425206383},
					    	    {"node":"김대성","rank":0.9472039833455964},
						    	    {"node":"이자룡","rank":1.1386762841584514},
							    	    {"node":"하현호","rank":1.0221247402523385},
								    	    {"node":"박수영","rank":1.0362712563688575},
									    	    {"node":"안재영","rank":0.8996026051463008}],
										        "error":null,
											    "algorithm":"pagerank"
},
{
	    "date": '2016-05-7T03:53+0000',
	        "title": 'name1',
		    "group": 'group1',
		        "data":[{"node":"정윤종","rank":0.981003670818911},
				    {"node":"장영재","rank":1.3334896613776643},
				    	    {"node":"우재욱","rank":0.9662694425206383},
					    	    {"node":"김대성","rank":1.0072039833455964},
						    	    {"node":"이자룡","rank":1.0986762841584514},
							    	    {"node":"하현호","rank":1.0221247402523385},
								    	    {"node":"박수영","rank":0.9962712563688575},
									    	    {"node":"안재영","rank":0.89896026051463008}],
										        "error":null,
											    "algorithm":"pagerank"
},
{
	    "date": '2016-05-8T03:53+0000',
	        "title": 'name1',
		    "group": 'group1',
		        "data":[{"node":"정윤종","rank":0.881003670818911},
				    {"node":"장영재","rank":1.1834896613776643},
				    	    {"node":"우재욱","rank":0.9462694425206383},
					    	    {"node":"김대성","rank":1.0172039833455964},
						    	    {"node":"이자룡","rank":1.0186762841584514},
							    	    {"node":"하현호","rank":1.2021247402523385},
								    	    {"node":"박수영","rank":1.0962712563688575},
									    	    {"node":"안재영","rank":0.9096026051463008}],
										        "error":null,
											    "algorithm":"pagerank"
},
{
	    "date": '2016-05-9T03:53+0000',
	        "title": 'name1',
		    "group": 'group1',
		        "data":[{"node":"정윤종","rank":0.761003670818911},
				    {"node":"장영재","rank":0.8834896613776643},
				    	    {"node":"우재욱","rank":0.9362694425206383},
					    	    {"node":"김대성","rank":1.0172039833455964},
						    	    {"node":"이자룡","rank":1.0086762841584514},
							    	    {"node":"하현호","rank":1.3221247402523385},
								    	    {"node":"박수영","rank":1.0062712563688575},
									    	    {"node":"안재영","rank":0.8996026051463008}],
										        "error":null,
											    "algorithm":"pagerank"
},
{
	    "date": '2016-05-12T03:53+0000',
	        "title": 'name1',
		    "group": 'group1',
		        "data":[{"node":"정윤종","rank":0.541003670818911},
				    {"node":"장영재","rank":0.6734896613776643},
				    	    {"node":"우재욱","rank":0.9462694425206383},
					    	    {"node":"김대성","rank":1.0272039833455964},
						    	    {"node":"이자룡","rank":1.0286762841584514},
							    	    {"node":"하현호","rank":1.5221247402523385},
								    	    {"node":"박수영","rank":0.9862712563688575},
									    	    {"node":"안재영","rank":1.0096026051463008}],
										        "error":null,
											    "algorithm":"pagerank"
}
	];
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
    getData: function(){
	var resultData=
	[
	{
		    "date": '2016-05-1T03:53+0000',
		        "title": 'name1',
			    "group": 'group1',
			        "data":[{"node":"정윤종","rank":1.551003670818911},
					    {"node":"장영재","rank":1.2934896613776643},
					    	    {"node":"우재욱","rank":1.0662694425206383},
						    	    {"node":"김대성","rank":1.0472039833455964},
							    	    {"node":"이자룡","rank":1.0386762841584514},
								    	    {"node":"하현호","rank":0.8121247402523385},
									    	    {"node":"박수영","rank":0.5962712563688575},
										    	    {"node":"안재영","rank":0.5896026051463008}],
											        "error":null,
												    "algorithm":"pagerank"
	},
	{
		    "date": '2016-05-2T03:53+0000',
		        "title": 'name1',
			    "group": 'group1',
			        "data":[{"node":"정윤종","rank":1.541003670818911},
					    {"node":"장영재","rank":1.2834896613776643},
					    	    {"node":"우재욱","rank":1.0762694425206383},
						    	    {"node":"김대성","rank":1.0572039833455964},
							    	    {"node":"이자룡","rank":1.0586762841584514},
								    	    {"node":"하현호","rank":0.9121247402523385},
									    	    {"node":"박수영","rank":0.6962712563688575},
										    	    {"node":"안재영","rank":0.5996026051463008}],
											        "error":null,
												    "algorithm":"pagerank"
	},
	{
		    "date": '2016-05-3T03:53+0000',
		        "title": 'name1',
			    "group": 'group1',
			        "data":[{"node":"정윤종","rank":1.531003670818911},
					    {"node":"장영재","rank":1.3934896613776643},
					    	    {"node":"우재욱","rank":1.0542694425206383},
						    	    {"node":"김대성","rank":1.0372039833455964},
							    	    {"node":"이자룡","rank":1.0486762841584514},
								    	    {"node":"하현호","rank":0.9121247402523385},
									    	    {"node":"박수영","rank":0.6962712563688575},
										    	    {"node":"안재영","rank":0.7896026051463008}],
											        "error":null,
												    "algorithm":"pagerank"
	},
	{
		    "date": '2016-05-4T03:53+0000',
		        "title": 'name1',
			    "group": 'group1',
			        "data":[{"node":"정윤종","rank":1.451003670818911},
					    {"node":"장영재","rank":1.5934896613776643},
					    	    {"node":"우재욱","rank":1.1662694425206383},
						    	    {"node":"김대성","rank":1.0472039833455964},
							    	    {"node":"이자룡","rank":1.0186762841584514},
								    	    {"node":"하현호","rank":0.8121247402523385},
									    	    {"node":"박수영","rank":0.7962712563688575},
										    	    {"node":"안재영","rank":0.8896026051463008}],
											        "error":null,
												    "algorithm":"pagerank"
	},
	{
		    "date": '2016-05-5T03:53+0000',
		        "title": 'name1',
			    "group": 'group1',
			        "data":[{"node":"정윤종","rank":1.351003670818911},
					    {"node":"장영재","rank":1.4934896613776643},
					    	    {"node":"우재욱","rank":1.1462694425206383},
						    	    {"node":"김대성","rank":1.0472039833455964},
							    	    {"node":"이자룡","rank":1.2386762841584514},
								    	    {"node":"하현호","rank":1.0121247402523385},
									    	    {"node":"박수영","rank":0.9962712563688575},
										    	    {"node":"안재영","rank":0.8896026051463008}],
											        "error":null,
												    "algorithm":"pagerank"
	},
	{
		    "date": '2016-05-6T03:53+0000',
		        "title": 'name1',
			    "group": 'group1',
			        "data":[{"node":"정윤종","rank":1.251003670818911},
					    {"node":"장영재","rank":1.3934896613776643},
					    	    {"node":"우재욱","rank":1.1662694425206383},
						    	    {"node":"김대성","rank":0.9472039833455964},
							    	    {"node":"이자룡","rank":1.1386762841584514},
								    	    {"node":"하현호","rank":1.0221247402523385},
									    	    {"node":"박수영","rank":1.0362712563688575},
										    	    {"node":"안재영","rank":0.8996026051463008}],
											        "error":null,
												    "algorithm":"pagerank"
	},
	{
		    "date": '2016-05-7T03:53+0000',
		        "title": 'name1',
			    "group": 'group1',
			        "data":[{"node":"정윤종","rank":0.981003670818911},
					    {"node":"장영재","rank":1.3334896613776643},
					    	    {"node":"우재욱","rank":0.9662694425206383},
						    	    {"node":"김대성","rank":1.0072039833455964},
							    	    {"node":"이자룡","rank":1.0986762841584514},
								    	    {"node":"하현호","rank":1.0221247402523385},
									    	    {"node":"박수영","rank":0.9962712563688575},
										    	    {"node":"안재영","rank":0.89896026051463008}],
											        "error":null,
												    "algorithm":"pagerank"
	},
	{
		    "date": '2016-05-8T03:53+0000',
		        "title": 'name1',
			    "group": 'group1',
			        "data":[{"node":"정윤종","rank":0.881003670818911},
					    {"node":"장영재","rank":1.1834896613776643},
					    	    {"node":"우재욱","rank":0.9462694425206383},
						    	    {"node":"김대성","rank":1.0172039833455964},
							    	    {"node":"이자룡","rank":1.0186762841584514},
								    	    {"node":"하현호","rank":1.2021247402523385},
									    	    {"node":"박수영","rank":1.0962712563688575},
										    	    {"node":"안재영","rank":0.9096026051463008}],
											        "error":null,
												    "algorithm":"pagerank"
	},
	{
		    "date": '2016-05-9T03:53+0000',
		        "title": 'name1',
			    "group": 'group1',
			        "data":[{"node":"정윤종","rank":0.761003670818911},
					    {"node":"장영재","rank":0.8834896613776643},
					    	    {"node":"우재욱","rank":0.9362694425206383},
						    	    {"node":"김대성","rank":1.0172039833455964},
							    	    {"node":"이자룡","rank":1.0086762841584514},
								    	    {"node":"하현호","rank":1.3221247402523385},
									    	    {"node":"박수영","rank":1.0062712563688575},
										    	    {"node":"안재영","rank":0.8996026051463008}],
											        "error":null,
												    "algorithm":"pagerank"
	},
	{
		    "date": '2016-05-12T03:53+0000',
		        "title": 'name1',
			    "group": 'group1',
			        "data":[{"node":"정윤종","rank":0.541003670818911},
					    {"node":"장영재","rank":0.6734896613776643},
					    	    {"node":"우재욱","rank":0.9462694425206383},
						    	    {"node":"김대성","rank":1.0272039833455964},
							    	    {"node":"이자룡","rank":1.0286762841584514},
								    	    {"node":"하현호","rank":1.5221247402523385},
									    	    {"node":"박수영","rank":0.9862712563688575},
										    	    {"node":"안재영","rank":1.0096026051463008}],
											        "error":null,
												    "algorithm":"pagerank"
	}
	];
	return resultData;
    },
    onCompare: function() {
	var dataSet = this.getData();
	console.log(dataSet);
	console.log(this.lookupReference('linePanel'));
	this.lookupReference('linePanel').removeAll();
	this.lookupReference('linePanel').add(
	    Ext.create({
		xtype: 'chartcontainer',
		resultData: dataSet,
		chartType: 'line'
	    }));
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
