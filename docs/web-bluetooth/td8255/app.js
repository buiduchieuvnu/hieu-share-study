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
    var mydata = [];
    let count = 2;
    var stopHeart = 0;
    this.log = function (msg) {
        var datetime = '';
        var date = new Date();
        datetime = date.toLocaleString('en-GB');
        that.LogContent += datetime + ' | ' + msg + `\r\n`;
        document.getElementById('txtLog').value=that.LogContent;
        var psconsole = document.getElementById('txtLog');
        if (psconsole.length)
            psconsole.scrollTop(psconsole[0].scrollHeight - psconsole.height());
    }

    this.clearLog = function () {
        that.LogContent = '';
        that.log('Clear!');
    }

    // test
    this.connect = function () {
        let filters = [];
      
        
      
       const filterName = "TAIDOC TD8255";
        filters.push({name: filterName});
        let options = {};
        options.filters = filters;
      
        that.log('Requesting Bluetooth Device...');
        that.log('with ' + JSON.stringify(options));
        navigator.bluetooth.requestDevice(options)
        .then(device => {
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

    // Kết nối thiết bị
    // this.connect = function () {
    //     mydata = [];
    //     that.log('> Thiết lập cấu hình...');
    //     that.DEVICE_NAME = document.getElementById('DEVICE_NAME').value;
    //     that.BASE_UUID = document.getElementById('BASE_UUID').value;
    //     that.SERVICE_UUID = document.getElementById('SERVICE_UUID').value + '-' + that.BASE_UUID;
    //     that.log('  > SERVICE_UUID: ' + that.SERVICE_UUID);
    //     that.CHAR_UUID = document.getElementById('CHAR_UUID').value + '-' + that.BASE_UUID;
    //     that.log('  > CHAR_UUID: ' + that.CHAR_UUID);
    //     that.log(' > Bắt đầu kết nối...');
    //     navigator.bluetooth.requestDevice({
    //         filters: [{ name: that.DEVICE_NAME }],
    //         optionalServices: [that.SERVICE_UUID]
    //     }).then(device => {
    //         device.gatt.connect();
    //         that.BluetoothDevice = device;
    //         return device.gatt.connect();
    //     }).then(server => {
    //         that.log('  > Load PrimaryServic...');
    //         return server.getPrimaryService(that.SERVICE_UUID);
    //     }).then(service => {
    //         that.log("  > Load Characteristic ...");
    //         return service.getCharacteristic(that.CHAR_UUID);
    //     }).then(characteristic => {
    //         that.Characteristic = characteristic;
    //         console.log(characteristic);
    //         that.log('  > Connected');
    //         return characteristic;
    //     })
    //         .catch(error => { console.log(error); that.log(error) });
    // }

    this.checkConnect = function () {
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
            stopMonitor();
        } else {
            that.log('   > Thiết bị đã ngắt kết nối.');
            stopMonitor();
        }
    }

    // Bắt đầu lắng nghe Notify từ thiết bị
    this.startNotify = function () {
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
                    stopMonitor();
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
        let value = event.target.value;
        let a = [];
        let spo2 = 0;
        let nhipTim = 0;
        // Convert raw data bytes to hex values just for the sake of showing something.
        // In the "real" world, you'd use data.getUint8, data.getUint16 or even
        // TextDecoder to process raw data bytes.
        for (let i = 0; i < value.byteLength; i++) {
            a.push('0x' + ('00' + value.getUint8(i).toString(16)).slice(-2));
            if(i==2){
                const a1 = '0x' + ('00' + value.getUint8(i).toString(16)).slice(-2);
                spo2 = parseInt(a1, 16);
            }
            if(i==4){
                const a2 = '0x' + ('00' + value.getUint8(i).toString(16)).slice(-2);
                nhipTim = parseInt(a2, 16);
            }
        }
        that.log('> ' + a.join(' '));

        document.getElementById("spo2").innerHTML= spo2;
        document.getElementById("nhipTim").innerHTML= nhipTim;
        if(count == 2){
            mydata.push(160, 160, 160, 170, 160, 180, 120, 163, 160, 160, 155, 160, 160, 160, 160);
        }
        count --;
        if(count == 1){
            count=2;
        }
        if(stopHeart==1){
            startMonitor();
        }
    }

    // Ghi dữ liệu vào thiết bị
    this.writeValue = function () {
        that.log('> Ghi dữ liệu vào thiết bị');
        var byte1 = parseInt(document.getElementById('byte1').value, 16);
        var byte2 = parseInt(document.getElementById('byte2').value, 16);
        var byte3 = parseInt(document.getElementById('byte3').value, 16);
        var byte4 = parseInt(document.getElementById('byte4').value, 16);
        var byte5 = parseInt(document.getElementById('byte5').value, 16);
        var byte6 = parseInt(document.getElementById('byte6').value, 16);
        var byte7 = parseInt(document.getElementById('byte7').value, 16);
        var byte8 = parseInt(document.getElementById('byte8').value, 16);
        var binaryArray = [byte1, byte2, byte3, byte4, byte5, byte6, byte7, byte8];
        var unit8 = new Uint8Array(binaryArray);
        that.log('  > Write data: ' + JSON.stringify(unit8));
        that.Characteristic.writeValue(unit8).then(_=>{
            startMonitor();
        });
    }

    // heart rate monitor
    var context;
    var cnt = 0;
    var start = 0;
    function startMonitor(){
        cnt = 0;
        start = 0;
        stopHeart = 0;
        move();
        monitor();
        document.getElementById("fa-heart").classList.add("blink_me");
    }
    function stopMonitor(){
        mydata = [];
        stopHeart = 1;
        document.getElementById("fa-heart").classList.remove("blink_me");
    }
    function monitor() {
        var myCanvas = document.getElementById("myCanvas");
        context = myCanvas.getContext('2d');
        context.fillStyle = "#737373";
        context.fill();

    }
    function drawLine(x1, y1, x2, y2, color, lineWidth) {
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.strokeStyle = color;
        context.lineWidth = lineWidth;
        context.stroke();
    }

    function move() {
        if(mydata.length > 0){
            var j = 0;
            var lastx = 0;
            var lasty = 160;
            var pos = 0;
            cleareData();
            start = cnt;
            if (cnt > 120) {
                start = 120;
                pos = cnt - 120;
            }
            for (i = 0; i < start; i++) {
                var p = i * 5;
                drawLine(lastx, lasty, p, mydata[pos], "#008000", 2);
                lastx = p;
                lasty = mydata[pos];
                pos++;
            }
            cnt = cnt + 1;
        }
    }

    function cleareData() {
        context.clearRect(0, 0, 600, 600);
        for (i = 0; i < 600; i++) {

            drawLine(i, 0, i, 300, "#CCCCCC", 0.2);
            i = i + 19
        }

        for (i = 0; i < 300; i++) {

            drawLine(0, i, 600, i, "#CCCCCC", 0.2);
            i = i + 19
        }
        drawLine(0, 160, 600, 160, "#FF00FF", 0.2);
    }
    setInterval(move, 80);
    // monitor();

    // Events
    // $(document).ready(function () {

    //     $('.ACTIONS').on('click', '#btnConnect', function () {
    //         that.connect();
    //     });

    //     $('.ACTIONS').on('click', '#btnDisconnect', function () {
    //         that.disConnect();
    //     });

    //     $('.ACTIONS').on('click', '#btnStartNotify', function () {
    //         that.startNotify();
    //     });

    //     $('.ACTIONS').on('click', '#btnStopNotify', function () {
    //         that.stopNotify();
    //     });

    //     $('.ACTIONS').on('click', '#btnWrite', function () {
    //         that.writeValue();
    //     });

    // });

}