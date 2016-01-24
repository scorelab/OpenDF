<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<%@ page import="javax.servlet.jsp.jstl.sql.Result" %>

<!-- get the number of users that exist and store as userCount -->
<sql:query dataSource="OpenDF" var="countResult">SELECT COUNT(*) FROM User;</sql:query>
<% Long userCount = (Long) ((Result) pageContext.getAttribute("countResult")).getRowsByIndex()[0][0]; %>

<!-- redirect to setup page if OpenDF has not been configured yet (no users) -->
<% if(userCount == 0) { response.sendRedirect("setup.jsp"); return; } %>


<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>OpenDF - Digital Forensics Cloud Tool</title>

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

<body ng-app"">
    <div class="navbar-default sidebar" role="navigation">
                    <div class="sidebar-nav navbar-collapse">
                        <ul class="nav" id="side-menu">
                            <li class="sidebar-user">
                                <div class="row">
                                    <div class="col-lg-4" >
                                        <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT80r7crGcHV3eNA0QBU92K5Vw3GR-qVfym-RY_Gj288kML8p4YBA" ></div>
                                                        
                                </div>
                                <!-- /input-group -->
                            </li>
                            <li class="active">
                                <a href="#/"><i class="fa fa-home fa-lg"></i> Register</a>
                            </li>
                            <li>
                                <a href="#/file-system"><i class="fa fa-folder-open fa-fw"></i>  About<span class="fa arrow"></span></a>
                                
                            </li>
                            <li>
                                <a href="tables.html"><i class="fa fa-eye fa-fw"></i>  Help</a>
                            </li>
                            <li>
                                <a href="#/bookmarks"><i class="fa fa-bookmark fa-fw"></i>  Contact</a>
                            </li>

                            <li>
                                
                            <li>
                                <a href="#/reports"><i class="fa fa-files-o fa-fw"></i>Documentation<span class="fa arrow"></span></a>
                            </li>
                            <li>
                                <a href="#"><i class="fa fa-gear fa-fw"></i>  Settings<span class="fa arrow"></span></a>
                                
                            </li>
                        </ul>
                    </div>
                    <!-- /.sidebar-collapse -->
                </div>
                <!-- /.navbar-static-side -->
            </nav>
<div id="context-wrapper" class="ng-view">
            <!-- Page Content -->
            

            
            <!-- /#page-wrapper -->

        
        <!-- /#wrapper -->

<div class="container">
        <div class="row">
            <div class="col-md-4 col-md-offset-4">
                <div class="login-panel panel panel-default">                
                    <div class="panel-body">
						<div class="panel-heading">
							<img class="profile-img" src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT80r7crGcHV3eNA0QBU92K5Vw3GR-qVfym-RY_Gj288kML8p4YBA" alt="">
							<h1 class="text-center login-title">OpenDF</h1>
						</div>
                        
                        <form role="form" action="userlogin" method="POST">
                            <% if(request.getParameter("msg")!=null) { %>
                            <div class="alert alert-warning alert-dismissible" role="alert">
                                <button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                                <strong>Error : </strong> ${fn:escapeXml(param.msg)}!
                            </div>
                            <% } %>
                            <fieldset>
                                <div class="form-group">
                                    <input class="form-control" placeholder="Username" name="username" type="text" ng-minlength="8" value="" pattern=".{5,}"   title="5 characters minimum" required>
                                </div>
                                <div class="form-group">
                                    <input class="form-control" placeholder="Password" name="password" type="password" value=""  pattern=".{8,}" title="8 characters minimum" required>
                                </div>
                                <!-- Change this to a button or input when using this as a form -->
                                <button type="submit" class="btn btn-lg btn-success btn-block">Login</a>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  </div>
  <!-- jQuery Version 1.11.0 -->
    <script src="js/jquery-1.11.0.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.24/angular.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="js/bootstrap.min.js"></script>

    <!-- Metis Menu Plugin JavaScript -->
    <script src="js/plugins/metisMenu/metisMenu.min.js"></script>

</body>

</html>
