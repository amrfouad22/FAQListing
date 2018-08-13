<%@ Page language="C#" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<WebPartPages:AllowFraming ID="AllowFraming"  height="100%" runat="server" width="100%"/>

<html>
<head>
     <meta charset="utf-8">
    <title>FAQs App</title>

    <script type="text/javascript" src="../Scripts/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="/_layouts/15/MicrosoftAjax.js"></script>
    <script type="text/javascript" src="/_layouts/15/init.js"></script>
    <script type="text/javascript" src="/_layouts/15/SP.Core.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.runtime.debug.js"></script> 
    <script type="text/javascript" src="/_layouts/15/SP.UI.Dialog.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.js"></script>
      <script type="text/javascript">
          'use strict';
          // Set the style of the client web part page to be consistent with the host web.
          (function () {
              var hostUrl = '';
              if (document.URL.indexOf('?') != -1) {
                  var params = document.URL.split('?')[1].split('&');
                  for (var i = 0; i < params.length; i++) {
                      var p = decodeURIComponent(params[i]);
                      if (/^SPHostUrl=/i.test(p)) {
                          hostUrl = p.split('=')[1];
                          document.write('<link rel="stylesheet" href="' + hostUrl + '/_layouts/15/defaultcss.ashx" />');
                          break;
                      }
                  }
              }
              if (hostUrl == '') {
                  document.write('<link rel="stylesheet" href="/_layouts/15/1033/styles/themable/corev15.css" />');
              }
          })();
    </script>
    <meta class="viewport" name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- Font -->
    <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Arimo:400,700,400italic,700italic'>
    <!-- Plagins CSS -->
    <link rel="stylesheet" href="../Content/buttons/buttons.css">
    <link rel="stylesheet" href="../Content/buttons/social-icons.css">
    <link rel="stylesheet" href="../Content/font-awesome.min.css">
    <link rel="stylesheet" href="../Content/bootstrap.min.css">
    <link rel="stylesheet" href="../Content/settings.css">
    <link rel="stylesheet" href="../Content/jquery.fancybox.css">
    <link rel="stylesheet" href="../Content/animate.css">  
    <!-- Theme CSS -->
    <link rel="stylesheet" href="../Content/style.css">
    <!-- Responsive CSS -->
    <link rel="stylesheet" href="../Content/responsive.css">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="../Content/customizer/pages.css">
    <link rel="stylesheet" href="../Content/customizer/elements-pages-customizer.css">
    <!-- IE Styles-->
    <link rel='stylesheet' href="../Content/ie/ie.css">
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <link rel='stylesheet' href="css/ie/ie8.css">
    <![endif]-->
    <script type="text/javascript">
        var senderId;
        var hostUrl = null;
        //Main function to change the size dynamically.
        function ResizeAppPart() {
            if (window.parent == null)
                return;

            // Extracts the host url and sender Id  values from the query string.
            var params = document.URL.split("?")[1].split("&");
            for (var i = 0; i < params.length; i = i + 1) {
                var param = params[i].split("=");
                if (hostUrl == null) {
                    hostUrl = decodeURIComponent(param[1]);
                }

                if (i == (params.length - 1))
                    senderId = decodeURIComponent(param[1]);
            }

            var height = 800;
            var width = "100%";
            //use postmessage to resize the app part.
            var message = "<Message senderId=" + senderId + " >"
                    + "resize(" + width + "," + height + ")</Message>";
            window.parent.postMessage(message, hostUrl);
        }
        ResizeAppPart();

    </script>
</head>
<body class="fixed-header">
    <section id="main" class="no-padding">
        <header class="page-header">
            <div class="container">
                <h1 class="title">FAQs</h1>
            </div>	
        </header>
        <div class="container">
            <div class="row">
                <div class="filter-box accordions-filter">
		          <div class="btn-group filter-buttons filter-list">
			        <button type="button" class="dropdown-toggle" data-toggle="dropdown">All<span class="caret"></span></button>
			            <ul class="dropdown-menu" role="menu" id="FAQsCat">
			            </ul>
			            <div class="clearfix"></div>
		          </div>
                <div class="panel-group filter-elements" id="accordion">
		        </div>
            </div>
	        </div>
        </div>
    </section>
    <script type="text/javascript">
     
</script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="../Scripts/bootstrap.min.js"></script>
    <script src="../Scripts/masonry.pkgd.min.js"></script>
    <script src="../Scripts/jquery.fancybox.pack.js"></script>
    <script src="../Scripts/raphael.min.js"></script>
    <script src="../Scripts/main.js"></script>
    <script type="text/javascript" src="../Scripts/FAQsAppCtrl.js"></script>
</body>

</html>
