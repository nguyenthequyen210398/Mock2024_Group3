Code FE : 
Folder structure:
   - api: chứa api url
   - assets: chứa các thành phần dùng chung như images,..
   - components: chứa cáccomponent dùng chung có thể tái sử dụng
   - layouts: chứa các bố cục dùng chung như header, footer,...
   - pages: chứa các trang( màn hình của dự án)
   - redux: cấu hình của redux
   - routes: chứa định tuyến của trang
   - services:nơi lấy dữ liệu khi gọi api
   - utils: chứa các hàm dùng cho toàn bộ ứng dụng ( formatDate(), ....)


Code BE : 
Folder structure:
   - Configuration: Chứa các file cấu hình
      -- Exception: Chứa các class xử lí các ngoại lệ cho chương trình
   - Controller: Các controller
   - Dto: Chứa các Data transfer object 
   - Entity: Các thực thể
   - Form: Các form data cho việc tạo và cập nhật, filter 
   - Repository: Chứa các kho repository
   - Service: Chứa các class, interface service xử lí logic.
   - Specification: Chứa các buildspec cho chức năng tìm kiếm.
   - Validation: Chứa các anotation validation tự tạo.
1. Authen and Authorize:
   - SignIn & SignUp
   - Change Password after signIn
   - Forgot password: send code to email -> code authentications -> change password. 
