<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="decorator" uri="http://www.opensymphony.com/sitemesh/decorator"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>




<html lang="en" manifest="${baseUrl}/static/offline/offline.manifest">


    <head>
        <!-- The current version of the application -->
        <meta name="version" content="0.0.1-SNAPSHOT"/>

        <!-- Define charset for HTML5 Doctype -->
        <meta charset="utf-8" />
        
		<title><decorator:title></decorator:title></title>
        
        <!-- Add the fav icon -->
        <link rel="icon" href="favicon.ico" type="image/x-icon">
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">

        <!-- META DATA IOS WEBAPP -->
        <meta name="apple-mobile-web-app-title" content="App Title">
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <link rel="apple-touch-icon" sizes="29x29" href="static/images/moblie-icons/icon-29x29.png" />
        <link rel="apple-touch-icon" sizes="50x50" href="static/images/moblie-icons/icon-50x50.png" />
        <link rel="apple-touch-icon" sizes="58x58" href="static/images/moblie-icons/icon-58x58.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="static/images/moblie-icons/icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="100x100" href="static/images/moblie-icons/icon-100x100.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="static/images/moblie-icons/icon-144x144.png">

        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">

        

        
            <link rel="stylesheet" media="screen, projection" href="static/styles/main.min.css" />
        
    </head>
    <body>
        <h3>This page is in grunt watch, that means this page changed will rebuild the destination page in WEB-INF/sitemesh folder.</h3>
        <h4>How we can use this?</h4>
        <p>Open a new terminal and tap 'grunt:watch'. That's end, you can change this page for a test, and deploy to see what's happening.</p>
        <c:if test="${devEnv}">Dev enviroment<br/></c:if>
		<input type="text" value="asdfasdfasdf" myid = "asda"/>
    	<b>hello world.</b>
    	
        <decorator:body></decorator:body>
    </body>
</html>