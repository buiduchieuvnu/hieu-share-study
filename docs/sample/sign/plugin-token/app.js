var App = function () {
	// Properties
	var that = this;
	this.AppName = 'Sign | Sample ký điện tử token sử dụng plugin';
    this.LogContent = '';
    // Get the modal
    

    this.initPage = function(){
		$('#hAppName').html(that.AppName);
        document.title = that.AppName;
        that.log('Startup!');
	}

    this.log = function (msg) {
        var datetime = '';
        var date = new Date();
        datetime = date.toLocaleString('en-GB');
        that.LogContent += datetime + ' | ' + msg + `\r\n`;
        $('#txtLog').val(that.LogContent);
        var psconsole = $('#txtLog');
        if (psconsole.length)
            psconsole.scrollTop(psconsole[0].scrollHeight - psconsole.height());
    }

    this.clearLog = function(){
        that.LogContent = '';
        that.log('Clear!');
	}

    this.openPopup = function(url, title, w, h){
        // Fixes dual-screen position                             Most browsers      Firefox
        const dualScreenLeft = window.screenLeft !==  undefined ? window.screenLeft : window.screenX;
        const dualScreenTop = window.screenTop !==  undefined   ? window.screenTop  : window.screenY;

        const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

        const systemZoom = width / window.screen.availWidth;
        const left = (width - w) / 2 / systemZoom + dualScreenLeft
        const top = (height - h) / 2 / systemZoom + dualScreenTop
        const newWindow = window.open(url, title, 
        `
        scrollbars=yes,
        width=${w / systemZoom}, 
        height=${h / systemZoom}, 
        top=${top}, 
        left=${left}
        `
        )
        if (window.focus) newWindow.focus();
    }

    this.openModal = function(url){
        document.getElementById('ifPopup').src = url;
    }

    this.closeModal = function(url){
        var _modal = document.getElementById("myModal");
        document.getElementById('ifPopup').src = null;
        _modal.style.display = "none";
    }


    this.kyToken = function(){
        var baseUrl = $('#baseUrl').val();
        var rptCode = $('#rptCode').val();
        var type = $('#type').val();
        var urlFile = $('#urlFile').val();
        var token = $('#token').val();
        var w = $('#width').val();
        var h = $('#height').val();

        if(!baseUrl){
            alert('Cảnh báo: bắt buộc nhập baseUrl!');
            $('#baseUrl').focus();
            return false;
        }

        if(!urlFile){
            alert('Cảnh báo: bắt buộc nhập urlFile!');
            $('#urlFile').focus();
            return false;
        }

        if(!token){
            alert('Cảnh báo: bắt buộc nhập token!');
            $('#token').focus();
            return false;
        }

        that.log('Bắt đầu ký token...');
        that.log('baseUrl: ' + baseUrl);
        that.log('rptCode: ' + rptCode);
        that.log('urlFile: ' + urlFile);
        that.log('type: ' + type);
        that.log('token: ' + token);
        var _url = baseUrl + '?type=' + type + '&urlFile=' + urlFile + '&token=' + token + '&rptCode=' + rptCode;
        var _title = 'Ký số token Plugin';
        that.log('_url: ' + _url);
        //that.openPopup(_url,_title,w,h);
        that.openModal(_url);
    }



	// Methods
    $(document).ready(function () {
        

		that.initPage();

        $('.ACTIONS').on('click','#btnClearLog',function(){
			that.clearLog();
		});

        $('.ACTIONS').on('click','#btnKyToken',function(){
			that.kyToken();
		});

        $('.FORM').on('change','#type',function(){
			var type = $('#type').val();
            that.log('Change type: ' + type);
            if (type == 'xml') {
                $('#rptCode').val('BM_PHIEU_KETQUA_XETNGHIEM_17');
                document.getElementById('rptCode').disabled = false;
                document.getElementById("custom").setAttribute("disabled", "disabled");
            } else {
                $('#rptCode').val('');
                document.getElementById('rptCode').disabled = true;
                document.getElementById("custom").removeAttribute("disabled");
            }
		});

        var modal = document.getElementById("myModal");
        // Get the button that opens the modal
        var btn = document.getElementById("myBtn");
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];
        // Events
        // When the user clicks the button, open the modal 
        btn.onclick = function () {
            that.kyToken();
            modal.style.display = "block";
        }

        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            that.closeModal();
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == modal) {
                that.closeModal();
            }
        } 

	});



}