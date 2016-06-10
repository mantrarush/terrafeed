TerraReportViewer.prototype = new ReportViewer();

function TerraReportViewer(lab) {
	ReportViewer.apply(this, arguments);	
}

TerraReportViewer.prototype.displayReport = function() {
	var pdfUrl = '../api/v1/reports/sulfurcarb35';
	
	var divToDisplay = 'pdf';
	var x = $('#' + divToDisplay);
	var width = 400;
	var height = 500;
	
	var displayInDialog = true;
	
	if(typeof x === 'undefined' || x.length < 1) {
		$('<div/>', {
		    id: divToDisplay
		    , width: width
		    , height: height
		}).appendTo($('body'));
	}
	
	x.empty();
	x.html('Please wait ...');
	var myPDF = new PDFObject({url : pdfUrl}).embed(divToDisplay);
	
	if(displayInDialog) {
		var title = 'Sulfur Carb 35 Report';
		
		$('#' + divToDisplay).dialog( {	
			resizable: true,
			height: 600,
			width: 600,
			modal: false,
			title: title,
			buttons: {
				Close: function() {
					$( this ).dialog( "close" );
				}
			}
		});
	}
			
};

TerraReportViewer.prototype.getAdminReportUrl = function(searchParams, format) {
	var reportType = searchParams['reportType'];
	
	var pdfUrl = 'api/v1/estl/report/summary/' + reportType + '.' + format;
	if(format === 'csv') {
		pdfUrl = 'api/v1/estl/report/summary/csv/' + reportType + '.' + format;
	}
	return pdfUrl;
};
