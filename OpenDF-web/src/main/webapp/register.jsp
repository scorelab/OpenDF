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

    <body>
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="login-panel panel panel-default">                
                        <div class="panel-body">
                            <div class="panel-heading">
                                <img class="profile-img" src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT80r7crGcHV3eNA0QBU92K5Vw3GR-qVfym-RY_Gj288kML8p4YBA" alt="">
                                <h1 class="text-center login-title">O p e n D F</h1>
                            </div>

                            <form id="signup" class="form-horizontal" method="post" action="success.php" role="form">
                                <legend>Sign Up</legend>
                                <div class="control-group">
                                    <label class="control-label">First Name</label>
                                    <div class="controls">
                                        <div class="input-prepend">
                                            <span class="add-on"><i class="icon-user"></i></span>
                                            <input type="text" id="fname" name="fname" class="form-control" placeholder="First Name">
                                        </div>
                                    </div>
                                </div>
                                <div class="control-group ">
                                    <label class="control-label">Last Name</label>
                                    <div class="controls">
                                        <div class="input-prepend">
                                            <span class="add-on"><i class="icon-user"></i></span>
                                            <input type="text" id="lname" class="form-control" name="lname" placeholder="Last Name">
                                        </div>
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label">Email</label>
                                    <div class="controls">
                                        <div class="input-prepend">
                                            <span class="add-on"><i class="icon-envelope"></i></span>
                                            <input type="text" class="form-control" id="email" name="email" placeholder="Email">
                                        </div>
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label">Gender</label>
                                    <div class="controls">

                                        <p><div id="gender" name="gender" class="btn-group" data-toggle="buttons-radio">
                                            <button type="button" class="btn btn-info">Male</button>
                                            <button type="button" class="btn btn-info">Female</button>

                                        </div></p>

                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label">Password</label>
                                    <div class="controls">
                                        <div class="input-prepend">
                                            <span class="add-on"><i class="icon-lock"></i></span>
                                            <input type="Password" id="passwd" class="form-control" name="passwd" placeholder="Password">
                                        </div>
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label">Confirm Password</label>
                                    <div class="controls">
                                        <div class="input-prepend">
                                            <span class="add-on"><i class="icon-lock"></i></span>
                                            <input type="Password" id="conpasswd" class="form-control" name="conpasswd" placeholder="Re-enter Password">
                                        </div>
                                    </div>
                                </div>

                                <div class="control-group">
                                    <label class="control-label"></label>
                                    <div class="controls">
                                        <button type="submit" class="btn btn-success" >Create My Account</button>

                                    </div>

                                </div>

                            </form>
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

        <!-- Custom Theme JavaScript -->
        <script src="js/sb-admin-2.js"></script>

    </body>

</html>
