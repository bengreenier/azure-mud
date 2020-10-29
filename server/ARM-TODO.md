* Replace parameter names with template values and/or random values
* Parameterize Redis properties
* Parameterize server farm
* Are all of these necessary?
  * microsoft.insights/components
  * Microsoft.Web/serverfarms
  * microsoft.alertsmanagement/smartdetectoralertrules
* SignalR CORS
  * Confirm this works okay if I set CORS for the live app?
* Parameterize Microsoft.Web/sites CORS settings (hardcode localhost, field for deployment). Try to hook that into SignalR as well
* Is it possible to create the broader things without the minute-level resources? Look into pre-existing templates for a Function app
* Can I hardcode a known deployment (both the bundle ZIP and each individual API function), and can I update that deployment automatically via GH Actions?
* App Settings
    * Where do I set them? (Microsoft.Web/sites, maybe? What's the difference between app settings, connection strings, etc)
    * ListKeys to get the actual value: https://stackoverflow.com/questions/43976134/get-connection-strings-in-arm/43991714
* Can I enable authentication?
* smartdetectoralertrules — parameterize the external ID? Maybe just look at a template for this?