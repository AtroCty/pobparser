/*====================================================================================================================================*
  Fetch data into static data
  ====================================================================================================================================
  Version:      1.0.0
  Project Page: https://github.com/AtroCty/pobparser
  Copyright:    (c) 2020-2020 by Timm Schütte
  License:      GNU General Public License, version 3 (GPL-3.0)
                http://www.opensource.org/licenses/gpl-3.0.html
*====================================================================================================================================
    DEBUGGING ROUTINES
------------------------------------------------------------------------------------------------------------------------------------*/
function testFunction()
{
    // ConvertToStaticSheet('testsheet');
    createUniqueList('UNIQUEDUMP');
}

/*------------------------------------------------------------------------------------------------------------------------------------
    CONSTANTS
------------------------------------------------------------------------------------------------------------------------------------*/
const CURRENT_SPREADSHEET = SpreadsheetApp.getActiveSpreadsheet();
// -- SHEETS --
const SHEET_INFO = CURRENT_SPREADSHEET.getSheetByName('1. Info');
// -- CELLS --
const CELL_CURRENT_LEAGUE = SHEET_INFO.getRange('D13');

// -- PARAMETERS FOR API REQUESTS
const UNIQUE_CATEGORIES = ['UniqueJewel', 'UniqueFlask', 'UniqueWeapon','UniqueArmour','UniqueAccessory'];

function UpdateDataAll()
{
    CELL_CURRENT_LEAGUE.setValue(getCurrentLeague());
}

function getCurrentLeague()
{
    return ImportJSON("https://www.pathofexile.com/api/leagues?type=main&realm=pc&limit=1&offset=4", "/id")[1];
}

function createUniqueList(sheetname)
{
    // Purge old if exist
    if (CURRENT_SPREADSHEET.getSheetByName(sheetname))
    {
      CURRENT_SPREADSHEET.deleteSheet(CURRENT_SPREADSHEET.getSheetByName(sheetname))
    }
    var uniquesheet = CURRENT_SPREADSHEET.insertSheet(sheetname)
    var league = CELL_CURRENT_LEAGUE.getDisplayValue()
    UNIQUE_CATEGORIES.forEach(element => {
      if (CURRENT_SPREADSHEET.getSheetByName(element))
      {
        CURRENT_SPREADSHEET.deleteSheet(CURRENT_SPREADSHEET.getSheetByName(element))
      }
      var tempsheet = CURRENT_SPREADSHEET.insertSheet(element)
      tempsheet.getRange('A1').setFormula('=ImportJSON("https://poe.ninja/api/data/itemoverview?league=' + league + '&type='+ element + '";"/"; "noInherit, noTruncate")')
    });
}

/**
 * 
 * @param sheetname Spreadsheetname which needs to get converted
 */
function ConvertToStaticSheet(sheetname)
{
    var sheet = SpreadsheetApp.setActiveSheet(CURRENT_SPREADSHEET.getSheetByName(sheetname))
    var temp = CURRENT_SPREADSHEET.duplicateActiveSheet()
        
    var range = temp.getDataRange();
    range.copyTo(sheet.getDataRange(), { contentsOnly: true });
    CURRENT_SPREADSHEET.deleteSheet(temp);
}