var select_all_query =  
                    "select * from NEO_1B2PI73TWSB8U8HLZJK1H7G4X.T_IOT_AFE9C86145E6705B1993";  
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
function getDataTest(){  
          var x1 = {
              DataSet: str
              };
          var dataTestList = [];  
          var connection = $.db.getConnection();  
          var statement = null;  
          var resultSet = null;  
          try{  
                    statement = connection.prepareStatement(select_all_query);  
                    resultSet = statement.executeQuery();  
                    var dataTest;  
             
                    while (resultSet.next()) {  
                              dataTest = {};  
                              dataTest.G_DEVICE = resultSet.getString(1);  
                              dataTest.G_CREATED = resultSet.getString(2);  
                              dataTest.C_DEVICESTATUS = resultSet.getString(3);
                              dataTest.C_TEMPERATURE = resultSet.getString(4);     
                              dataTest.C_VIBRATIONALFREQUENCY = resultSet.getString(5); 
                               dataTest.C_ROTATIONALSPEED = resultSet.getString(6); 
                              dataTestList.push(dataTest);  
                    }  
          } finally {  
                    close([resultSet, statement, connection]);  
          }  
//JSON.stringify(obj);        // '"bar"'
//JSON.stringify({ x: obj }); // '{"x":"bar"}'          
                var str = JSON.stringify({DataSet: dataTestList});   
         return str;  
}  
function doGet() {  
          try{  
                    $.response.contentType = "application/json";  
                    $.response.setBody(getDataTest());             
          }  
          catch(err){  
                    $.response.contentType = "text/plain";  
                    $.response.setBody("Error while executing query: [" + err.message + "]");  
                    $.response.returnCode = 200;  
          }  
}  
doGet();  