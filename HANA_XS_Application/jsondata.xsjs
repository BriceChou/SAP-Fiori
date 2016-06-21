var select_all_query =  
                    "select * from NEO_6URY3JDXKU7ZAYY7ZFTV9RAE3.T_IOT_41E4A5A332FED9214579";  
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
              UserSet: str
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
                              dataTest.C_NAME = resultSet.getString(3);
                              dataTest.C_MESSAGES = resultSet.getString(4);                              
                              dataTestList.push(dataTest);  
                    }  
          } finally {  
                    close([resultSet, statement, connection]);  
          }  
//JSON.stringify(obj);        // '"bar"'
//JSON.stringify({ x: obj }); // '{"x":"bar"}'          
                var str = JSON.stringify({UserSet: dataTestList});   
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