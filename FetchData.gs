/*====================================================================================================================================*
  Fetch data into static data
  ====================================================================================================================================
  Version:      1.0.0
  Project Page: https://github.com/AtroCty/pobparser
  Copyright:    (c) 2020-2020 by Timm Schütte
  License:      GNU General Public License, version 3 (GPL-3.0)
                http://www.opensource.org/licenses/gpl-3.0.html
  ------------------------------------------------------------------------------------------------------------------------------------
  
*====================================================================================================================================*/

const SHEET_INFO = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('1. Info')
const CELL_CURRENT_LEAGUE = SHEET_INFO.getRange('D13')


function UpdateDataAll()
{
    CELL_CURRENT_LEAGUE.setValue(getCurrentLeague())
}



function getCurrentLeague()
{
    return ImportJSON("https://www.pathofexile.com/api/leagues?type=main&realm=pc&limit=1&offset=4", "/id")[1]
}
