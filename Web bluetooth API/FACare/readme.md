# Tài liệu tham khảo:

- Chrome: https://googlechrome.github.io/samples/web-bluetooth/

- Simulator: https://play.google.com/store/apps/details?id=io.github.webbluetoothcg.bletestperipheral

- Tìm hiểu về kết nối bluetooth: https://www.oreilly.com/library/view/getting-started-with/9781491900550/ch04.html

- Các khái niệm cơ bản: https://vngiotlab.github.io/vbluno/vi/mydoc_ble_vi.html#

# Khái niệm cơ bản
## Generic Attribute Profile - GATT
- GATT thiết lập chi tiết cách trao đổi tất cả profile và dữ liệu người dùng qua kết nối BLE. Ngược lại với GAP (định nghĩa sự tương tác mức thấp với các thiết bị), GATT chỉ trình bày các thủ tục truyền và định dạng dữ liệu thực tế
- GATT sử dụng ATT và giao thức truyền của nó để trao đổi dữ liệu giữa các thiết bị. Dữ liệu này được tổ chức phân cấp thành các phần gọi là services, nó nhóm các phần khái niệm liên quan của dữ liệu người dùng gọi là characteristic. Nói một cách ngắn gọn thì dữ liệu truyền qua BLE là dữ liệu có cấu trúc, mà cụ thể là được tổ chức phân cấp thành services và characteristics.

## Roles
- GATT Client: tương ứng với ATT client, gửi yêu cầu đến server và nhận kết quả phản hồi. Ban đầu, GATT Client không biết server hỗ trợ những thuộc tính nào vì thế nó cần phải thực hiện service discovery.
- GATT Server: tương ứng ATT server, nhận yêu cầu từ client và gửi những nội dung tương ứng.
- Chú ý rằng các vai trò của GATT không phụ thuộc vào vai trò của GAP. Có nghĩa là cả GAP Central và GAP Peripheral có thể hoạt động như GATT Client hoặc GATT Server hoặc thậm chí là cả hai tại cùng một thời điểm.

## UUIDs
- Là một số định danh thiết bị, dài 128 bit (16 byte) duy nhất trên thế giới. Vì độ dài quá lớn, chiếm phần lớn trong gói dữ liệu, BLE Specification định nghĩa thêm 2 định dạng UUID: 16bit và 32 bit. Các định dạng ngắn này có thể chỉ được sử dụng với UUID được định nghĩa trong BT Specification.

## Attributes
- Là thực thể dữ liệu nhỏ nhất được định nghĩa bởi GATT (và ATT).

- Cả GATT và ATT chỉ làm việc với attributes nên để tương tác giữa client và server tất cả dữ liệu phải được tổ chức theo định dạng này.

- Mỗi attribute chứa thông tin về chính nó là dữ liệu người dùng và được mô tả như sau:
    - Handle: số 16 bit duy nhất trên mỗi server để địa chỉ hóa attribute
    - Type:là kiểu UUID, 16bit – 32bit – 128 bit
    - Permission: xác định các ATT opertation có thể thực thi trên attribute cụ thể
    - Value: chứa phần dữ liệu thực tế trong attribute, giới hạn 512 byte



# Sample
- Auto reconnect device: https://googlechrome.github.io/samples/web-bluetooth/automatic-reconnect.html
