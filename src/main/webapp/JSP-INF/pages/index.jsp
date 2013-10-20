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
<!-- @if NODE_ENV == 'PRODUCTION' -->
<h3>This paragraph is only can be saw at production enviroment.</h3>
<!-- @endif -->

<a href="javascript:void(0);" id="alert">Alert Demo</a>

<!-- @if NODE_ENV == 'PRODUCTION' -->
<script type="text/javascript" src="static/scripts/comm.min.js"></script>
<script type="text/javascript" src="static/scripts/main.min.js"></script>
<!-- @endif -->

<!-- @if NODE_ENV == 'DEVELOPMENT' -->
<script type="text/javascript" src="static/libs/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript" src="static/libs/json2.js"></script>

<script type="text/javascript" src="static/scripts/App.js"></script>
<script type="text/javascript" src="static/scripts/test.js"></script>
<!-- @endif -->
</body>
</html>