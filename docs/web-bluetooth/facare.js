var FACare = function () {
	// Properties
	var that = this;
    this.LogContent = '';

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

    this.getSPO2 = function(){
        that.log('Bắt đầu lấy data từ thiết bị SPO2...');
    }

    // Events
    $(document).ready(function () {

		$('.ACTIONS').on('click','#btnTD8255-SPO2',function(){
			that.getSPO2();
		});
	});

}