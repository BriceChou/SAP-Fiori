var email = $.request.parameters.get('EMAIL');
var firstname = $.request.parameters.get('FIRSTNAME');
var lastname = $.request.parameters.get('LASTNAME');
var age = $.request.parameters.get('AGE');
var address = $.request.parameters.get('ADDRESS');

var conn = $.db.getConnection();  
var pstmt = conn.prepareStatement( "INSERT INTO NEO_0K1ZGG9JLRXD8WF0JOAXBWJG4.PERSONAL VALUES(?,?,?,?,?)" );
pstmt.setString(1,email);  
pstmt.setString(2,firstname);  
pstmt.setString(3,lastname); 
pstmt.setString(4,age);
pstmt.setString(5,address);
pstmt.execute();  
conn.commit();  
$.response.contentType = 'text/plain';
    $.response.setBody('Data Inserted');
    $.response.status = 200;    
    
/*
Test:
https://s2hanaxs.hanatrial.ondemand.com/p1146569trial/test1/Contacts/adddata.xsjs?email=jenizar@example.com&firstname=john&lastname=eswin&age=41&address=Jakarta        
*/
   
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}