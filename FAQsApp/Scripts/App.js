var context;
var web;
var user;
var query;
var list;
var listItems;
var rowCount;
var props;
// This code runs when the DOM is ready and creates a context object which is needed to use the SharePoint object model
SP.SOD.executeOrDelayUntilScriptLoaded(function () {
    readApplicationSettings();
}, 'sp.js'
);
function readApplicationSettings() {
    context = SP.ClientContext.get_current();
    web = context.get_web();
    props = web.get_allProperties();
    context.load(this.props);
    context.executeQueryAsync(Function.createDelegate(this, gotProperty), Function.createDelegate(this, failedGettingProperty));
}
function gotProperty() {
    try {
        rowCount = this.props.get_item("ITEM_COUNT");
    }
    catch (e) {
        rowCount = 6;
    }
    readItems();
}
function failedGettingProperty() {
    rowCount = 6;
    readItems();
}