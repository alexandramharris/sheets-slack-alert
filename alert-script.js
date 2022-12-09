function triggerAlertOnChange(e) {
  CheckNotices();
}

function CheckNotices() {
  // Fetch notices
  var companyNamesRange = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Notices").getRange("A2");
  var companyNames = companyNamesRange.getValue();

  // Check company names
  var prev_companyNames = getPreviousCompanyName();

  // Check if companyNames contains "Capital Region" or "Mid-Hudson Valley"
  if (companyNames.includes("Capital Region") || companyNames.includes("Mid-Hudson Valley")) {
      var text = ":rotating_light: *New local layoff notice* :rotating_light: \n From " + companyNames + "\n Check out the full notice: https://dol.ny.gov/warn-notices \n <!here>";
    } else {
      var text = "*New layoff notice in New York* \n From " + companyNames + "\n Check out the full notice: https://dol.ny.gov/warn-notices";
    }

    if (companyNames != prev_companyNames) {
      // Send slack alert
      sendSlackAlert(text);
    } else {
      // Do nothing
    }

    updateCache(companyNames);
  }

function updateCache(new_value) {
  ScriptProperties.setProperty("companyName", new_value);
}

function getPreviousCompanyName() {
  return ScriptProperties.getProperty("companyName");
}

function sendSlackAlert(text) {
    var url = "ADD HOOK FOR CHANNEL HERE";
    var payload = {
      text: text
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
