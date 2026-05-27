function doGet(e) {
  // Handle login dari GitHub Pages
  if (e.parameter.action === 'login') {
    const result = cekLogin(e.parameter.nik, e.parameter.password);
    
    // JSONP biar ga kena CORS
    const callback = e.parameter.callback;
    const output = ContentService.createTextOutput();
    if (callback) {
      output.setContent(callback + '(' + JSON.stringify(result) + ')');
    } else {
      output.setContent(JSON.stringify(result));
    }
    return output.setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  
  return HtmlService.createTemplateFromFile('index')
.evaluate()
.setTitle('PGM Indonesia KBB')
.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function cekLogin(nik, password) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('data sertifikat'); // GANTI NAMA SHEET LO
    const data = sheet.getDataRange().getValues();
    
    for (let i = 1; i < data.length; i++) {
      if (String(data[i][0]).trim() == String(nik).trim() && String(data[i][1]).trim() == String(password).trim()) {
        return {
          success: true,
          nama: data[i][2],
          nik: data[i][0],
          status: data[i][3],
          iuran: data[i][4],
          linkSertifikat: data[i][5],
          foto: data[i][6] || 'https://i.pravatar.cc/40'
        };
      }
    }
    return {success: false, pesan: 'NIK atau password salah'};
  } catch(err) {
    return {success: false, pesan: 'Error server: ' + err};
  }
}
