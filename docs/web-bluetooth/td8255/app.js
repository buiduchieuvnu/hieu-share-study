var App = function () {
	// Properties
	var that = this;
    this.BASE_UUID = '';
    this.SERVICE_UUID = '';
    this.CHAR_UUID = '';
    this.DEVICE_NAME = '';
    this.LogContent = '';
    this.Characteristic = null;
    this.BluetoothDevice = null;

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

    // Kết nối thiết bị
    this.connect = function(){
        that.log('> Thiết lập cấu hình...');
        that.DEVICE_NAME = $('#DEVICE_NAME').val();
        that.BASE_UUID = $('#BASE_UUID').val();
        that.SERVICE_UUID = $('#SERVICE_UUID').val() + '-' + that.BASE_UUID;
        that.log('  > SERVICE_UUID: ' + that.SERVICE_UUID);
        that.CHAR_UUID = $('#CHAR_UUID').val() + '-' + that.BASE_UUID;
        that.log('  > CHAR_UUID: ' + that.CHAR_UUID);
        that.log(' > Bắt đầu kết nối...');
        navigator.bluetooth.requestDevice({
            filters: [{name: that.DEVICE_NAME}],
            optionalServices: [that.SERVICE_UUID]
        }).then(device => {
            device.gatt.connect();
            that.BluetoothDevice = device;
            return device.gatt.connect();
        }).then(server => {
            that.log('  > Load PrimaryServic...');
            return server.getPrimaryService(that.SERVICE_UUID);
        }).then(service => {
            that.log("  > Load Characteristic ...");
            return service.getCharacteristic(that.CHAR_UUID);
        }).then(characteristic => {
            that.Characteristic = characteristic;
            console.log(characteristic);
            that.log('  > Connected');
            return characteristic;
        })
        .catch(error => { console.log(error); that.log(error) });
    }

    this.checkConnect = function(){
        if (!that.BluetoothDevice) {
            that.log('  > Lỗi: Không có thiết bị đang kết nối bluetooth');
            return false;
        }
        return true;
    }

    // Ngắt kết nối thiết bị
    this.disConnect = function () {
        that.log('> Ngắt kết nối thiết bị...');
        if (!that.checkConnect()) return;

        if (that.BluetoothDevice.gatt.connected) {
            that.BluetoothDevice.gatt.disconnect();
            that.BluetoothDevice = null;
            that.log('   > Đã ngắt kết nối thiết bị bluetooth');
        } else {
            that.log('   > Thiết bị đã ngắt kết nối.');
        }
    }

    // Bắt đầu lắng nghe Notify từ thiết bị
    this.startNotify = function(){
        if (!that.checkConnect()) return -1;

        that.log('> Bắt đầu lắng nghe notify...');
        that.Characteristic.startNotifications().then(_ => {
            that.log('  > Đang lắng nghe notify từ thiết bị...');
            that.Characteristic.addEventListener('characteristicvaluechanged',
                handleNotifications);
        })
        .catch(error => { console.log(error); that.log(error) });
    }

    // Dừng lắng nghe Notify từ thiết bị
    this.stopNotify = function () {
        that.log('> Bắt đầu dừng Notifications');
        if (!that.checkConnect()) return -1;

        if (that.Characteristic) {
            that.Characteristic.stopNotifications()
                .then(_ => {
                    that.log('  > Đã dừng lắng nghe Notifications');
                    that.Characteristic.removeEventListener('characteristicvaluechanged',
                        handleNotifications);
                })
                .catch(error => {
                    that.log('  > Argh! ' + error);
                });
        }
    }

    // Handle notify
    function handleNotifications(event) {
        that.log('> Notify: ');
        console.log(event);
        let value = event.target.value;
        let a = [];
        // Convert raw data bytes to hex values just for the sake of showing something.
        // In the "real" world, you'd use data.getUint8, data.getUint16 or even
        // TextDecoder to process raw data bytes.
        for (let i = 0; i < value.byteLength; i++) {
          a.push('0x' + ('00' + value.getUint8(i).toString(16)).slice(-2));
        }
        that.log('> ' + a.join(' '));
    }

    // Ghi dữ liệu vào thiết bị
    this.writeValue = function () {
        that.log('> Ghi dữ liệu vào thiết bị');
        var byte1 = parseInt($('#byte1').val(), 16);
        var byte2 = parseInt($('#byte2').val(), 16);
        var byte3 = parseInt($('#byte3').val(), 16);
        var byte4 = parseInt($('#byte4').val(), 16);
        var byte5 = parseInt($('#byte5').val(), 16);
        var byte6 = parseInt($('#byte6').val(), 16);
        var byte7 = parseInt($('#byte7').val(), 16);
        var byte8 = parseInt($('#byte8').val(), 16);
        var binaryArray = [byte1, byte2, byte3, byte4, byte5, byte6, byte7, byte8];
        var unit8 = new Uint8Array(binaryArray);
        that.log('  > Write data: ' + JSON.stringify(unit8));
        that.Characteristic.writeValue(unit8);
    }



    // Events
    $(document).ready(function () {

		$('.ACTIONS').on('click','#btnConnect',function(){
			that.connect();
		});

        $('.ACTIONS').on('click','#btnDisconnect',function(){
			that.disConnect();
		});

        $('.ACTIONS').on('click','#btnStartNotify',function(){
			that.startNotify();
		});

        $('.ACTIONS').on('click','#btnStopNotify',function(){
			that.stopNotify();
		});

        $('.ACTIONS').on('click','#btnWrite',function(){
			that.writeValue();
		});

	});

}