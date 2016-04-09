Ext.define('grapheye.view.main.Export', {
    extend: 'Ext.panel.Panel',
    xtype: 'mainexport',

    requires: [
        'grapheye.view.main.MainController'
    ],

    controller: 'main',
    title: 'Export',
    closable: false,
    autoShow: true,

    items: [{
        xtype: 'textfield',
        id: 'exportdestination',
        fieldLabel: 'Enter export destination',
        allowBlank: false
    }],
    buttons: [{
        text: 'Confirm',
        formBind: true,
        handler: function(){
            var value = Ext.getCmp('exportdestination').getValue();
            console.log(value) // well received
        }
    }]
});
