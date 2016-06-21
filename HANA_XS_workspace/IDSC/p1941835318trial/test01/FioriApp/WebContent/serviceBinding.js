function initModel() {
	var sUrl = "https://s11hanaxs.hanatrial.ondemand.com/p1941835318trial/test01/FioriApp/WebContent/model/updateData.xsjs";
	var oModel = new sap.ui.model.json.JSONModel(sUrl,false);
	sap.ui.getCore().setModel(oModel);
}