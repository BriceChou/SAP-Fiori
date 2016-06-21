var created = $.request.parameters.get('G_CREATED');

var conn = $.db.getConnection();  
var pstmt = conn.prepareStatement( "delete from NEO_6URY3JDXKU7ZAYY7ZFTV9RAE3.T_IOT_41E4A5A332FED9214579 " +
		"where G_CREATED=?" );
pstmt.setString(1,created);
pstmt.execute();  
conn.commit();  
$.response.contentType = 'text/plain';
    $.response.setBody('Data Deleted');
    $.response.status = 200; 
var rs = pstmt.executeQuery();
