module.exports = {
	createObjectTag: function(url) {
		var objectTag = "<object data='"+url+"' width='100%' height='90%'>";
		objectTag += "<p>No suitable plugin found for "+url+"</p>";
		objectTag += "</object>";

		return objectTag;
	}
};