var App = function () {
	// Properties
	var that = this;
	this.AppName = 'Sign | Sample ký điện tử token sử dụng plugin';
    this.LogContent = '';
    var data = {
        token:"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJFSEVBTFRIIiwianRpIjoiMiIsInR5cGUiOiJBQ0NFU1NfVE9LRU4iLCJET05WSV9JRCI6MjgxLCJNQV9ET05WSSI6Ijk5OTk5IiwiVkFJX1RSTyI6IkFETUlOX09ORUhFQUxUSCxBRE1JTl9ET05WSSIsIkRPTlZJX1BIQVBOSEFOX0lEIjoyODEsIkRJQ0hfVlUiOiIiLCJpc3MiOiJodHRwOi8vT05IRUFMVEguVk5DQVJFLlZOIiwiaWF0IjoxNjY5ODY0MzU2LCJleHAiOjE2Njk4OTMxNTZ9.4d5JUAFEnQVSQNMFR8H5JSitQSF-LYjboTO601t5sCLohIPJbvemP1ruz5kkTOxyrXaAm8kea3-Us3C21LnOQQ",
          type:"xml",
          hoTen:"Nguyễn Văn Nam",
          ma:"BN032659958",
          files:[
            {
              url:"https://storage-emr.vnpt.vn/onehealth.public/common/xml/110.xml",
              rptCode:"BM_PHIEU_KCB_YEUCAU_110_79023",
              name:"Báo cáo 1",
              code:"code0001"
            },
            {
              url:"https://storage-emr.vnpt.vn/onehealth.public/common/xml/XETNGHIEM_17.xml",
              rptCode:"BM_PHIEU_KETQUA_XETNGHIEM_17",
              name:"Báo cáo 2",
              code:"code0002"
            }
          ]
        };
    const GG = new GoogleCloudService();
    // Get the modal
    

    this.initPage = function(){
		$('#hAppName').html(that.AppName);
        document.title = that.AppName;
        that.log('Startup!');
	}

    this.result = function(){
        console.log('bắt đầu nhận message');
        window.onmessage = (event) => {
            if (event.data.message) {
              if(event.data.func == 'select'){
                that.log(event.data.message.SignedData)
              }
              if(event.data.message.start){
                var a = document.getElementById('ifPopup').contentWindow;
                var mess = {
                    SignedData: data
                  };
                  a.postMessage(
                        {
                          func: 'postData',
                          message: mess
                        },
                        '*'
                      );
                console.log('11111');
              }
            }
          };
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
        // var rptCode = $('#rptCode').val();
        // var type = $('#type').val();
        // var urlFile = $('#urlFile').val();
        // var hoTen = $('#hoTen').val();
        // var ma = $('#ma').val();
        // var token = $('#token').val();
        // var w = $('#width').val();
        // var h = $('#height').val();
        // var custom = $('#custom').val();

        // if(!baseUrl){
        //     alert('Cảnh báo: bắt buộc nhập baseUrl!');
        //     $('#baseUrl').focus();
        //     return false;
        // }

        // if(!urlFile){
        //     alert('Cảnh báo: bắt buộc nhập urlFile!');
        //     $('#urlFile').focus();
        //     return false;
        // }

        // if(!token){
        //     alert('Cảnh báo: bắt buộc nhập token!');
        //     $('#token').focus();
        //     return false;
        // }

        // if(!hoTen){
        //     alert('Cảnh báo: bắt buộc nhập họ tên!');
        //     $('#hoTen').focus();
        //     return false;
        // }

        // const sp = 'Xin mời bệnh nhân ' + hoTen + ', mã số ' + ma + ' thực hiện ký điện tử trên bảng ký.';
        // GG.speech(sp, 1);

        // that.log('Bắt đầu ký token...');
        // that.log('baseUrl: ' + baseUrl);
        // that.log('rptCode: ' + rptCode);
        // that.log('urlFile: ' + urlFile);
        // that.log('type: ' + type);
        // that.log('token: ' + token);
        // var _url = baseUrl + '?type=' + type + '&urlFile=' + urlFile + '&token=' + token + '&rptCode=' + rptCode + '&custom=' + custom + '&hoTen=' + hoTen + '&ma=' + ma;
        // var _title = 'Ký số token Plugin';
        // that.log('_url: ' + _url);
        // //that.openPopup(_url,_title,w,h);
        that.openModal(baseUrl);
    }



	// Methods
    $(document).ready(function () {
        

		that.initPage();
        that.result();

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
        var btn = document.getElementById("btnKyToken");
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