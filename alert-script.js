function CheckNotices() {
  try {
    var companyNamesRange = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Notices").getRange("A2:A");
    var companyNames = companyNamesRange.getValues();

    console.log("companyNames:", companyNames);

    var processedCompanyNames = getProcessedCompanyNames();

    console.log("processedCompanyNames:", processedCompanyNames);

    for (var i = 0; i < companyNames.length; i++) {
      var companyName = companyNames[i][0];
      if (companyName && !processedCompanyNames.includes(companyName)) {
        processedCompanyNames.push(companyName);
        if (companyName.includes("Capital Region") || companyName.includes("Mid-Hudson Region")) {
          var text = ":rotating_light: *New local layoff notice* :rotating_light: \nFrom " + companyName + "\n\nCheck out the full notice: https://dol.ny.gov/warn-notices \n<!here>";
        } else {
          var text = ":bell: *New layoff notice in New York* :bell: \nFrom " + companyName + "\n\nCheck out the full notice: https://dol.ny.gov/warn-notices";
        }
        // Send slack alert
        sendSlackAlert(text);
      }
    }

    updateProcessedCompanyNames(processedCompanyNames);
  } catch (error) {
    console.error(error);
  }
}

function updateProcessedCompanyNames(new_value) {
  ScriptProperties.setProperty("processedCompanyNames", JSON.stringify(new_value));
}

function getProcessedCompanyNames() {
  var processedCompanyNames = ScriptProperties.getProperty("processedCompanyNames");
  if (processedCompanyNames) {
    return JSON.parse(processedCompanyNames);
  } else {
    return [];
  }
}

function sendSlackAlert(text) {
  var url = "URL GOES HERE";
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
}
