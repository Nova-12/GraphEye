/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('grapheye.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',

        'grapheye.view.main.MainController',
        'grapheye.view.main.MainModel',
        'grapheye.view.main.Import',
        'grapheye.view.main.Algorithms',
        'grapheye.view.main.Export'
    ],

    controller: 'main',
    viewModel: 'main',
    plugins: 'viewport',

    ui: 'navigation',

    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,

    header: {
        layout: {
            align: 'stretchmax'
        },
        title: {
            bind: {
                text: '{name}'
            },
            flex: 0
        },
        iconCls: 'fa-th-list'
    },

    tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },

    responsiveConfig: {
        tall: {
            headerPosition: 'top'
        },
        wide: {
            headerPosition: 'left'
        }
    },

    defaults: {
        bodyPadding: 20,
        tabConfig: {
            plugins: 'responsive',
            responsiveConfig: {
                wide: {
                    iconAlign: 'left',
                    textAlign: 'left'
                },
                tall: {
                    iconAlign: 'top',
                    textAlign: 'center',
                    width: 120
                }
            }
        }
    },

    items: [{
        title: 'Import',
        iconCls: 'fa-home',
        // The following grid shares a store with the classic version's grid as well!
        items: [{
            xtype: 'mainimport'
        }]
    }, {
        title: 'Algorithms',
        iconCls: 'fa-users',
        items: [{
            xtype: 'mainalgorithms'
        }]
    }, {
        title: 'Export',
        iconCls: 'fa-home',
        items: [{
            xtype: 'mainexport'
        }]
    }, {
        title: 'Visualize',
        iconCls: 'fa-cog',
        items: [{
            xtype: 'button',
            text: 'Run',
            margin: '10 0',
            handler: 'onRunClick'
        }, {
	    region: 'center',
	    xtype: 'tabpanel',
	    reference: 'visualPanel',
	    items:[
	    ]
        }, {
            xtype: 'button',
            text: 'Visualize',
            margin: '10 0',
            handler: 'onVisualizeClick'
        }]
    }]
});
