var select_all_query = "select top 10 * from NEO_1B2PI73TWSB8U8HLZJK1H7G4X.T_IOT_9BFF3A7F460D3B74F5B7 order by G_CREATED desc";
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

Number.prototype.toFixed = function(s) 
{ 
return (parseInt(this * Math.pow( 10, s ) + 0.5)/ Math.pow( 10, s )).toString(); 
} 
	/*index = changenum.indexOf(".");
	if (index < 0 && s > 0) {
		changenum = changenum + ".";
		for (i = 0; i < s; i++) {
			changenum = changenum + "0";
		}

	} else {
		index = changenum.length - index;
		for (i = 0; i < (s - index) + 1; i++) {
			changenum = changenum + "0";
		}

	}

	return changenum;*/
function getAllData() {
	var x1 = {
		allData : str
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
			allData.G_CREATED = resultSet.getTimestamp(2);
			allData.C_ID = resultSet.getString(3);
			allData.C_TEMPERATURE = resultSet.getDouble(4).toFixed(2);
			allData.C_ACCELERATION = resultSet.getDouble(5).toFixed(2);
			allData.C_SPINDLESPEED = resultSet.getDouble(6).toFixed(2);
			allDataList.push(allData);
		}
	} finally {
		close([ resultSet, statement, connection ]);
	}
	// JSON.stringify(obj); // '"bar"'
	// JSON.stringify({ x: obj }); // '{"x":"bar"}'
	var str = JSON.stringify({
		allData : allDataList
	});
	return str;
}
function doGet() {
	try {
		$.response.contentType = "application/json";
		$.response.setBody(getAllData());
	} catch (err) {
		$.response.contentType = "text/plain";
		$.response
				.setBody("Error while executing query: [" + err.message + "]");
		$.response.returnCode = 200;
	}
}
doGet();