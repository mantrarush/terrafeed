package com.terrafeed.providers.reports;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import net.sf.jasperreports.engine.JREmptyDataSource;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.export.JRPdfExporter;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;

@Path("reports")
public class ReportProvider {

	@GET
	@Produces(MediaType.TEXT_PLAIN)
    public String getIt() {
        return "Got it!";
    }
	
	@Path("/sulfurcarb35")
	@GET
	@Produces( {"application/pdf"})
	public byte[] getMe() {
		byte[] bytes = null;
		Map<String, Object> parameters = new HashMap<String, Object>();
		
		try {
			String template = getReportTemplate();
			InputStream inputStream = ReportProvider.class.getResourceAsStream(template);
			JREmptyDataSource jrbc = new JREmptyDataSource();

    	   String subReportDir = getSubReportDir();
    	   parameters.put("SUBREPORT_DIR", URLEncoder.encode(subReportDir, "UTF-8"));
		       
			JasperPrint print;
			
			if(null != jrbc) {
				print = JasperFillManager.fillReport(inputStream, parameters, jrbc);
			} else {
				print = JasperFillManager.fillReport(inputStream, parameters);
			}
			
			JRPdfExporter exporter = new JRPdfExporter();
			ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
			
			exporter.setExporterInput(new SimpleExporterInput(print));
			exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(outputStream));
			exporter.exportReport();
			
			bytes = outputStream.toByteArray();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			
		}

		return bytes;

	}
	
	private String getReportTemplate() {
		return "SulferCarb35.jasper";
	}
	
	public String getSubReportDir() {
		String subReportDir = ReportProvider.class.getProtectionDomain().getCodeSource().getLocation().getPath();
        subReportDir = subReportDir.substring(0, subReportDir.lastIndexOf("/") + 1);
        return subReportDir;
	}

}
