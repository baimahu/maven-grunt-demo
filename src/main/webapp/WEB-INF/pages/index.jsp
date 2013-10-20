<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>index</title>
</head>
<body>
This is a index page.
Current main page url is ${baseUrl}.

<h3>This paragraph is only can be saw at production enviroment.</h3>


<a href="javascript:void(0);" id="alert">Alert Demo</a>


<script type="text/javascript" src="static/scripts/comm.min.js"></script>
<script type="text/javascript" src="static/scripts/main.min.js"></script>



</body>
</html>