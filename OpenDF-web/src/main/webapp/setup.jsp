<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<%@ page import="javax.servlet.jsp.jstl.sql.Result" %>

<!-- get the number of users that exist and store as userCount -->
<sql:query dataSource="OpenDF" var="countResult">SELECT COUNT(*) FROM User;</sql:query>
<% Long userCount = (Long) ((Result) pageContext.getAttribute("countResult")).getRowsByIndex()[0][0]; %>

<!-- redirect to index page if OpenDF has already been setup (there is at least one user) -->
<% if(userCount > 0) { response.sendRedirect("index.jsp"); return; } %>
<!DOCTYPE html>
<html lang="en">

    <head>

        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <meta name="author" content="">

        <title>OpenDF - Initial Setup</title>

        <!-- Bootstrap Core CSS -->
        <link href="css/bootstrap.min.css" rel="stylesheet">

        <!-- MetisMenu CSS -->
        <link href="css/plugins/metisMenu/metisMenu.min.css" rel="stylesheet">

        <!-- Custom CSS -->
        <link href="css/styles.css" rel="stylesheet">

        <!-- Custom Fonts -->
        <link href="font-awesome-4.1.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">

        <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
            <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
            <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->

    </head>

    <body ng-app="">
        <div class="container">
            <div class="row">
                <div class="col-md-4 col-md-offset-4">
                    <div class="login-panel panel panel-default">
                        <div class="panel-body">
                            <div class="panel-heading">
                                <h1 class="text-center login-title">Setup OpenDF</h1>
                                <h4>Administator account details</h4>
                            </div>

                            <form role="form" action="initialsetup" method="POST">
                                <% if (request.getParameter("msg") != null) { %>
                                <div class="alert alert-warning alert-dismissible" role="alert">
                                    <button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                                    <strong>Error : </strong> ${fn:escapeXml(param.msg)}!
                                </div>
                                <% }%>
                                <fieldset>
                                    <div class="form-group">
                                        <label>Username</label>
                                        <input class="form-control" placeholder="Username" name="username" type="text" ng-minlength="5" value="" pattern=".{5,}"   title="5 characters minimum" required>
                                    </div>
                                    <div class="form-group">
                                        <label>Password</label>
                                        <input class="form-control" placeholder="Password" name="password" type="password" value=""  pattern=".{8,}" title="8 characters minimum" required>
                                    </div>
                                    <div class="form-group">
                                        <label>Confirm password</label>
                                        <input class="form-control" placeholder="Confirm password" name="password_confirm" type="password" value=""  pattern=".{8,}" title="8 characters minimum" required>
                                    </div>
                                    <div class="form-group">
                                        <label>Email</label>
                                        <input class="form-control" placeholder="Email" name="email" type="text" ng-minlength="5" value="" pattern=".{5,}"   title="5 characters minimum" required>
                                    </div>
                                    <div class="form-group">
                                        <label>Name</label>
                                        <input class="form-control" placeholder="Name" name="name" type="text" ng-minlength="1" value="" pattern=".{1,}"   title="1 characters minimum" required>
                                    </div>
                                    <!-- Change this to a button or input when using this as a form -->
                                    <button type="submit" class="btn btn-lg btn-success btn-block">Create admin account</a>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </body>

</html>
