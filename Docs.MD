Nền tảng ghi chú học tập

# Mục tiêu:

- Quản lý các tài liệu học tập / các ghi chú và kế hoạch cho từng tài liệu.
- Tạo các câu hỏi từ nội dung tài liệu hoặc các ghi chú của tài liệu sử dụng AI.
- Chia sẻ public note hoặc nhóm học tập.
- Học tập hiệu quả hơn với thống kê, nhắc học, lịch học…

# Các chức năng chính

| Tính năng | Mô tả |
|-----------|-------|
| Đăng ký / Đăng nhập | Đăng nhập bằng phương pháp truyền thống (xác thực **token**, **JWT** …) hay login bằng **Google**, … |
| Quản lý ghi chú | CRUD ghi chú, phân loại theo **tag** / **thư mục** hoặc ghi thẳng lên tài liệu. |
| Upload tài liệu | Cho phép upload file tài liệu như **WORD**, **EXCEL**, **POWER POINT**, **PDF** hoặc các dạng khác như **video**, **ghi âm**, **ảnh**,… |
| Tóm tắt văn bản (AI) | Dùng **AI** để tóm tắt tài liệu **VĂN BẢN**. |
| Tạo flashcard tự động (AI) | Dùng **AI** để tóm tắt hoặc tạo **flashcard** câu hỏi từ ghi chú. |
| Thống kê học tập | Thời gian học, số lần ôn tập (sử dụng), biểu đồ tiến độ. |
| Lịch học & nhắc nhở | Cho phép **đặt lịch học**, gửi **email thông báo**. |
| Nhóm học tập | Tạo nhóm học, chia sẻ ghi chú cho bạn bè. Nhắn tin thời gian thực. |
| Chia sẻ ghi chú công khai | Ghi chú **public** có thể search / view. |
| Real-time Group Chat (nhắn tin thời gian thực trong nhóm học) | Mỗi **nhóm học tập** có một **đoạn chat riêng**, chỉ hiển thị cho các **thành viên trong nhóm**.<br/>**Các tin nhắn không được lưu trữ vào cơ sở dữ liệu**, mà chỉ tồn tại **tạm thời.**<br/>Khi **tất cả thành viên nhóm offline**, hệ thống sẽ **tự động xóa toàn bộ đoạn chat**.<br/>Nếu **người tạo nhóm (leader)** nhấn nút “Xóa đoạn chat”, toàn bộ đoạn chat của nhóm sẽ **bị xóa ngay lập tức**, kể cả khi đang có thành viên online.<br/>Khi đoạn chat vẫn còn hoạt động, **thành viên mới vào nhóm có thể xem lại 100 tin nhắn trước đó của đoạn chat hiện tại**. |

# Công nghệ

| | |
|---------------------|-----------------------------------------|
| Frontend | **Next.js (TypeScript)** + Tailwind + MUI |
| Backend | NestJS (TypeScript) |
| Cơ sở dữ liệu | PostgreSQL |
| AI | FastAPI, Python |

# Tiến độ dự kiến

## Version 1 (Sơ bộ đầu tiên):

### Chức năng dự kiến được hoàn thành ở Backend:
- Đăng ký và đăng nhập tài khoản truyền thống xác thực bằng JWT.
- Gửi email về khi đăng ký, quên tài khoản – mật khẩu.
- Create dữ liệu của tài liệu lên server (tối đa 5 tài liệu cho mỗi tài khoản).
- CRUD các tag cho các tài liệu.
- CRUD các note cho tài liệu

### Chức năng dự kiến được hoàn thành ở Frontend:
- Màn hình đăng ký – đăng nhập – quên mật khẩu.
- Màn hình Dashboard.
- Hiện được tài liệu lên trang chính để xem trước. Thêm nút lưu tài liệu mới lưu về server.
- Thêm tag cho tài liệu khi lưu
- Thêm note cho tài liệu có công cụ chỉnh sửa văn bản.

## Version 2 (Tổ chức tài liệu – nhân lực):
### Chức năng dự kiến được hoàn thành ở Backend:
- Delete tài liệu trên server.
- CRUD Folder.
- CRUD Group.
- CRUD Group members.

### Chức năng dự kiến được hoàn thành ở Frontend:
- Thêm 1 drawer bên trái có thể kéo ra đảy vô để hiển thị các folder.
- Kéo tài liệu đến 1 vùng thì xóa tài liệu.
- Thêm drawer bên phải để cho group.

## Version 3 (Tính năng học – nhắc học):
### Chức năng dự kiến được hoàn thành ở Backend:
- CRUD Flashcard.
- CRUD Study sessions.
- CRUD Study schedules. Gửi email khi đến thời gian nhắc học.
- CRUD Notifications.

### Chức năng dự kiến được hoàn thành ở Frontend:
- Giao diện xem, thêm, sửa, xóa Flashcard.
- Giao diện xem, thêm, sửa, xóa Lịch học.
- Lưu study session về cho server.
- Hiện thông báo cho người dùng (via trình duyệt or website).
- Trang thống kê giờ học, tần suất học.

