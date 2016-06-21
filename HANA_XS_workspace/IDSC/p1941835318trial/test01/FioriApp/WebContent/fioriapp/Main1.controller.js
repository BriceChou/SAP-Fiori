sap.ui.define([
               "sap/ui/core/mvc/Controller",
               "com/sspu/fioriapp/ControllerOverall"
    ], function(Controller,ControllerOverall) {
    "use strict";
    var MainController = Controller.extend("com.sspu.fioriapp.Main", {
    	
	//VizFram
	 onInit: function(oEvent) {
		 
			var oModel = new sap.ui.model.json.JSONModel("./model/jsondata.xsjs",false);
			sap.ui.getCore().setModel(oModel);
			$.get("./model/callProcedure.xsjs", function(){});
			
			var otile1 = this.getView().byId("Prediction");
			var otile2 = this.getView().byId("Temperature");
			var otile3 = this.getView().byId("Acceleration");
			var otile4 = this.getView().byId("Spindlespeed");
			$.get("./model/updateData.xsjs", function(data) {
				otile1.setProperty("number", data['allData'][0]['PREDICT']);
				switch(data['allData'][0]['PREDICT']){
				case 0 : otile1.setProperty("info","Low T Low S") ;
						 otile1.setProperty("infoState","Success");break;
				case 1 : otile1.setProperty("info","Low T High S") ;
						 otile1.setProperty("infoState","None");break;
				case 2 : otile1.setProperty("info","High T Low S")  ;
						 otile1.setProperty("infoState","Warning");break;
				case 3 : otile1.setProperty("info","High T High S") ;
						 otile1.setProperty("infoState","Error");break;
				default :otile1.setProperty("info","NULL ARRAY");
						 otile1.setProperty("infoState","Error");
				}
				otile2.setProperty("number", data['allData'][0]['TEMPERATURE']);
				otile3.setProperty("number", data['allData'][0]['ACCELERATION']);
				otile4.setProperty("number", data['allData'][0]['SPINDLESPEED']);
			});
			
			//refresh callProcedure
			var oajaxProcessing = false;
			var ointervalHandle = setInterval(function() {
				//Ajax is calling
				if (oajaxProcessing) {
					return;
				}
				oajaxProcessing = true;
				$.get("./model/callProcedure.xsjs", function() {
					oajaxProcessing = false;
				});
			}, 1000);
// 			clearInterval(ointervalHandle);
			
			// refresh tile
			var ajaxProcessing = false;
			var intervalHandle = setInterval(function() {
				//Ajax is calling
				if (ajaxProcessing & oajaxProcessing) {
					return;
				}
				ajaxProcessing = true;
				oajaxProcessing = true;
				$.get("./model/updateData.xsjs", function(data) {
					//Update Tile
					otile1.setProperty("number", data['allData'][0]['PREDICT']);
					switch(data['allData'][0]['PREDICT']){
					case "0" : otile1.setProperty("info","Low T Low S") ;
							 otile1.setProperty("infoState","Success");
							 break;
					case "1" : otile1.setProperty("info","Low T High S") ;
							 otile1.setProperty("infoState","None"); 
							 break;
					case "2" : otile1.setProperty("info","High T Low S")  ;
							 otile1.setProperty("infoState","Warning");
							 break;
					case "3" : otile1.setProperty("info","High T High S") ;
							 otile1.setProperty("infoState","Error"); 
							 break;
					default :otile1.setProperty("info","NULL ARRAY");
							 otile1.setProperty("infoState","Error");
					}
					otile2.setProperty("number", data['allData'][0]['TEMPERATURE']);
					otile3.setProperty("number", data['allData'][0]['ACCELERATION']);
					otile4.setProperty("number", data['allData'][0]['SPINDLESPEED']);
					ajaxProcessing = false;
					oajaxProcessing = false;
				});
			}, 5000);
// 			clearInterval(intervalHandle);
		 
         var oVizFrame = this.getView().byId("idVizFrameLine");
         var oFixFlex = this.getView().byId("idFixFlex");
       //  ControllerOverall.customFormat(); // set customized format
         ControllerOverall.loadLibrary(oVizFrame, oFixFlex); // load "sap.suite.ui.commons"

         var oVizFrame = this.getView().byId("idVizFrameLine");
         oVizFrame.setVizType('line');
         oVizFrame.setUiConfig({
             "applicationSet": "fiori"
         });
//         sap.viz.api.env.Format.numericFormatter(null);
         
         var oPopOver = this.getView().byId("idPopOver");
         oPopOver.connect(oVizFrame.getVizUid());
         oPopOver.setFormatString(null);

         var oDataset = new sap.viz.ui5.data.FlattenedDataset({
             dimensions: [{
                 name: 'C_ID',
                 value: "{C_ID}"
             }],
             measures: [{
                 name: 'C_TEMPERATURE',
                 value: '{C_TEMPERATURE}'
             }, {
                 name: 'C_ACCELERATION',
                 value: '{C_ACCELERATION}'
             },{ 
            	 name: 'C_SPINDLESPEED',
                 value: '{C_SPINDLESPEED}'
              }],
             data: {
                 path: "/allData"
             }
         });
         oVizFrame.setDataset(oDataset);
         oVizFrame.setModel(oModel);
       /*  
         //refresh VizFrom
         var vajaxProcessing = false;
			var vintervalHandle = setInterval(function() {
				//Ajax is calling
				if (vajaxProcessing) {
					return;
				}
				vajaxProcessing = true;
				$.get("./model/jsondata.xsjs", function(data) {
					//Update Chart
					var oModel = new sap.ui.model.json.JSONModel(data);
					oVizFrame.setModel(oModel);
					vajaxProcessing = false;
				});
			}, 5000);
// 			clearInterval(vintervalHandle);
*/
         oVizFrame.setVizProperties({
             general: {
                 layout: {
                     padding: 0.04
                 }
             },
             valueAxis: {
                 label: {
//                     formatString:null
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
//                     formatString:null
                 },
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
                 'values': ["C_TEMPERATURE", "C_ACCELERATION","C_SPINDLESPEED"]
             }),
             feedCategoryAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
                 'uid': "categoryAxis",
                 'type': "Dimension",
                 'values': ["C_ID"]
             });
         oVizFrame.addFeed(feedValueAxis);
         oVizFrame.addFeed(feedCategoryAxis);
     },
	
	// Page controller
	handleEditPress : function(evt) {
		var oTileContainer = this.getView().byId("container");
		var newValue = !oTileContainer.getEditable();
		oTileContainer.setEditable(newValue);
		evt.getSource().setText(newValue ? "Done" : "Edit");
	},

	handleTileDelete : function(evt) {
		var tile = evt.getParameter("tile");
		evt.getSource().removeTile(tile);
	},
	onPressNavToDetail : function(evt) {
		var id = evt.getSource().getId();
		var pageName = id + "Detail";
		this.getIndex().to(this.createId(pageName));
	},

	onPressDetailBack : function() {
		this.getIndex().back();
	},
	turnGreen : function(evt) {
		this.getIndex().to(this.createId("TestDetail"));

	},

	getIndex : function() {
		var result = this.byId("index");
		if (!result) {
			jQuery.sap.log.info("Hello BriceChou can't be found");
		}
		return result;
	}
	
    });
    return MainController;
});
