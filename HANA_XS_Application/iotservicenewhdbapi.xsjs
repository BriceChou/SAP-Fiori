var oConnection = $.hdb.getConnection();

var sQuery = "SELECT * FROM NEO_0IJYRYOL6B9Z9TOCC2B4VDCC2.T_IOT_7BDF969DC05EEBCBED3D";

var oResultSet = oConnection.executeQuery(sQuery);

var sBody = "";

for(var i = 0; i < oResultSet.length; i++) {
    sBody += oResultSet[i]["G_DEVICE"] + "\t" + oResultSet[i]["G_CREATED"] + "\t" + oResultSet[i]["C_VALUE"] + "\t" + oResultSet[i]["C_TIMESTAMP"] + "\n";
}

oResultSet.close();
oStatement.close();

$.response.status = $.net.http.OK;
$.response.setBody(sBody);