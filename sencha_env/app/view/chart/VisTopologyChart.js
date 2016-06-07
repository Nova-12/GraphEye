Ext.define('tempapp.view.main.VisTopologyChart', {

    extend: 'Ext.panel.Panel',
    xtype: 'D3HorizontalBarChart',
    alias: 'widget.D3HorizontalBarChart',

    /* Default values */
    width: '100%',
    height: 400,
    resultData: '{}',
    network: null,

    initComponent : function(){

        this.on({
            resize:function(me){
                me.refreshSize(me,this.getSize().width,this.getSize().height);
            }
        });

        Ext.applyIf(this,{
            plain   : true,
            layout  : 'fit',
            html    : '<topology></topology>',
            border  : false
        });

        this.callParent();
    },

    refreshSize: function(me, width, height){
        me.drawChart(me, width, height)
    },

    drawChart: function(me, width, height){
        var el = document.getElementById(me.getId().toString());
        var topoData = { nodes: me.resultData.node, edges: me.resultData.edge };
        var conf = {
            edges: {
                physics: true,
                smooth: { enabled: false}
            },
            nodes: {
                shape: 'circle',
                scaling: { min: 25, max: 25 }
            },
            layout: {
                improvedLayout: false
            },
            physics: {
                solver: 'barnesHut',
                barnesHut: {
                    gravitationalConstant: -5000,
                    springConstant: 0.02
                }
            }
        };
        if (me.network === null)
            me.network = new vis.Network(el, topoData, conf);
    }
});
