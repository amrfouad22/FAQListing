Function.registerNamespace('Insight.Common');
Insight.Common.GetSiteUrl = function () {
    return window.location.toString().substr(0, window.location.toString().indexOf("/FAQsApp/"));
}
Insight.Common.GetItemsREST = function (listName, query, renderFunction) {
    var RESTUrl = Insight.Common.GetSiteUrl() + "/FAQsListing/_api/web/lists/GetByTitle('" + listName + "')/items?" + query;
    $.ajax(
                {
                    url: RESTUrl,
                    method: "GET",
                    headers: {
                        "accept": "application/json; odata=verbose",
                    },
                    success: function (data) {
                        if (data.d.results.length > 0) {
                            //render the data
                            renderFunction(data.d.results);
                        }
                    },
                    error: function (err) {
                    },
                }
            );
};
Insight.Common.GetApplicationConfig=function(configName,callback){
    var context = SP.ClientContext.get_current();
    var web = context.get_web();
    var props = web.get_allProperties();
    context.load(props);
    context.executeQueryAsync(function(){
        try {
            callback(props.get_item("ITEM_COUNT"));
        }
        catch (e) {
            callback(6);
        }
    }, function(){
        callback(6);
    });
};

Insight.Common.RenderFAQsCategories = function (listItems) {
    $("#title").html(FAQTitle);
    var html = '<li><a href="#" data-filter="*" class="active">' + AllText + '</a></li>';
    var template = '<li><a href="#" data-filter=".{0}" class="">{1}</a></li>';
    for (var i = 0; i < listItems.length ; i++) {

        html += String.format(template, listItems[i].Title, listItems[i].DisplayText);
    }
    $("#FAQsCat").html(html);
}

Insight.Common.RenderFAQsItems = function (listItems) {
    var html = "";
    var template = '<div class="panel panel-default panel-bg {0}">\
			  <div class="panel-heading">\
				<div class="panel-title">\
				  <a data-toggle="collapse" data-parent="#accordion" href="#collapse{1}">\
					{2}\
				  </a>\
				</div>\
			  </div>\
			  <div id="collapse{1}" class="panel-collapse collapse">\
				<div class="panel-body">\
				{3}\
				</div>\
			  </div>\
			</div>';
    for (var i = 0; i < listItems.length ; i++) {

        html += String.format(template, listItems[i].FAQCategory.Title, i, listItems[i].Title, listItems[i].FAQValue);
    }
    $("#accordion").html(html);
    tabs();
    accordions();
    isotopFilter();
}

Insight.Common.GetParameterByName=function(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

//get the configuration from the url
var FAQTitle = Insight.Common.GetParameterByName('FAQTitle');
var AllText = Insight.Common.GetParameterByName('AllText');
var PageFilter = Insight.Common.GetParameterByName('PageFilter');
//first render the FAQs categories
Insight.Common.GetItemsREST("FAQCategories", '$select=Title,DisplayText', Insight.Common.RenderFAQsCategories);
var order = "&$orderby=Order asc";
var query = '$select=Title,FAQValue,FAQCategory/Title&$expand=FAQCategory/Title';
if (PageFilter) {
    query += "&$filter=Filter eq '" + PageFilter + "'";
}
Insight.Common.GetItemsREST("FAQs", query, Insight.Common.RenderFAQsItems);

