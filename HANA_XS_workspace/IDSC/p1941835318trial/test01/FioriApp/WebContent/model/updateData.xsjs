var select_all_query =  
                    "select top 1 * from NEO_1B2PI73TWSB8U8HLZJK1H7G4X.T_IOT_PREDICTIONRESULT order by CREATED desc";  
function close(closables) {  
          var closable;  
          var i;  
          for (i = 0; i < closables.length; i++) {  
                    closable = closables[i];  
                    if(closable) {  
                              closable.close();  
                    }  
          }  
}  
function getAllData(){  
          var x1 = {
              allData: str
              };
          var allDataList = [];  
          var connection = $.db.getConnection();  
          var statement = null;  
          var resultSet = null;  
          try{  
                    statement = connection.prepareStatement(select_all_query);  
                    resultSet = statement.executeQuery();  
                    var allData;  
             
                    while (resultSet.next()) {  
                    	allData = {};  
                    	allData.ID = resultSet.getString(1);  
                    	allData.CREATED  = resultSet.getString(2);  
                    	allData.TEMPERATURE = resultSet.getDouble(3).toFixed(2);
                    	allData.ACCELERATION = resultSet.getDouble(4).toFixed(2);     
                    	allData.SPINDLESPEED = resultSet.getDouble(5).toFixed(2); 
                    	allData.PREDICT = resultSet.getString(6); 
                    	allDataList.push(allData);  
                    }  
          } finally {  
                    close([resultSet, statement, connection]);  
          }  
//JSON.stringify(obj);        // '"bar"'
//JSON.stringify({ x: obj }); // '{"x":"bar"}'          
         var str = JSON.stringify({allData: allDataList});   
         return str;  
}  
function doGet() {  
          try{  
                    $.response.contentType = "application/json";  
                    $.response.setBody(getAllData());             
          }  
          catch(err){  
                    $.response.contentType = "text/plain";  
                    $.response.setBody("Error while executing query: [" + err.message + "]");  
                    $.response.returnCode = 200;  
          }  
}  
doGet();  