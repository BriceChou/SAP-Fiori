$.import("sap.hana.xs.libs.dbutils", "procedures"); 
var XSProc = $.sap.hana.xs.libs.dbutils.procedures; 
var conn;
var cstmt;
var query1,query2,query3,query4,query5;
function callPredictionProcedure(id,temperature,acceleration, speed) {
	try{
		query1 = "INSERT INTO NEO_1B2PI73TWSB8U8HLZJK1H7G4X.PREDICTION_TEMP VALUES (?,?,?,?)";
		query2 = "CALL _SYS_AFL.NEO_1B2PI73TWSB8U8HLZJK1H7G4X_PAL_SVM_PREDICT(NEO_1B2PI73TWSB8U8HLZJK1H7G4X.PREDICTION_TEMP," +
				"NEO_1B2PI73TWSB8U8HLZJK1H7G4X.QPAL_CONTROL_TBL," +
				"NEO_1B2PI73TWSB8U8HLZJK1H7G4X.PAL_SVM_MODELPART1_TBL," +
				"NEO_1B2PI73TWSB8U8HLZJK1H7G4X.PAL_SVM_MODELPART2_TBL," +
				"NEO_1B2PI73TWSB8U8HLZJK1H7G4X.PAL_SVM_PREDICTION_TBL) WITH OVERVIEW";
		query3 = "DELETE FROM NEO_1B2PI73TWSB8U8HLZJK1H7G4X.PREDICTION_TEMP";
		query4 = "UPDATE NEO_1B2PI73TWSB8U8HLZJK1H7G4X.T_IOT_PREDICTIONRESULT SET PREDICT = (SELECT PREDICT FROM NEO_1B2PI73TWSB8U8HLZJK1H7G4X.PAL_SVM_PREDICTION_TBL WHERE ID = ?) WHERE ID = ?";
		query5 = "DELETE FROM NEO_1B2PI73TWSB8U8HLZJK1H7G4X.PAL_SVM_PREDICTION_TBL";
		
		cstmt = conn.prepareStatement(query1);
	    cstmt.setString(1, id);
	    cstmt.setString(2, temperature);
	    cstmt.setString(3, acceleration);
	    cstmt.setString(4, speed);
	    cstmt.execute();
	    
	    cstmt = conn.prepareCall(query2);
	    cstmt.execute();
	    
	    cstmt = conn.prepareStatement(query3);
	    cstmt.execute();
	    
	    cstmt = conn.prepareStatement(query4);
	    cstmt.setString(1, id);
	    cstmt.setString(2, id);
	    cstmt.execute();
	    
	    cstmt = conn.prepareStatement(query5);
	    cstmt.execute();
	    conn.commit(); 
	    $.response.status = $.net.http.OK;
	}
	catch(e){
		$.response.status = $.net.http.BAD_REQUEST;
		$.response.contentType = "application/json";
	    $.response.setBody(e.toString());
	    return false;
	}
	finally{
		//$.response.setBody("Successfully called");
	    return true;
	} 
}

function triggerPrediction(){
	var selectQuery = "SELECT * FROM NEO_1B2PI73TWSB8U8HLZJK1H7G4X.T_IOT_PREDICTION";
	var id;
	var resultSet = null;
	try {
		cstmt = conn.prepareStatement(selectQuery);
		resultSet = cstmt.executeQuery();
		var id,predictResult;
		if(resultSet.next()){
			query2 = "CALL _SYS_AFL.NEO_1B2PI73TWSB8U8HLZJK1H7G4X_PAL_SVM_PREDICT(NEO_1B2PI73TWSB8U8HLZJK1H7G4X.T_IOT_PREDICTION," +
					"NEO_1B2PI73TWSB8U8HLZJK1H7G4X.QPAL_CONTROL_TBL," +
					"NEO_1B2PI73TWSB8U8HLZJK1H7G4X.PAL_SVM_MODELPART1_TBL," +
					"NEO_1B2PI73TWSB8U8HLZJK1H7G4X.PAL_SVM_MODELPART2_TBL," +
					"NEO_1B2PI73TWSB8U8HLZJK1H7G4X.PAL_SVM_PREDICTION_TBL) WITH OVERVIEW";
			query3 = "DELETE FROM NEO_1B2PI73TWSB8U8HLZJK1H7G4X.T_IOT_PREDICTION";
			query4 = "UPDATE NEO_1B2PI73TWSB8U8HLZJK1H7G4X.T_IOT_PREDICTIONRESULT SET PREDICT = (SELECT PREDICT FROM NEO_1B2PI73TWSB8U8HLZJK1H7G4X.PAL_SVM_PREDICTION_TBL WHERE ID = ?) WHERE ID = ?";
			query5 = "DELETE FROM NEO_1B2PI73TWSB8U8HLZJK1H7G4X.PAL_SVM_PREDICTION_TBL";
			
		    cstmt = conn.prepareCall(query2);
		    cstmt.execute();
		    
		    cstmt = conn.prepareStatement(query3);
		    cstmt.execute();
		    
		    id = resultSet.getInteger(1);
		    cstmt = conn.prepareStatement(query4);
		    cstmt.setInteger(1, id);
		    cstmt.setInteger(2, id);
		    cstmt.execute();
		    $.response.setBody('id:'+id+' temperature: '+resultSet.getDouble(2)+' speed: '+ resultSet.getDouble(3));
			while(resultSet.next()){
				id = resultSet.getInteger(1);
			    cstmt = conn.prepareStatement(query4);
			    cstmt.setInteger(1, id);
			    cstmt.setInteger(2, id);
			    cstmt.execute();
			}
		    cstmt = conn.prepareStatement(query5);
		    cstmt.execute();
		    conn.commit(); 
		}
	}
	catch(e){
		$.response.status = $.net.http.BAD_REQUEST;
	    $.response.setBody(e.toString());
	    return false;
	}
	finally{
		$.response.setBody("Successfully called");
	    return true;
	} 
	
	
	
}
conn = $.db.getConnection();  
//var id = $.request.parameters.get('id');
//var temperature = $.request.parameters.get('temperature');
//var acceleration = $.request.parameters.get('acceleration');
//var speed = $.request.parameters.get('speed');

if(triggerPrediction()){
	$.response.setBody('Prediction Procedure successfully!');
}
//if(callPredictionProcedure(id,temperature,acceleration, speed)){
//	
//}
$.response.contentType = 'text/plain';
$.response.status = 200;   
if (cstmt) 
    cstmt.close();
if (conn) 
    conn.close();