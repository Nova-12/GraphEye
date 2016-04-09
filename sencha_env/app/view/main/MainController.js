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

    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    },

    onClickButton: function () {
        // Remove the localStorage key/value
        localStorage.removeItem('TutorialLoggedIn');

        // Remove Main View
        this.getView().destroy();

        // Add the Login Window
        Ext.create({
            xtype: 'login'
        });
    },

    onRunClick: function () {
	var jsonResult;
        Ext.Ajax.request({

            url:"api/result",
            method:"GET",

            success:function(result, request){
                jsonResult = Ext.util.JSON.decode(result.responseText);
                Ext.Msg.alert("Success", "Data return from mongodb" + jsonResult.algorithm);
            },
            failure:function(result, request){
                Ext.Msg.alert("Failed");
            }
        });
	this.lookupReference('visualPanel').add(
	Ext.create({
	    xtype: 'D3HorizontalBarChart',
	    title: 'Horizontal Bar Chart',
	    width: 600,
	    height: 400,
	    dataUrl: 'resources/testdata/donutdata.json',
	    chartTitle: 'PageRank',
	    showTotal: true
	}));
    },

    onLoginClick: function() {

        // This would be the ideal location to verify the user's credentials via
        // a server-side lookup. We'll just move forward for the sake of this example.

        // Set the localStorage value to true
        localStorage.setItem("TutorialLoggedIn", true);

        // Remove Login Window
        this.getView().destroy();

        // Add the main view to the viewport
        Ext.create({
            xtype: 'app-main'
        });

    }
});
