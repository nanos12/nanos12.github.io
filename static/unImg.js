function unImg(evt) {
	$.ajax({
		'url': $("#uncodeImgInput").val(),
		'method': 'GET',
		'xhrFields': {
			'responseType': 'arraybuffer'
		}
	}).done(function(buff) {
		var fileBuf;
		var buffArr = new Uint8ClampedArray(buff);
		var dataStr = arrayBufferToBase64(buffArr);
		var startedPoint = dataStr.indexOf("**");
		var fileBase64 = dataStr.substring(startedPoint + 2);
		var bStr = atob(fileBase64);
		fileBuf = _base64ToArrayBuffer(bStr);
		var selectedOpt = parseInt($("#encodeSelect").val());
		var txtDecoder = new TextDecoder();
		
		if(selectedOpt <= 1) {
			$("#outputStr").val(selectedOpt == 1 ? bStr : txtDecoder.decode(fileBuf));
		}
		else {
			var dlBtn = document.createElement('a');
			var dlUrl = URL.createObjectURL(new Blob([fileBuf]));
			dlBtn.href = dlUrl;
			dlBtn.download = dlUrl.split('/').pop();
			document.body.appendChild(dlBtn);
			dlBtn.click();
			document.body.removeChild(dlBtn);
			URL.revokeObjectURL(dlUrl);
		}
	});
}

function _base64ToArrayBuffer(binary_string) {
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

function arrayBufferToBase64(buffArr) {
	var binary = '';
	var len = buffArr.byteLength;
	for (var i = 0; i < len; i++) {
		binary += String.fromCharCode(buffArr[i]);
	}
	return  binary;
}
