# SunCare — Bài thực hành React

Giao diện cơ bản dựa trên đề tài SunCare trong Phase_1, dùng React, Vite,
TypeScript và React Router. Nội dung gồm Trang chủ, Giới thiệu và Chuyên khoa.

## Chạy project

Mở Terminal tại A:\file\Lap_trinh_WEB\BT_TH\BT_TH:

~~~powershell
npm install
npm run dev
~~~

Mở **http://localhost:3000**. Giữ Terminal đang chạy; dùng Ctrl + C để dừng.
Nếu cổng 3000 đang có ứng dụng khác, dừng ứng dụng đó hoặc chạy
npm run dev -- --port 3001 và dùng địa chỉ mới trong Terminal.

## Các trang

| URL | Nội dung |
| --- | --- |
| / | Trang chủ và chuyên khoa nổi bật |
| /about-us | Giới thiệu website SunCare |
| /specialties | Ba chuyên khoa mẫu: Tim mạch, Nhi khoa, Da liễu |
| Đường dẫn khác | Thông báo không tìm thấy trang và nút về trang chủ |

Có thể chuyển trang bằng menu, dùng nút Back/Forward của trình duyệt,
hoặc nhập trực tiếp URL và tải lại trang khi Vite đang chạy.

Đây là frontend với dữ liệu mẫu trong src/data/specialties.ts.
Các URL ở trên là route giao diện; project chưa có API backend hoặc chức năng đặt lịch.

## Cấu trúc code

~~~text
src/
  main.tsx                   Bọc ứng dụng bằng BrowserRouter
  App.tsx                    Khai báo Routes và Route, bố cục dùng chung
  App.css                    CSS giao diện và bố cục trên điện thoại
  index.css                  CSS chung
  components/
    Header.tsx               Menu NavLink, đánh dấu trang đang xem
    Footer.tsx               Chân trang dùng chung
    SpecialtyCard.tsx        Thẻ thông tin một chuyên khoa, nhận props
  data/
    specialties.ts           Mảng dữ liệu mẫu và kiểu Specialty
  pages/
    HomePage.tsx              Trang chủ
    AboutPage.tsx             Giới thiệu
    SpecialtiesPage.tsx       Danh sách chuyên khoa dùng map()
    NotFoundPage.tsx          Trang 404
~~~

## Cách chuyển trang hoạt động

1. BrowserRouter trong main.tsx đồng bộ ứng dụng với URL trình duyệt.
2. NavLink trong Header.tsx đổi URL và đánh dấu mục menu đang được chọn.
3. Routes trong App.tsx chọn Route khớp URL để hiển thị page tương ứng.
4. Header và Footer nằm ngoài Routes, nên xuất hiện trên cả ba trang.

Ví dụ cấu hình trang giới thiệu:

~~~tsx
<Route path="/about-us" element={<AboutPage />} />
~~~

Ví dụ liên kết đến trang giới thiệu:

~~~tsx
<NavLink to="/about-us">Giới thiệu</NavLink>
~~~

## Kiểm tra bản build

~~~powershell
npm run build
~~~

Sau khi dừng dev server, có thể xem bản build bằng npm run preview.
Nếu triển khai lên hosting tĩnh, cần cấu hình mọi URL giao diện chưa khớp file
được trả về index.html để mở trực tiếp /about-us và /specialties.
Vite dev và preview đã hỗ trợ cách mở URL này.

## Đưa code lên GitHub

Git hiện được khởi tạo tại thư mục cha A:\file\Lap_trinh_WEB\BT_TH.
Repository sẽ chứa project trong thư mục con BT_TH.

1. Đăng nhập GitHub và tạo repository trống. Không thêm README, license hoặc
   .gitignore khi tạo repository để tránh có commit ban đầu khác với project local.
2. Thay TEN_TAI_KHOAN và TEN_REPOSITORY trong lệnh dưới bằng thông tin của bạn.
3. Chạy lần lượt, kiểm tra git status trước khi commit:

~~~powershell
cd "A:\file\Lap_trinh_WEB\BT_TH"
git add BT_TH
git status
git commit -m "Add SunCare React pages and routing"
git branch -M main
git remote add origin https://github.com/TEN_TAI_KHOAN/TEN_REPOSITORY.git
git push -u origin main
~~~

Các lệnh trên dành cho repository hiện chưa có remote. Nếu đã thêm remote,
dùng git remote -v để kiểm tra trước khi thêm. node_modules và dist đã được
loại trừ bằng .gitignore.

## Tài liệu

- [React Router: cài đặt](https://reactrouter.com/start/declarative/installation)
- [React Router: khai báo route](https://reactrouter.com/start/declarative/routing)
- [GitHub: đưa code local lên repository](https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github)
