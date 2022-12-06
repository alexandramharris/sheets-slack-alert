function triggerAlertOnChange(e) {
  CheckNotices()
}

function CheckNotices()
{
  // Fetch notices
  var companyNamesRange = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Notices").getRange("A2");
  var companyNames = companyNamesRange.getValue();
  console.log("current companyNames: ", companyNames)

  // Check company names
  var prev_companyNames = getPreviousCompanyName();
  console.log("prev_companyNames: ", prev_companyNames)

  if (companyNames != prev_companyNames) {
    // Send slack alert
    sendSlackAlert(companyNames)
  } else {
    console.log("The alert was not sent.");
  }

  updateCache(companyNames);
}

function updateCache(new_value) {
  ScriptProperties.setProperty("companyName", new_value)
}

function getPreviousCompanyName() {
  return ScriptProperties.getProperty("companyName")
}

 function sendSlackAlert(companyNames) {
    var url = "ADD WEBHOOK HERE";
    var payload = {
      text: (':rotating_light: *New layoff notice* :rotating_light: \n From ' + companyNames + '\n Check out the full notice: https://dol.ny.gov/warn-notices \n <!here>')
          }

    var headers = {
        'Content-type': 'application/json'
          }
    var options = {
          headers: headers,
          method: 'POST',
          payload: JSON.stringify(payload)
          }
    UrlFetchApp.fetch(url, options);
 }
