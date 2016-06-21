sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel", "com/sspu/fioriapp/ControllerOverall", ], function(Controller, JSONModel, ControllerOverall) {
    "use strict";
    var MainController = Controller.extend("com.sspu.fioriapp.Main", {

        //Initially show the content for Page
        onInit: function(oEvent) {
            //setting logo img and css in title
            this.byId("title-bar").addStyleClass('title-bar');
            this.byId("title-text").addStyleClass('title-text');

            // config all data xsjs path
            var callProcedurePath = "./model/callProcedure.xsjs";
            var allDatajsonPath = "./model/jsondata.json";
            var updateDataPath = "./model/updateData.json";
            var formatDataPath = "./model/formatData.json";
            /**
             * config all tile info param
             */
            var predictionId = "prediction";
            var temperatureId = "temperature";
            var accelerationId = "acceleration";
            var spindlespeedId = "spindlespeed";

            var status0 = "Normal";
            var status1 = "Excessive Temperature";
            var status2 = "Excessive Spindle Speed";
            var status3 = "Coupled Exception";

            var otile1 = this.getView().byId(predictionId);
            var otile2 = this.getView().byId(temperatureId);
            var otile3 = this.getView().byId(accelerationId);
            var otile4 = this.getView().byId(spindlespeedId);

            var img = this.getView().byId("img");
            var imgSVM = this.getView().byId("imgSVM");
            var text = this.getView().byId("text");
            text.addStyleClass('text-text');
            imgSVM.setSrc("./img/SVM1.png");


            //call procedure function 
            $.get(callProcedurePath, function() {});

            // get update data from xsjs and initialize the tile
            $.get(updateDataPath, function(data) {
                //all kinds of variable
                var predict = data['allData'][0]['PREDICT'];
                var temperature = data['allData'][0]['TEMPERATURE'];
                var acceleration = data['allData'][0]['ACCELERATION'];
                var spindlespeed = data['allData'][0]['SPINDLESPEED'];
                //  change predict info and info state
                if (predict != null) {
                    otile1.setProperty("number", predict);
                    switch (predict) {
                    case "0":
                        otile1.setProperty("info", status0);
                        otile1.setProperty("infoState", "Success");
                        otile2.setProperty("info", "Normal Temperature");
                        otile2.setProperty("infoState", "Success");
                        otile4.setProperty("info", "Normal Spindle Speed");
                        otile4.setProperty("infoState", "Success");
                        img.setSrc("./img/green.png");
                        text.setText("Normal Spindle Speed and Normal Temperature.");
                        break;
                    case "1":
                        otile1.setProperty("info", status1);
                        otile1.setProperty("infoState", "Warning");
                        otile2.setProperty("info", "Excessive Temperature");
                        otile2.setProperty("infoState", "Error");
                        otile4.setProperty("info", "Normal Spindle Speed");
                        otile4.setProperty("infoState", "Success");
                        img.setSrc("./img/orange.png");
                        text.setText("Excessive Temperature and Normal Spindle Speed.");
                        break;
                    case "2":
                        otile1.setProperty("info", status2);
                        otile1.setProperty("infoState", "Warning");
                        otile2.setProperty("info", "Normal Temperature");
                        otile2.setProperty("infoState", "Success");
                        otile4.setProperty("info", "Excessive Spindle Speed");
                        otile4.setProperty("infoState", "Error");
                        img.setSrc("./img/yellow.png");
                        text.setText("Normal Temperature and Excessive Spindle Speed.");
                        break;
                    case "3":
                        otile1.setProperty("info", status3);
                        otile1.setProperty("infoState", "Error");
                        otile2.setProperty("info", "Excessive Temperature");
                        otile2.setProperty("infoState", "Error");
                        otile4.setProperty("info", "Excessive Spindle Speed");
                        otile4.setProperty("infoState", "Error");
                        img.setSrc("./img/red.png");
                        text.setText("Excessive Temperature and Excessive Spindle Speed.");
                        break;
                    default:
                        otile1.setProperty("info", "ON Predicting...");
                        otile1.setProperty("infoState", "None");
                    }
                } else {
                    if (acceleration > 400) {
                       //change spindlespeed info and info state
                            otile1.setProperty("number", "2");
                            otile1.setProperty("info", status2);
                            otile1.setProperty("infoState", "Warning");
                            otile2.setProperty("info", "Normal Temperature");
                    		otile2.setProperty("infoState", "Success");
                            otile4.setProperty("number", spindlespeed);
                            otile4.setProperty("info", "Excessive Spindle Speed");
                            otile4.setProperty("infoState", "Error");
                            img.setSrc("./img/yellow.png");
                            text.setText("Normal Temperature and Excessive Spindle Speed.");
                    }

                }

                otile4.setProperty("number", spindlespeed);

                //change temperature info and info state
                otile2.setProperty("number", temperature);
              //  otile2.setProperty("info", "Normal Temperature");
			 //  otile2.setProperty("infoState", "Success");

                otile3.setProperty("number", acceleration);
                otile3.setProperty("info", "Normal Acceleration");
                otile3.setProperty("infoState", "Success");

            });

            /**refresh call procedure with timeout = 1000
             *	@parameters  url, timeout
             * */
            this.refreshNoFunction(callProcedurePath, 1000)

            /**
             *refresh tile data from update data xsjs
             *@parameters url, timeout
             */
            // refresh tile
            var tjaxProcessing = false;
            var intervalHandle = setInterval(function() {
                // Ajax is calling
                if (tjaxProcessing) {
                    return;
                }
                tjaxProcessing = true;
                // Update Tile
                $.get(updateDataPath, function(data) {
                    var predict = data['allData'][0]['PREDICT'];
                    var temperature = data['allData'][0]['TEMPERATURE'];
                    var acceleration = data['allData'][0]['ACCELERATION'];
                    var spindlespeed = data['allData'][0]['SPINDLESPEED'];
                    //  change predict info and info state
                    if (predict != null) {
                        otile1.setProperty("number", predict);
                        switch (predict) {
                        case "0":
                            otile1.setProperty("info", status0);
                            otile1.setProperty("infoState", "Success");
                            otile2.setProperty("info", "Normal Temperature");
                            otile2.setProperty("infoState", "Success");
                            otile4.setProperty("info", "Normal Spindle Speed");
                            otile4.setProperty("infoState", "Success");
                            img.setSrc("./img/green.png");
                            text.setText("Normal Spindle Speed and Normal Temperature.");
                            break;
                        case "1":
                            otile1.setProperty("info", status1);
                            otile1.setProperty("infoState", "Warning");
                            otile2.setProperty("info", "Excessive Temperature");
                            otile2.setProperty("infoState", "Error");
                            otile4.setProperty("info", "Normal Spindle Speed");
                            otile4.setProperty("infoState", "Success");
                            img.setSrc("./img/orange.png");
                            text.setText("Excessive Temperature and Normal Spindle Speed.");
                            break;
                        case "2":
                            otile1.setProperty("info", status2);
                            otile1.setProperty("infoState", "Warning");
                            otile2.setProperty("info", "Normal Temperature");
                            otile2.setProperty("infoState", "Success");
                            otile4.setProperty("info", "Excessive Spindle Speed");
                            otile4.setProperty("infoState", "Error");
                            img.setSrc("./img/yellow.png");
                            text.setText("Normal Temperature and Excessive Spindle Speed.");
                            break;
                        case "3":
                            otile1.setProperty("info", status3);
                            otile1.setProperty("infoState", "Error");
                            otile2.setProperty("info", "Excessive Temperature");
                            otile2.setProperty("infoState", "Error");
                            otile4.setProperty("info", "Excessive Spindle Speed");
                            otile4.setProperty("infoState", "Error");
                            img.setSrc("./img/red.png");
                            text.setText("Excessive Temperature and Excessive Spindle Speed.");
                            break;
                        default:
                            otile1.setProperty("info", "ON Predicting...");
                            otile1.setProperty("infoState", "None");
                        }
                    } else {
                        if (acceleration > 400) {
                            //change spindlespeed info and info state
                            otile1.setProperty("number", "2");
                            otile1.setProperty("info", status2);
                            otile1.setProperty("infoState", "Warning");
                            otile2.setProperty("info", "Normal Temperature");
                    		otile2.setProperty("infoState", "Success");
                            otile4.setProperty("number", spindlespeed);
                            otile4.setProperty("info", "Excessive Spindle Speed");
                            otile4.setProperty("infoState", "Error");
                            img.setSrc("./img/yellow.png");
                            text.setText("Normal Temperature and Excessive Spindle Speed.");
                        }

                    }

                    //change temperature info and info state
                    otile2.setProperty("number", temperature);
                   

                    otile3.setProperty("number", acceleration);
                    otile3.setProperty("info", "Normal Acceleration");
                    otile3.setProperty("infoState", "Success");

                    //change spindlespeed info and info state
                    otile4.setProperty("number", spindlespeed);
                    tjaxProcessing = false;
                });
            }, 5000);
            // clearInterval(intervalHandle);
            //initialize chart page
            var oVizFrame = this.getView().byId(predictionId + "VizFrameLine");
            var oPopOver = this.getView().byId(predictionId + "PopOver");
            var oFixFlex = this.getView().byId(predictionId + "FixFlex");
            var oModel = new JSONModel(allDatajsonPath);
            //initialize prediction chart
            this.initializePredictionChart(ControllerOverall, predictionId, oModel, oVizFrame, oPopOver, oFixFlex);
            //refresh prediction chart model 
            this.refreshChartData(allDatajsonPath, 5000, oModel, oVizFrame);

            // initialize detail chart and refresh the chart data
            this.initializeDetailChart(formatDataPath, temperatureId, temperatureId.toUpperCase());
            this.initializeDetailChart(formatDataPath, spindlespeedId, spindlespeedId.toUpperCase());
            this.initializeDetailChart(formatDataPath, accelerationId, accelerationId.toUpperCase());

            // solve the Chrome can't show chart problem 
            SVGElement.prototype.getTransformToElement = SVGElement.prototype.getTransformToElement ||
            function(elem) {
                return elem.getScreenCTM().inverse().multiply(this.getScreenCTM());
            };
        },

        /**
         * 
         *  Action Start Point
         * 
         * 
         */
        //util refresh with no function
        refreshNoFunction: function(url, timeout) {
            // refresh callProcedure
            var oajaxProcessing = false;
            var ointervalHandle = setInterval(function() {
                // Ajax is calling
                if (oajaxProcessing) {
                    return;
                }
                oajaxProcessing = true;
                $.get(url, function() {
                    oajaxProcessing = false;
                });
            }, timeout);
            //	clearInterval(ointervalHandle);
        },
        // refresh  chart data
        refreshChartData: function(url, timeout, oModel, oVizFrame) {
            // refresh tile
            var ajaxProcessing = false;
            var intervalHandle = setInterval(function() {
                // Ajax is calling
                if (ajaxProcessing) {
                    return;
                }
                ajaxProcessing = true;
                $.get(url, function(data) {
                    // Update Chart data
                    oModel.setData(data);
                    oVizFrame.setModel(oModel);
                    ajaxProcessing = false;
                });
            }, timeout);
            // clearInterval(intervalHandle);
        },

        /*  Page controller  */

        //go to detail page
        onPressNavToDetail: function(evt) {
            var id = evt.getSource().getId();
            var pageName = id + "Detail";
            this.getIndex().to(this.createId(pageName));
        },

        //back to index page
        onPressDetailBack: function() {
            this.getIndex().back();
        },
        bricechou:function(evt){
        sap.m.URLHelper.redirect(this._getVal(evt), true);
        },

        //get index page app tag id 
        getIndex: function() {
            var result = this.byId("index");
            if (!result) {
                jQuery.sap.log.info("Hello, BriceChou can't be found");
            }
            return result;
        },

        /* Prediction Chart controller*/
        initializePredictionChart: function(ControllerOverall, id, oModel, oVizFrame, oPopOver, oFixFlex) {
            ControllerOverall.loadLibrary(oVizFrame, oFixFlex); // load "sap.suite.ui.commons"
            ControllerOverall.customFormat(); // set customized format
            oVizFrame.setVizType('line');
            oVizFrame.setUiConfig({
                "applicationSet": "fiori"
            });

            oPopOver.connect(oVizFrame.getVizUid());
            oPopOver.setFormatString(null);

            var oModel = new sap.ui.model.json.JSONModel("./model/jsondata.json");
            var oDataset = new sap.viz.ui5.data.FlattenedDataset({
                dimensions: [{
                    name: 'Real-Time',
                    value: {
                        parts: ['G_CREATED'],
                        formatter: function(created) {
                            jQuery.sap.require("sap.ui.core.format.DateFormat");
                            var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
                                pattern: "MM-dd HH:mm:ss"
                            });
                            return oDateFormat.format(new Date(created));
                        }
                    }
                }],
/*
                function(value) {
             var fixedFloat = sap.ui.core.format.NumberFormat.getFloatInstance({style: 'Standard',
                 maxFractionDigits: 2});
             return fixedFloat.format(value);
         }
                */
                measures: [{
                    name: "TEMPERATURE",
                    value: "{C_TEMPERATURE}"
                }, {
                    name: "ACCELERATION(/100)",
                    value: "{C_ACCELERATION}"
                }, {
                    name: "SPINDLE SPEED(*10)",
                    value: "{C_SPINDLESPEED}"
                }],

                data: {
                    path: "/allData"
                }
            });
            oVizFrame.setDataset(oDataset);
            oVizFrame.setModel(oModel);
            var scales = [{
                'feed': 'color',
                'palette': ['#0000FF', '#00FF00', '#FF1493']
            }];
            oVizFrame.setVizScales(scales);
            oVizFrame.setVizProperties({
                general: {
                    layout: {
                        padding: 0.04
                    }
                },
                valueAxis: {
                    label: {
                        formatString: '0'
                    },
                    title: {
                        visible: true
                    }
                },
                categoryAxis: {
                    title: {
                        visible: true
                    }
                },
                plotArea: {
                    dataLabel: {
                        visible: true,
                        formatString: '0'
                    }
                },
                legend: {
                    title: {
                        visible: false
                    }
                },
                title: {
                    visible: false,
                }
            });
            var feedValueAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
                'uid': "valueAxis",
                'type': "Measure",
                'color': ['#0000FF', '#00FF00', '#FF1493'],
                'values': ["TEMPERATURE", "ACCELERATION(/100)", "SPINDLE SPEED(*10)"]
            }),
                feedCategoryAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
                    'uid': "categoryAxis",
                    'type': "Dimension",
                    'values': ["Real-Time"]
                });
            oVizFrame.addFeed(feedValueAxis);
            oVizFrame.addFeed(feedCategoryAxis);
        },
        /**
         *
         * 
         */
        initializeDetailChart: function(allDatajsonPath, detailId, values) {
            var oVizFrame, oModel, oDataset, feedValueAxis, feedCategoryAxis, oTable;

            // Line chart vizframe
            oVizFrame = new sap.viz.ui5.controls.VizFrame({
                id: detailId + "VizFrame",
                height: "700px",
                width: "100%",
                uiConfig: {
                    applicationSet: "fiori",
                    showErrorMessage: true
                }
            });

            oModel = new JSONModel(allDatajsonPath);
            oDataset = new sap.viz.ui5.data.FlattenedDataset({
                dimensions: [{
                    name: "Real-Time",
                    value: {
                        parts: ['G_CREATED'],
                        formatter: function(created) {
                            jQuery.sap.require("sap.ui.core.format.DateFormat");
                            var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
                                pattern: "MM-dd HH:mm:ss"
                            });
                            return oDateFormat.format(new Date(created));
                        }
                    }
                }],
                measures: [{
                    name: "TEMPERATURE",
                    value: "{C_TEMPERATURE}"
                }, {
                    name: "ACCELERATION",
                    value: "{C_ACCELERATION}"
                }, {
                    name: "SPINDLESPEED",
                    value: "{C_SPINDLESPEED}"
                }],
                data: {
                    path: "/allData"
                }
            });
            oVizFrame.setDataset(oDataset);
            oVizFrame.setModel(oModel);

            oVizFrame.setVizProperties({
                general: {
                    layout: {
                        padding: 0.04
                    }
                },
                valueAxis: {
                    label: {
                        formatString: '0.00'
                    },
                    title: {
                        visible: true
                    }
                },
                categoryAxis: {
                    title: {
                        visible: true
                    }

                },
                plotArea: {
                    dataLabel: {
                        visible: true,
                        formatString: '0.00'
                    }
                },
                legend: {
                    title: {
                        visible: false
                    }
                },
                title: {
                    visible: false
                }
            });
            var temp;
            var tempColor;
            switch (values) {
            case "TEMPERATURE":
                var scales = [{
                    'feed': 'color',
                    'palette': ['#0000FF']
                }];
                oVizFrame.setVizScales(scales);
                temp = "TEMPERATURE";
                break;

            case "ACCELERATION":
                var scales = [{
                    'feed': 'color',
                    'palette': ['#00FF00']
                }];
                oVizFrame.setVizScales(scales);
                temp = "ACCELERATION";
                break;

            case "SPINDLESPEED":
                var scales = [{
                    'feed': 'color',
                    'palette': ['#FF1493']
                }];
                oVizFrame.setVizScales(scales);
                temp = "SPINDLESPEED";
                break;
            }
            feedValueAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
                'uid': "valueAxis",
                'type': "Measure",
                'values': [temp]
            });
            feedCategoryAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
                'uid': "categoryAxis",
                'type': "Dimension",
                'values': ["Real-Time"]
            });

            oVizFrame.addFeed(feedValueAxis);
            oVizFrame.addFeed(feedCategoryAxis);
            oVizFrame.setVizType("line");

            // Table example
            oTable = new sap.m.Table({
                id: detailId + "Table"
            });
            oTable.addColumn(new sap.m.Column({
                header: new sap.m.Label({
                    text: "ID"
                })
            }));
            oTable.addColumn(new sap.m.Column({
                header: new sap.m.Label({
                    text: "CREATED"
                })
            }));
            oTable.addColumn(new sap.m.Column({
                header: new sap.m.Label({
                    text: temp
                })
            }));

            var oTableTemplate = new sap.m.ColumnListItem({
                type: sap.m.ListType.Active,
                cells: [
                new sap.m.Label({
                    text: "{C_ID}"
                }), new sap.m.Label({
                    text: "{G_CREATED}"
                }), new sap.m.Label({
                    text: ("{C_" + values + "}")
                })]
            });

            oTable.bindItems("/allData", oTableTemplate, null, null);
            oTable.setModel(oModel);

            var oChartContainer, oContent1, oContent2;

            oChartContainer = this.getView().byId(detailId + "ChartContainer");
            oContent1 = new sap.suite.ui.commons.ChartContainerContent({
                icon: "sap-icon://line-chart",
                title: "Line Chart"
            });
            oContent1.setContent(oVizFrame);
            oContent2 = new sap.suite.ui.commons.ChartContainerContent({
                icon: "sap-icon://table-view",
                title: "Table"
            });
            oContent2.setContent(oTable);
            oChartContainer.addContent(oContent1);
            oChartContainer.removeContent();
            oChartContainer.addContent(oContent2);
             this.refreshChartData(allDatajsonPath, 5000, oModel, oVizFrame);
        }
    });
    return MainController;
});

/*
 * Demo code
 $(function(){ 
var handler = function(){ 
} 
var timer = setInterval( handler , 5000); //每5秒调用一次方法
var clear = function(){ 
clearInterval(timer); //清理时间
});  





	function start_flow()
{
	var count = 0,is_true = false;
	setInterval(function(){
		if(!count){
		is_true = start_project();
		count++;
		}
		if(is_true){
			start_config();
                        is_true = false;
		}
						 },1000);
    ...
}
"{path: '/number',type: 'sap.ui.model.type.Float',formatOptions: {maxFractionDigits: 2}}"

 */