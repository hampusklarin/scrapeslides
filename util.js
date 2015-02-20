module.exports = {
	iframePDF: function(PDFurl) {
		var pdfObject = "<object data='"+PDFurl+"' type='application/pdf' width='100%' height='90%'>";
		pdfObject += "<p>No PDF plugin found</p>";
		pdfObject += "</object>";

		return pdfObject;
	}
};