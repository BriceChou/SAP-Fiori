var device = 'e5dc49e2-7682-4f7d-bd82-ed5f6c97e403';
var created = $.request.parameters.get('G_CREATED');
var name = $.request.parameters.get('C_NAME');
var messages = $.request.parameters.get('C_MESSAGES');

var conn = $.db.getConnection();  
var pstmt = conn.prepareStatement( "INSERT INTO NEO_6URY3JDXKU7ZAYY7ZFTV9RAE3.T_IOT_41E4A5A332FED9214579 VALUES(?,?,?,?,?)" );
pstmt.setString(1,device);  
pstmt.setString(2,created);  
pstmt.setString(3,name); 
pstmt.setString(4,messages);
pstmt.execute();  
conn.commit();  
$.response.contentType = 'text/plain';
    $.response.setBody('Data Inserted');
    $.response.status = 200;    
