/**
 * OPTIONAL Google Sheets lead logger.
 *
 * Setup:
 * 1) Create a Google Sheet.
 * 2) Extensions -> Apps Script.
 * 3) Paste this file.
 * 4) Replace SHEET_NAME if desired.
 * 5) Deploy -> New deployment -> Web app.
 *    Execute as: Me
 *    Who has access: Anyone
 * 6) Copy the /exec URL into googleAppsScriptUrl in config.js.
 */

const SHEET_NAME = "Leads";

function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

  const data = JSON.parse(e.postData.contents || "{}");
  const t = data.tracking || {};

  const headers = [
    "Submitted At","Qualified","Priority","Applicant Name","Store Name",
    "Area","Category","Ad Budget","Fee Fit","Start",
    "UTM Source","UTM Medium","UTM Campaign","UTM Content","UTM Term",
    "FBCLID","Landing Area","Page URL"
  ];

  if (sheet.getLastRow() === 0) sheet.appendRow(headers);

  sheet.appendRow([
    data.submittedAt || new Date().toISOString(),
    data.qualified === true,
    data.priority || "",
    data.applicantName || "",
    data.storeName || "",
    data.areaLabel || data.area || "",
    data.categoryLabel || data.category || "",
    data.adBudgetLabel || data.adBudget || "",
    data.feeFitLabel || data.feeFit || "",
    data.startLabel || data.start || "",
    t.utm_source || "",
    t.utm_medium || "",
    t.utm_campaign || "",
    t.utm_content || "",
    t.utm_term || "",
    t.fbclid || "",
    t.landing_area || "",
    data.pageUrl || ""
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ok:true}))
    .setMimeType(ContentService.MimeType.JSON);
}
