$("body").on("click", "#btnDcrypt", function(){
  
  decrypt();
});

function decrypt() {
  var cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Hex.parse($("#cryptedData").val())
  });
  var pkBlocks = CryptoJS.enc.Utf8.parse($("#pk").val().padEnd(16, '0'));
  var decryptedData = CryptoJS.enc.Utf8.stringify(
    CryptoJS.AES.decrypt(cipherParams,pkBlocks, {
      'mode': CryptoJS.mode.ECB, 
      'padding': CryptoJS.pad.Pkcs7
    })
  );
  $("#decryptedData").val(decryptedData);
}
