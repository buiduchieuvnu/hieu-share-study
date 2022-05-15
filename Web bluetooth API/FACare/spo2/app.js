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
        that.log('> Bắt đầu kết nối thiết bị bluetooth...');
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
                that.log('  > Tên thiết bị: ' + service.device.name + '; ID: ' + service.device.id);
                that.log('  > Trạng thái kết nối: ' + service.device.gatt.connected);
                return service.getCharacteristic('00001524-1212-efde-1523-785feabcd123')
                .then(result=>{
                    that.log('  > Kết quả: ' + result);
                    console.log(result);
                })

            }).then(a => {that.log('----------------- END ---------------'); })
            .catch(error => { 
                that.log('ERROR | ' + error); });
    }

    this.getListDevice = function () {
        that.log('> Quét thiết bị Bluetooth xung quanh...');
        navigator.bluetooth.getDevices()
            .then(devices => {
                that.log('  > Tìm thấy ' + devices.length + ' thiết bị Bluetooth');
                if (devices.length > 0) {
                    that.log('  > Danh sách: ');
                    for (const device of devices) {
                        that.log('       >' + device.name);
                    }
                }
            })
            .catch(error => {
                that.log('Kết quả: ' + result);
            });
    }

    /*
    Hàm tra cứu thông tin thiết bị
    */
    this.getDeviceInfo = function () {
        that.log('Requesting any Bluetooth Device...');
        navigator.bluetooth.requestDevice({
            // filters: [...] <- Prefer filters to save energy & show relevant devices.
            acceptAllDevices: true,
            optionalServices: ['device_information']
        })
            .then(device => {
                that.log('Connecting to GATT Server...');
                return device.gatt.connect();
            })
            .then(server => {
                that.log('Getting Device Information Service...');
                return server.getPrimaryService('device_information');
            })
            .then(service => {
                that.log('Getting Device Information Characteristics...');
                return service.getCharacteristics();
            })
            .then(characteristics => {
                let queue = Promise.resolve();
                let decoder = new TextDecoder('utf-8');
                characteristics.forEach(characteristic => {
                    switch (characteristic.uuid) {

                        case BluetoothUUID.getCharacteristic('manufacturer_name_string'):
                            queue = queue.then(_ => characteristic.readValue()).then(value => {
                                that.log('> Manufacturer Name String: ' + decoder.decode(value));
                            });
                            break;

                        case BluetoothUUID.getCharacteristic('model_number_string'):
                            queue = queue.then(_ => characteristic.readValue()).then(value => {
                                that.log('> Model Number String: ' + decoder.decode(value));
                            });
                            break;

                        case BluetoothUUID.getCharacteristic('hardware_revision_string'):
                            queue = queue.then(_ => characteristic.readValue()).then(value => {
                                that.log('> Hardware Revision String: ' + decoder.decode(value));
                            });
                            break;

                        case BluetoothUUID.getCharacteristic('firmware_revision_string'):
                            queue = queue.then(_ => characteristic.readValue()).then(value => {
                                that.log('> Firmware Revision String: ' + decoder.decode(value));
                            });
                            break;

                        case BluetoothUUID.getCharacteristic('software_revision_string'):
                            queue = queue.then(_ => characteristic.readValue()).then(value => {
                                that.log('> Software Revision String: ' + decoder.decode(value));
                            });
                            break;

                        case BluetoothUUID.getCharacteristic('system_id'):
                            queue = queue.then(_ => characteristic.readValue()).then(value => {
                                that.log('> System ID: ');
                                that.log('  > Manufacturer Identifier: ' +
                                    padHex(value.getUint8(4)) + padHex(value.getUint8(3)) +
                                    padHex(value.getUint8(2)) + padHex(value.getUint8(1)) +
                                    padHex(value.getUint8(0)));
                                that.log('  > Organizationally Unique Identifier: ' +
                                    padHex(value.getUint8(7)) + padHex(value.getUint8(6)) +
                                    padHex(value.getUint8(5)));
                            });
                            break;

                        case BluetoothUUID.getCharacteristic('ieee_11073-20601_regulatory_certification_data_list'):
                            queue = queue.then(_ => characteristic.readValue()).then(value => {
                                that.log('> IEEE 11073-20601 Regulatory Certification Data List: ' +
                                    decoder.decode(value));
                            });
                            break;

                        case BluetoothUUID.getCharacteristic('pnp_id'):
                            queue = queue.then(_ => characteristic.readValue()).then(value => {
                                that.log('> PnP ID:');
                                that.log('  > Vendor ID Source: ' +
                                    (value.getUint8(0) === 1 ? 'Bluetooth' : 'USB'));
                                if (value.getUint8(0) === 1) {
                                    that.log('  > Vendor ID: ' +
                                        (value.getUint8(1) | value.getUint8(2) << 8));
                                } else {
                                    that.log('  > Vendor ID: ' +
                                        getUsbVendorName(value.getUint8(1) | value.getUint8(2) << 8));
                                }
                                that.log('  > Product ID: ' +
                                    (value.getUint8(3) | value.getUint8(4) << 8));
                                that.log('  > Product Version: ' +
                                    (value.getUint8(5) | value.getUint8(6) << 8));
                            });
                            break;

                        default: that.log('> Unknown Characteristic: ' + characteristic.uuid);
                    }
                });
                return queue;
            })
            .catch(error => {
                that.log('Argh! ' + error);
            });
    }

    this.discoverService = function () {
        let optionalServices = '0x1523'
            .split(/, ?/).map(s => s.startsWith('0x') ? parseInt(s) : s)
            .filter(s => s && BluetoothUUID.getService);

        that.log('Requesting any Bluetooth Device...');
        navigator.bluetooth.requestDevice({
            // filters: [...] <- Prefer filters to save energy & show relevant devices.
            acceptAllDevices: true,
            optionalServices: optionalServices
        })
            .then(device => {
                that.log('Connecting to GATT Server...');
                return device.gatt.connect();
            })
            .then(server => {
                // Note that we could also get all services that match a specific UUID by
                // passing it to getPrimaryServices().
                that.log('Getting Services...');
                return server.getPrimaryServices();
            })
            .then(services => {
                that.log('Getting Characteristics...');
                let queue = Promise.resolve();
                services.forEach(service => {
                    queue = queue.then(_ => service.getCharacteristics().then(characteristics => {
                        that.log('> Service: ' + service.uuid);
                        characteristics.forEach(characteristic => {
                            that.log('>> Characteristic: ' + characteristic.uuid + ' ' +
                                that.getSupportedProperties(characteristic));
                        });
                    }));
                });
                return queue;
            })
            .catch(error => {
                that.log('ERROR! ' + error);
            });
    }

    this.getSupportedProperties = function(characteristic) {
        let supportedProperties = [];
        for (const p in characteristic.properties) {
          if (characteristic.properties[p] === true) {
            supportedProperties.push(p.toUpperCase());
          }
        }
        return '[' + supportedProperties.join(', ') + ']';
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

        $('.ACTIONS').on('click','#btnGetDeviceInfo',function(){
			that.getDeviceInfo();
		});

        $('.ACTIONS').on('click','#btnDiscover',function(){
			that.discoverService();
		});
        

	});



}