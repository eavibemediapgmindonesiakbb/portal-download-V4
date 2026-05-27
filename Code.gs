function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
.setTitle('PGM Indonesia KBB')
.addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function cekLogin(nik, password) {
  const data = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0].getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][0]) == nik && String(data[i][1]) == password) {
      return {s:1,n:data[i][2],nik:data[i][0],st:data[i][3],i:data[i][4],l:data[i][5]};
    }
  }
  return {s:0,p:'NIK atau password salah'};
}
