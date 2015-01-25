<% Object idUser = session.getAttribute("user"); if(idUser == null ) response.sendRedirect("login.jsp");%>
<%@page contentType="text/html" pageEncoding="UTF-8" %>
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

        <!-- Timeline CSS -->
        <link href="css/plugins/timeline.css" rel="stylesheet">
        
        <!-- Custom Fonts -->
        <link href="font-awesome-4.1.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">

        <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
            <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
            <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->

    </head>

    <body ng-app="OpenDFApp" ng-init="">

        <div id="wrapper">
            <nav class="navbar navbar-default navbar-static-top main-menu" role="navigation" style="margin-bottom: 0">
                <div class="navbar-header">
                    <a class="navbar-brand OpenDF " href="index.jsp">OpenDF
                        <small class="title"  >/ Dashboard</small>
                    </a>

                </div>

                <ul class="nav navbar-top-links navbar-right">
                    
                    <li>
                        <a  href="#">
                            <i class="fa fa-bell-o"></i> Notifications 
                            <span class="notification-counter" ng-show="notifications.length">{{notifications.length}}</span> 
                        </a>
                    </li>
                    <li>
                        <a  href="Logout">
                            <i class="fa fa-sign-out"></i> Logout
                        </a>
                    </li>
                </ul>
                <!-- /.navbar-top-links -->

                <div class="navbar-default sidebar" role="navigation">
                    <div class="sidebar-nav navbar-collapse">
                        <ul class="nav" id="side-menu" ng-controller="userController">
                            <li class="sidebar-user">
                                <div class="row">
                                    <div class="col-lg-4" >
                                        <img ng-src="{{user.avatar}}"  ></div>
                                    <div class="col-lg-8" ><h4 >{{user.name}}</h4></div>                         
                                </div>
                                <!-- /input-group -->
                            </li>
                            <li class="active">
                                <a href="index.jsp"> Home</a>
                            </li>
                            <li ng-show="user.level == 0 ">
                                <a href="#/investigators">Investigators</a>
                            </li>
                           <li ng-show="user.level == 0 ">
                                <a href="#/logs">Logs</a>
                            </li>
                            <li>
                                <a href="#"></i> Settings<span class="fa arrow"></span></a>
                                <ul class="nav nav-second-level">
                                    <li>
                                        <a href="#/settings/account">Account</a>
                                    </li>
                                </ul>
                                <!-- /.nav-second-level -->
                            </li>
                        </ul>
                    </div>
                    <!-- /.sidebar-collapse -->
                </div>
                <!-- /.navbar-static-side -->
            </nav>

            <!-- Page Content -->
            <div id="context-wrapper" class="ng-view">

            </div>
            <!-- /#page-wrapper -->

        </div>
        <!-- /#wrapper -->

        <!-- jQuery Version 1.11.0 -->
        <script src="js/jquery-1.11.0.js"></script>

        <!-- Bootstrap Core JavaScript -->
        <script src="js/bootstrap.min.js"></script>

        <!-- AngularJS  JavaScript -->
        <script src="js/angular.js"></script>
        <script src="js/angular-route.js"></script>
        <script src="js/angular-resource.js"></script>

        <!-- Metis Menu Plugin JavaScript -->
        <script src="js/plugins/metisMenu/metisMenu.min.js"></script>

        <!-- Custom Theme JavaScript -->
        <script src="js/main.js"></script>

        <!-- Custom Theme JavaScript -->
        <script src="js/index.js"></script>

    </body>

</html>


