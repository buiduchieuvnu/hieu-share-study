var App = function () {
	// Properties
	var that = this;
	this.AppName = 'Test kết nối bluetooth';
    this.LogContent = '';

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

	// Methods
	this.connect = function(){

        that.log('Bắt đầu kết nối thiết bị bluetooth...');
        const SERVICE_UUID = '00001523-1212-efde-1523-785feabcd123';
        const DEVICE_NAME = 'TAIDOC TD8255';
        navigator.bluetooth.requestDevice({
            filters: [{
                name: DEVICE_NAME
            }],
            optionalServices: [SERVICE_UUID]
        }).then(device => {
            device.gatt.connect();
            return device.gatt.connect();
        }).then(server => {
                return server.getPrimaryService(SERVICE_UUID);
            }).then(service => {
                console.log(service);
                that.log('Tên thiết bị: ' + service.device.name + '; ID: ' + service.device.id);
                that.log('Trạng thái kết nối: ' + service.device.gatt.connected);
            }).then(a => {that.log('----------------- END ---------------'); })
            .catch(error => { 
                that.log('ERROR | ' + error); });
	}

	this.disconnect = function () {
		console.log('Disconnection successful!');
	}

    this.getListDevice2 = function () {
        const SERVICE_UUID = '00001523-1212-efde-1523-785feabcd123';
        const DEVICE_NAME = 'TAIDOC TD8255';
        navigator.bluetooth.requestDevice({
            filters: [{
                name: DEVICE_NAME
            }],
            optionalServices: [SERVICE_UUID]
        }).then(device => {
            device.gatt.connect();
            return device.gatt.connect();
        }).then(server => {
                return server.getPrimaryService(SERVICE_UUID);
            }).then(service => {
                console.log(service);
                // console.log(service.getCharacteristic('00001524-1212-efde-1523-785feabcd123'));
                // return service.getCharacteristic('00001524-1212-efde-1523-785feabcd123');
                // return Promise.all([
                //     service.getCharacteristic('00001524-1212-efde-1523-785feabcd123')
                //         .then(handleHeartRateMeasurementCharacteristic),
                // ]);
            }).then(a => { console.log(a) })
            .catch(error => { console.error(error); });
    }

    this.btnTD8255 = function () {
        that.log('Bắt đầu kết nối thiết bị bluetooth...');
        const SERVICE_UUID = '00001523-1212-efde-1523-785feabcd123';
        const DEVICE_NAME = 'TAIDOC TD8255';
        navigator.bluetooth.requestDevice({
            filters: [{
                name: DEVICE_NAME
            }],
            optionalServices: [SERVICE_UUID]
        }).then(device => {
            device.gatt.connect();
            return device.gatt.connect();
        }).then(server => {
                return server.getPrimaryService(SERVICE_UUID);
            }).then(service => {
                console.log(service);
                that.log('Tên thiết bị: ' + service.device.name + '; ID: ' + service.device.id);
                that.log('Trạng thái kết nối: ' + service.device.gatt.connected);
                return service.getCharacteristic('00001524-1212-efde-1523-785feabcd123')
                .then(result=>{
                    that.log('Kết quả: ' + result);
                    console.log(result);
                })

            }).then(a => {that.log('----------------- END ---------------'); })
            .catch(error => { 
                that.log('ERROR | ' + error); });
    }

    this.getListDevice = function() {
        that.log('> Tìm kiếm các thiết bị Bluetooth gần bạn...');
        navigator.bluetooth.getDevices()
        .then(devices => {
            that.log('  > Tìm thấy ' + devices.length + ' thiết bị Bluetooth');
            that.log('  > Danh sách: ');
          for (const device of devices) {
            that.log('       >' + device.name );
          }
        })
        .catch(error => {
            that.log('Kết quả: ' + result);
        });
      }



    // Events
    $(document).ready(function () {

		that.initPage();

		$('.ACTIONS').on('click','#btnConnect',function(){
			that.connect();
		});

        $('.ACTIONS').on('click','#btnClearLog',function(){
			that.clearLog();
		});

        $('.ACTIONS').on('click','#btnGetDevice',function(){
			that.getListDevice();
		});

        $('.ACTIONS').on('click','#btnTD8255',function(){
			that.btnTD8255();
		});

	});



}