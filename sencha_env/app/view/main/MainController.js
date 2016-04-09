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

    onRunClick: function () {
        Ext.Ajax.request({

            url:"api/launch",
            method:"POST",

            // load post json from store.

            success:function(result, request){
                var jsonResult = Ext.util.JSON.decode(result.responseText);
                Ext.Msg.alert("Success", "Algorithm is running: " + jsonResult.algorithm);
            },
            failure:function(result, request){
                Ext.Msg.alert("Failed");
            }
        });
    },

    onStatusClick: function () {
        Ext.Ajax.request({

            url:"api/status/",
            method:"GET",

            success:function(result, request){
                var jsonResult = Ext.util.JSON.decode(result.responseText);
                Ext.Msg.alert("Success", "Current status is: " + jsonResult.status);
            },
            failure:function(result, request){
                Ext.Msg.alert("Failed");
            }
        });
    },

    onVisualizeClick: function () {
        Ext.Ajax.request({

            url:"api/result/",
            method:"GET",

            success:function(result, request){
                var jsonResult = Ext.util.JSON.decode(result.responseText);
                Ext.Msg.alert("Success", "Data return from mongodb: " + jsonResult.algorithm);
            },
            failure:function(result, request){
                Ext.Msg.alert("Failed");
            }
        });
    }
});