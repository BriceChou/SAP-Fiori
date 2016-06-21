var select_all_query =
	"select top 10 * from NEO_1B2PI73TWSB8U8HLZJK1H7G4X.T_IOT_9BFF3A7F460D3B74F5B7 order by G_CREATED desc";

function close(closables) {
	var closable;
	var i;
	for (i = 0; i < closables.length; i++) {
		closable = closables[i];
		if (closable) {
			closable.close();
		}
	}
}

function getAllData() {
	var x1 = {
		allData: str
	};
	var allDataList = [];
	var connection = $.db.getConnection();
	var statement = null;
	var resultSet = null;
	try {
		statement = connection.prepareStatement(select_all_query);
		resultSet = statement.executeQuery();
		var allData;

		while (resultSet.next()) {
			allData = {};
			allData.G_DEVICE = resultSet.getString(1);
			allData.G_CREATED = resultSet.getString(2);
			allData.C_ID = resultSet.getString(3);
			allData.C_TEMPERATURE = resultSet.getString(4);
			allData.C_ACCELERATION = resultSet.getString(5);
			allData.C_SPINDLESPEED = resultSet.getString(6);
			allDataList.push(allData);
		}
	} finally {
		close([resultSet, statement, connection]);
	}
	//JSON.stringify(obj);        // '"bar"'
	//JSON.stringify({ x: obj }); // '{"x":"bar"}'          
	var str = JSON.stringify({
		allData: allDataList
	});
	return str;
}

function doGet() {
	try {
		$.response.contentType = "application/json";
		$.response.setBody(getAllData());
	} catch (err) {
		$.response.contentType = "text/plain";
		$.response.setBody("Error while executing query: [" + err.message + "]");
		$.response.returnCode = 200;
	}
}
doGet();