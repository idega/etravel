<%@ page language="java" %>
<%@ page import="java.io.*" %>
<%@ page import="java.net.*" %>
<%@ page import="com.idega.util.*" %>
<%@ page import="com.idega.builder.business.*" %>
<%@ page import="com.idega.core.builder.data.*" %>


<%

//Bokunarvel
updateTemplate("http://www.exploreiceland.is/booking", "http://www.exploreiceland.is/", "75", out);

//Leitarnidurstodur
updateTemplate("http://www.exploreiceland.is/booking/booking_step2/","http://www.exploreiceland.is/","76", out);

BuilderLogic.getInstance().getPageCacher().flagAllPagesInvalid();

%>

<%!

        public void updateTemplate(String sUrl, String urlPrefix, String pageKey, javax.servlet.jsp.JspWriter out) throws Exception {
                URL url = new URL(sUrl);
                InputStream iStream = url.openStream();

                InputStreamReader iReader = new InputStreamReader(iStream,"ISO-8859-1");
//                out.println(iReader.getEncoding());

                HtmlReferenceRewriter instance = new HtmlReferenceRewriter();


                ICPage ibpage = ((com.idega.core.builder.data.ICPageHome) com.idega.data.IDOLookup.getHome(ICPage.class)).findByPrimaryKey(new Integer(pageKey));
                ibpage.setFormat("HTML");
                OutputStream outStream = ibpage.getPageValueForWrite();
                
                
                Reader input = new BufferedReader(iReader);
                Writer output = new OutputStreamWriter(outStream, "UTF-8");
                
                
                instance.setInput(input);
                instance.setOutput(output);
                instance.setUrlPrefix(urlPrefix);
                instance.process();
                
                ibpage.store();
		out.println(sUrl+" DONE");

	}
%>
