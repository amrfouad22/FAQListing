Function.registerNamespace('Insight.Common');
Insight.Common.GetSiteUrl = function () {
    return window.location.toString().substr(0, window.location.toString().indexOf("/FAQsApp/"));
}
Insight.Common.GetItemsREST = function (listName, query, renderFunction) {
    var RESTUrl =  Insight.Common.GetSiteUrl() +"/FAQsApp/_api/web/lists/GetByTitle('" + listName + "')/items?" + query;
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
    var html = '<li><a href="#" data-filter="*" class="active">All</a></li>';
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


//first render the FAQs categories
Insight.Common.GetItemsREST("FAQCategories", '$select=Title,DisplayText', Insight.Common.RenderFAQsCategories);
Insight.Common.GetItemsREST("FAQs", '$select=Title,FAQValue,FAQCategory/Title&$expand=FAQCategory/Title', Insight.Common.RenderFAQsItems);