## Version 4 (AI hổ trợ):
### Chức năng dự kiến được hoàn thành ở Backend:
- Tích hợp ai vào hệ thống backend.
- AI tạo Flashcard tự động.
- AI tạo summery tự động.

### Chức năng dự kiến được hoàn thành ở Frontend:
- Giao diện xem, xóa Flashcard của AI.
- Giao diện xem, thêm, sửa xóa Summery tạo từ AI

## Version 5 (Chat “ẩn danh” không lưu lịch sử):
### Chức năng dự kiến được hoàn thành ở Backend:
### Chức năng dự kiến được hoàn thành ở Frontend:
- Drawer hiển thị chat (nếu có).
- Giao diện của trưởng nhóm thêm (tối đa 1), xóa đoạn chat cho mỗi group.

## Version 6 (bổ sung nếu dư thời gian):
### Chức năng dự kiến được hoàn thành ở Backend:
- Đăng nhập google, facebook.
- Chức năng lưu đăng nhập để chuyển tài khoản nhanh.
- Bảo mật tài khoản qua số điện thoại - ứng dụng xác thực.
- Thanh toán để mở thêm số tài được lưu trên server.

### Chức năng dự kiến được hoàn thành ở Frontend:
- Giao diện xem, thêm, sửa, xóa Flashcard.
- Giao diện xem, thêm, sửa, xóa Lịch học
- Lưu study session về cho server.

# Cơ sở dữ liệu cho dự án

## Users (id, email, password, full_name, avatar_url, created_at, updated_at)
Lưu dữ liệu của user trong website full name là Biệt danh chứ không phải họ tên, người dùng có thể đặt tùy ý, sau này AI sẽ phân tích tên để tránh đặt các từ ngữ nhạy cảm.

## Documents (id, user_id, title, description, file_url, file_type, file_size, is_public, created_at, updated_at)
Tài liệu học tập, tất cả các loại file .doc, .xlsx, .pdf, .pptx, .mp4, .mp3, .jpg, .png, …
Nếu is_public = 1 người khác có thể search thấy bằng title.

## Notes (id, user_id, document_id, title, content, is_public, created_at, updated_at)
Ghi chú cho tài liệu cụ thể
Nếu is_public = 1 người khác có thể thấy khi xem document. Có validation nếu như document không public thì note cũng không được public luôn. Nhưng note có thể không public khi document public.

## Tags (id, user_id, name, color, created_at)
Lưu danh mục, người tạo ra nó.

## Document_tags (document_id, tag_id, PRIMARY KEY (document_id, tag_id))
Quan hệ nhiều-nhiều giữa document và tags
1 document có nhiều tag, 1 tag dùng cho nhiều document. Khi người dùng bấm vào tag, hiện lên danh sách các public document của tag đó.

## Folders (id, user_id, parent_folder_id, name, created_at, updated_at)
Lưu folder của người dùng
parent_folder_id: REFERENCES folders(id) (NULL nếu là thư mục gốc)

## Folder_items (id, folder_id, document_id, created_at, updated_at)
Quản lý các file trong thư mục (các document của người dùng nằm ở đây)

## Flashcards (id, user_id, note_id, document_id, question, answer, created_at, updated_at)
Người dùng tự tạo flashcard hoặc ai generate ra.
Nếu người dùng tạo flash card thì chỉ được tạo từ document và lưu document id, không tạo từ note.
Chỉ ai mới dùng thêm note để tạo flashcard, lưu note id hoặc document id nếu generate từ document

## Study_sessions (id, user_id, start_time, end_time, duration_minutes, created_at)
Ghi lại lần đầu truy cập trang mở 1 tài liệu và thời gian đóng tab (kết thúc) từ đó tính ra duration_minute

## Study_schedules (id, user_id, title, description, datetime, created_at, updated_at)
Lập lịch nhắc học bài qua email. Tới ngày giờ thì gửi email tới người dùng nhắc vào học

## Groups (id, name, description, creator_id, is_public, created_at, updated_at)
Tạo nhóm.

## Group_members (group_id, user_id, role, joined_at, PRIMARY KEY (group_id, user_id))
Ghi nhận thành viên của nhóm
Có role như sau:
Người tạo nhóm: leader
Người tham gia: members

## Document_annotations (id, document_id, page_number, content, color, created_at, updated_at)
Lưu ghi chú trong file PDF và WORD những cái khác không lưu. Khi người dùng xem file pdf và word tới trang đó thì hiện ghi chú này lên màn hình

## Summaries (id, document_id, content, created_at, is_saved)
Tóm tắt document do ai tạo ra

## Notifications (id, user_id, title, content, created_at)
Thông báo đến người dùng thông qua trình duyệt khi mở trang.

## Chat_sessions (id, group_id, is_active, last_activity)
Lưu thông tin chat của nhóm.