1. Tạo project mới với các câu lệnh sau:
> npm i -g @nestjs/cli
> nest new project-name
2. Cài đặt TypeORM
> npm install @nestjs/typeorm typeorm pg
#### Do lười biếng tui sài supabase nhé xong connect với ứng dụng.
[Link to Supabase](https://supabase.com/)
Đăng ký tài khoản, tạo project mới nhé.
Khi tạo project mới xong trên góc trên màn hình sẽ có nút connect bấm vào để thấy được link như sau:
> postgres://user:password@db.supabase.co:5432/database
3. Cài đặt thư viện để validate dữ liệu đầu vào
> npm install class-validator class-transformer
4. Thêm biến môi trường cho dự án - Điều này là vô cùng cần thiết nếu bạn không muốn **mất tiền oan**!
> DATABASE_URI=postgres://[user]:[password]@[host]:[port]/[database]
5. Tạo file **src/config/database.config.ts**
6. Cập nhật **src/app.module.ts**
7. Tạo thư mục Entity cho các table
8. Tạo dto để valiadation dữ liệu
9. Tạo module, controller và service User tự động thông qua nestjs cli
> nest generate module users
> nest generate controller users
> nest generate service users
10. sao khi cài đặt tạo các hàm cho service và kêu controller gọi nó **Nhớ check app.module.ts xem có import module của mình chưa**
## Hash password cho user sử dụng bcrypt
- Cài đặt thư viện cần thiết
> npm install bcrypt
> npm install --save-dev @types/bcrypt
- Chỉnh sửa lại hàm create trong service
## Ngựa time*
Tôi muốn api trả về phải đẹp mắt nên tôi cực, và bạn cũng thế nhé :>
- API trả về sẽ như sau:
> {
    "success": true/false,
    "message": "mesage here or default message",
    "response": null or real respone
> }
- Và thế là chúng ta có:
    - **response.util.ts**: Cung cấp class **ApiResponseBuilder** và interface **ApiResponse** để xây dựng response mẫu { success, message, response } với message mặc định hoặc tùy chỉnh cho tất cả API.
    - **http-exception.filter.ts**: Bắt và định dạng các lỗi HTTP (như HttpException) thành response chuẩn { success: false, message, response } để đảm bảo xử lý lỗi thống nhất.
    - **response.interceptor.ts**: Tự động gói dữ liệu trả về của các API vào định dạng **ApiResponse**, áp dụng message mặc định nếu service không cung cấp response mẫu.
    ##### Lưu ý nhớ call trong main để gọi cục bộ toàn ứng dụng nhé!
## Vấn đề tiếp theo nè ứng dụng chưa nhận formdata và chưa upload avatar :)
- Cài tiếp thư viện cần thiết của cloundinary, platform-express, ...
> npm install cloudinary @nestjs/platform-express multer
> npm install @types/multer --save-dev
- Tạo file cấu hình cloudinary trong thư mục **config**.
- Thêm các key vào **.env**.
- Tạo module cloundiary. Dùng lệnh này để tự động cập nhật module cloudinary trên **app.module** nếu không tự động thêm vào, bạn tự thêm đi!
> nest g module cloudinary 
- Tạo util cho avatar mặc định (Tôi muốn khi người dùng không send avatar thì sẽ có 1 url avatar mặc định)
- Cập nhật controller để xử lý avatar (bạn chọn file mà nên phải dùng form data thôi)
- Cập nhật **user.module** để sử dụng **cloudinary.module**.
- Thư mục uploads để nhận và chuyển ảnh lên cloudinary. Sao đó có util xóa file tạm.
## Chức năng login dùng JWT
- Cài đặt các package cần thiết.
> npm install @nestjs/jwt passport passport-jwt @nestjs/passport
- Thêm vào file **.env** biến môi trường.
- Tạo **Auth Module, Controller, Service**
> nest generate module auth
> nest generate controller auth
> nest generate service auth
- Cập nhật **users.module**
- Cập nhật **users.service**
- Tạo và cấu hình **jwt.strategy** để xác thực JWT token từ Authorization header
- Tạo và cấu hình **jwt-auth.guard** để bảo vệ các route cần xác thực
- Cập nhật **users.controller**
##  Tiếp tục với tag, dociment






