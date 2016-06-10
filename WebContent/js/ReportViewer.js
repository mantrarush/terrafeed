var lab;
function ReportViewer(lab) {
	this.lab = lab;
}
	
ReportViewer.prototype.getReportViewer = function() {
	var reportViewer = new TerraReportViewer();
	return reportViewer;
};	

ReportViewer.prototype.displayReport = function(sampleSetNum) {

};

ReportViewer.prototype.displayAdminReport = function(searchParams, format) {
	
	var pdfUrl = 'api/v1/arl/resTestRequest';
	pdfUrl += '?';

	var divToDisplay = 'pdf';
	var x = $('#' + divToDisplay);
	
	var width = 400;
	var height = 500;
	
	if(typeof x === 'undefined' || x.length < 1) {
		$('<div/>', {
		    id: divToDisplay
		    , width: width
		    , height: height
		}).appendTo($('body'));
	}
	
	x = $('#' + divToDisplay);
	x.empty();
	x.html('Please wait ...');
	x.css('overflow', 'auto');
	
	// append current time
	var d = new Date();
	var currentTime = d.getTime(); 
	pdfUrl = pdfUrl + '&time=currentTime';
	
	// window.location.href = pdfUrl;
	var myPDF = new PDFObject({url : pdfUrl}).embed(divToDisplay);

	// append current time
	var d = new Date();
	var currentTime = d.getTime(); 
	data = data + '&time=currentTime';
	
	$.download(pdfUrl, data, 'GET');
	
};

ReportViewer.getReportViewer = function(lab) {
	var reportViewer = new TerraReportViewer();
	return reportViewer;
};


ReportViewer.prototype.getAdminReportUrl = function(searchParams, format) {
	console.log('ExtReportViewer Handle displayAdminReport');
};

jQuery.download = function(url, data, method){
	//url and data options required
	if(url && data) {
		//data can be string of parameters or array/object
		data = typeof data == 'string' ? data : jQuery.param(data);
		//split params into form inputs
		var inputs = '';
		jQuery.each(data.split('&'), function() {
			var pair = this.split('=');
			inputs += '<input type="hidden" name="'+ pair[0] +'" value="'+ pair[1] +'" />';
		});
		
		// jQuery.ajax("accept", "application/vnd.ms-excel");
		
		console.log('method: ' + method);
		//send request
		// jQuery('<form target="_self" action="'+ url +'" method="'+ (method || 'get') + '">' + inputs + '</form>').appendTo('body').submit().remove();
		
		var form = jQuery('<form target="_self" action="'+ url +'" method="'+ (method || 'get') + '">' + inputs + '</form>');
		form.appendTo('body');
		form.submit();
		form.remove();
	}
};

