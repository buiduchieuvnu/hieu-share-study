const BluetoothHelper = {

	Spo2:{
		get:function(sUrl, oData){
			try {
				var oAUTH =  JSON.parse(localStorage.getItem('AUTH'));
				if (!oAUTH) {
					console.log('WARNING',LABEL.VI.WARNING_TOKEN_NULL);
					location.replace(CONFIG_APP.URL.LOGINPAGE);
				}
				var sToken = oAUTH.Token;
				var sTokenType = oAUTH.TokenType;
				_rs = null;
				var request = $.ajax({
					url: CONFIG_APP.URL.API_DATA + '/get/' + sUrl,
					type: "POST",
					data: JSON.stringify(oData),
					contentType: 'application/json; charset=utf-8',
					dataType: "json",
					async: false,
					beforeSend: function (xhr) {
						xhr.setRequestHeader("appcode", CONFIG_APP.APPCODE);
						xhr.setRequestHeader("Authorization", sToken);
					}
				});
				request.done(function (_response) {
					//console.log('_response',_response);
					_rs = _response;
				});	
				request.fail(function (jqXHR, textStatus) {
					alert("ERR: " + textStatus);
					return false;
				});
				// Response Null
				if(!_rs){alert('ERR: Return NULL'); return false;}

				// JWT expired 
				if(_rs.CODE==401){
					alert('Phiên làm việc đã hết hạn, vui lòng đăng nhập lại.');
					localStorage.clear();
					location.replace(CONFIG_APP.URL.CONTEXT + CONFIG_APP.URL.LOGIN);
					return false;
				}

				// Error
				if(_rs.CODE != 0){
					console.log('ERROR | ApiHelper.Data.Get | ',_rs.MESSAGE);
					return {
						CODE:3,
						MESSAGE: 'ERROR | ApiHelper.Data.Get | ' + _rs.MESSAGE,
						RESULT:[]
					}
				}

				return _rs;
			} catch (error) {
				return {
					CODE:3,
					MESSAGE: 'ERROR',
					RESULT:error
				}
			}
		},
		set:function(sUrl, oData){
			try {
				var oAUTH =  JSON.parse(localStorage.getItem('AUTH'));
				if (!oAUTH) {
					console.log('WARNING',LABEL.VI.WARNING_TOKEN_NULL);
					location.replace(CONFIG_APP.URL.LOGINPAGE);
				}
				var sToken = oAUTH.Token;
				var sTokenType = oAUTH.TokenType;
				_rs = null;
				var request = $.ajax({
					url: CONFIG_APP.URL.API_DATA + '/set/' + sUrl,
					type: "POST",
					data: JSON.stringify(oData),
					contentType: 'application/json; charset=utf-8',
					dataType: "json",
					async: false,
					beforeSend: function (xhr) {
						xhr.setRequestHeader("appcode", CONFIG_APP.APPCODE);
						xhr.setRequestHeader("Authorization", sToken);
					}
				});
				request.done(function (_response) {
					//console.log('_response',_response);
					_rs = _response;
				});	
				request.fail(function (jqXHR, textStatus) {
					alert("ERR: " + textStatus);
					return false;
				});
				// Response Null
				if(!_rs){alert('ERR: Return NULL'); return false;}

				// JWT expired 
				if(_rs.CODE==401){
					alert('Phiên làm việc đã hết hạn, vui lòng đăng nhập lại.');
					localStorage.clear();
					location.replace(CONFIG_APP.URL.CONTEXT + CONFIG_APP.URL.LOGIN);
					return false;
				}

				// Error
				if(_rs.CODE != 0){console.log('API DATA:',_rs.MESSAGE);}

				return _rs;
			} catch (error) {
				return {
					CODE:3,
					MESSAGE: 'ERROR',
					RESULT:error
				}
			}
		}
	},
	Authen:{
		checkToken:function(){
			try {
				const oAUTH =  JSON.parse(localStorage.getItem('AUTH'));
				if (!oAUTH) {
					return false;
				}

				const oData={key:''};
				var sToken = oAUTH.Token;
				var sTokenType = oAUTH.TokenType;
				_rs = null;
				var request = $.ajax({
					url: CONFIG_APP.API.DATA + '/get/' + CONFIG_APP.URL.CHECK_TOKEN,
					type: "POST",
					data: JSON.stringify(oData),
					contentType: 'application/json; charset=utf-8',
					dataType: "json",
					async: false,
					beforeSend: function (xhr) {
						xhr.setRequestHeader("appcode", CONFIG_APP.APPCODE);
						xhr.setRequestHeader("Authorization", sToken);
					}
				});
				request.done(function (_response) {
					//console.log('_response',_response);
					_rs = _response;
				});	
				request.fail(function (jqXHR, textStatus) {
					alert("ERR: " + textStatus);
					return false;
				});
				// Response Null
				if(!_rs){alert('ERR: Return NULL'); return false;}

				// JWT expired 
				if(_rs.CODE != 0){
					return false;
				}
				return true;
			} catch (error) {
				false;
			}
		},
		login:function(sUsername, sPassword){
			try {
				var oData = {
					username:sUsername,
					password: sPassword
				}
				_rs = null;
				var request = $.ajax({
					url: CONFIG_APP.API.AUTHEN,
					type: "POST",
					data: JSON.stringify(oData),
					contentType: 'application/json; charset=utf-8',
					dataType: "json",
					async: false,
					beforeSend: function (xhr) {}
				});
				request.done(function (_response) {
					_rs = _response;
				});	
				request.fail(function (jqXHR, textStatus) {
					console.log('ApiHelper.Authen.login | ',textStatus,jqXHR);
					return {
						CODE:3,
						MESSAGE: 'Đăng nhập thất bại, đã có lỗi xảy ra tại server',
						RESULT:textStatus
					}
				});
				// Response Null
				if(!_rs){
					console.log('ApiHelper.Authen.login | ',textStatus,jqXHR);
					return {
						CODE:3,
						MESSAGE: 'Đăng nhập thất bại, không có dữ liệu trả về',
						RESULT:textStatus
					}
				}

				// Error
				if(_rs.CODE != 0){console.log('API DATA:',_rs.MESSAGE);}

				return _rs;
			} catch (error) {
				console.log('ApiHelper.Authen.login | ',error);
				return {
					CODE:3,
					MESSAGE: 'Đăng nhập thất bại, đã có lỗi xảy ra tại server',
					RESULT:error
				}
			}
		},
		logout:function(){
			localStorage.clear();
			location.replace(CONFIG_APP.URL.CONTEXT + CONFIG_APP.URL.LOGIN);
		}
	}
}