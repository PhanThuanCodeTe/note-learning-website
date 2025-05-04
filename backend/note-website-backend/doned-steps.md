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
## Hash password cho user sử dụng bcrypt và login cho user sử dụng JWT
- Cài đặt thư viện cần thiết
> npm install bcrypt
> npm install --save-dev @types/bcrypt
- Chỉnh sửa lại hàm create trong service
## Xác thực JWT
- Cài đặt package
> npm install @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt @nestjs/config @nestjs/typeorm typeorm
- Thêm vào cuối file .env
- Cài đặt module auth
> nest generate module auth
> nest generate controller auth
> nest generate service auth
- Sửa file **app.module.ts**
- Tạo file cấu hình JWT **/config/jwt.config.ts**
- Sửa file **auth.module.ts**
- Sửa file **auth.service.ts**
- Tạo file **/auth/jwt.strategy.ts**
- Sửa file **auth.controller.ts**
- Sửa các file liên quan.



