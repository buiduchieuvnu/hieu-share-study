var Notify = function () {
	// Properties
	var that = this;
    const SERVICE_UUID = 'battery_service';
    const CHAR_UUID = 'battery_level';
    const DEVICE_NAME = 'Android bluetooth simulator';
    this.LogContent = '';
    this.Characteristic = null;

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

    this.connect = function(){
        that.log('Connecting...');
        navigator.bluetooth.requestDevice(
            {filters: [{services: [SERVICE_UUID]}]
        }).then(device => {
            device.gatt.connect();
            return device.gatt.connect();
        }).then(server => {
            that.log('getPrimaryService...');
            return server.getPrimaryService(SERVICE_UUID);
        }).then(service => {
            that.log("Getting Characteristic...");
            return service.getCharacteristic(CHAR_UUID);
        }).then(characteristic => {
            that.Characteristic = characteristic;
            console.log(characteristic);
            that.log('Connected');
            return characteristic;
        })
        .catch(error => { console.log(error); that.log(error) });
    }

    this.startNotify = function(){
        if(!that.Characteristic){
            that.log('Thiết bị chưa kết nối, vui lòng kết nối thết bị trước...');
            return -1;
        }

        that.log('Bắt đầu lắng nghe notify...');

        that.Characteristic.startNotifications().then(_ => {
            that.log('> Đang lắng nghe notify từ thiết bị');
            that.Characteristic.addEventListener('characteristicvaluechanged',
                handleNotifications);
        })
        .catch(error => { console.log(error); that.log(error) });
    }


    this.stopNotify = function () {
        if (!that.Characteristic) {
            that.log('Thiết bị chưa kết nối, vui lòng kết nối thết bị trước...');
            return -1;
        }

        that.Characteristic.stopNotifications()
            .then(_ => {
                that.log('> Notifications stopped');
                that.Characteristic.removeEventListener('characteristicvaluechanged',
                    handleNotifications);
            })
            .catch(error => {
                that.log('Argh! ' + error);
            });
    }

    function handleNotifications(event) {
        that.log('notif value ...');
        console.log('Event: ');
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



    // Events
    $(document).ready(function () {

		$('.ACTIONS').on('click','#btnConnect',function(){
			that.connect();
		});

        $('.ACTIONS').on('click','#btnStart',function(){
			that.startNotify();
		});

        $('.ACTIONS').on('click','#btnStop',function(){
			that.stopNotify();
		});

	});

}