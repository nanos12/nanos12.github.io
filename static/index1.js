$("body").on("click", "#btnDcrypt1", function(){
  
  decrypt1();
});

function decrypt1() {
  var encryptedData = $("#cryptedData").val();
  var dataArr = encryptedData.split('');
  var prefixCode = CryptoJS.enc.Utf8.parse("$#").toString();
	var suffixCode = CryptoJS.enc.Utf8.parse("#$").toString();
	var pwdMix = dataArr.splice(0, encryptedData.indexOf(suffixCode) + 4).join('');
	var roundtimeInHax = dataArr.splice(dataArr.length - 26, 26).join('');
	var encryptedText = dataArr.join('');
	var pwdInHax = pwdMix.substring(prefixCode.length, pwdMix.length - suffixCode.length);
	var roundTime = CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Hex.parse(roundtimeInHax));
	var pwd = CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Hex.parse(pwdInHax));
  
	var iv = CryptoJS.enc.Utf8.parse(roundTime.padEnd(16, '0'));
	var pkBlocks = CryptoJS.enc.Utf8.parse(pwd.padEnd(16, '0'));
	var cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Hex.parse(encryptedText)
  });
  var decryptedData = CryptoJS.enc.Utf8.stringify(
    CryptoJS.AES.decrypt(cipherParams,pkBlocks, {
      'iv': iv,
      'mode': CryptoJS.mode.CBC, 
      'padding': CryptoJS.pad.Pkcs7
    })
  );	
  $("#decryptedData").val(decryptedData);
}
