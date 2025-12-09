# 🗺️ Hướng Dẫn Nhúng Google Maps vào Website

## 📍 Cách Lấy Link Embed Google Maps

### Bước 1: Truy cập Google Maps
1. Mở trình duyệt và truy cập: https://www.google.com/maps
2. Đăng nhập tài khoản Google (nếu cần)

### Bước 2: Tìm Địa Chỉ
1. Nhập địa chỉ văn phòng của bạn vào thanh tìm kiếm
2. Ví dụ: "123 Nguyễn Huệ, Quận 1, TP.HCM"
3. Nhấn Enter hoặc click vào kết quả phù hợp

### Bước 3: Lấy Mã Nhúng (Embed Code)
1. Click vào nút **"Share"** (Chia sẻ) ở bên trái màn hình
2. Chọn tab **"Embed a map"** (Nhúng bản đồ)
3. Chọn kích thước bản đồ:
   - Small (Nhỏ)
   - Medium (Trung bình) - **Khuyến nghị**
   - Large (Lớn)
   - Custom size (Tùy chỉnh)
4. Click **"COPY HTML"** để sao chép mã nhúng

### Bước 4: Lấy URL từ Mã Nhúng
Mã HTML bạn copy sẽ có dạng:
```html
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12..." width="600" height="450" ...></iframe>
```

**Chỉ cần lấy phần URL trong `src="..."`**

Ví dụ:
```
https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4956729942!2d106.69831897570655!3d10.775015589376...
```

---

## 🔧 Cách Thay Đổi Địa Chỉ trong Code

### File: `src/components/Contact.jsx`

Tìm dòng có `src="https://www.google.com/maps/embed?pb=..."` (khoảng dòng 300-301)

**Thay thế URL cũ bằng URL mới của bạn:**

```jsx
<iframe 
    src="PASTE_URL_CỦA_BẠN_VÀO_ĐÂY"
    width="100%"
    height="100%"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    title="Vị trí văn phòng ReVeo Studio"
    className="w-full h-full"
></iframe>
```

---

## 🎨 Tùy Chỉnh Bản Đồ

### 1. Thay Đổi Địa Chỉ Hiển Thị
Cập nhật địa chỉ trong phần thông tin liên hệ (dòng 234):

```jsx
<p className="body-2 text-n-3">ĐỊA_CHỈ_MỚI_CỦA_BẠN</p>
```

### 2. Thay Đổi Kích Thước Bản Đồ
Hiện tại đang dùng `aspect-video` (tỷ lệ 16:9).

**Thay đổi tỷ lệ khung hình:**
```jsx
<!-- 16:9 (mặc định) -->
<div className="aspect-video ...">

<!-- 4:3 -->
<div className="aspect-[4/3] ...">

<!-- 1:1 (vuông) -->
<div className="aspect-square ...">

<!-- Chiều cao cố định -->
<div className="h-96 ..."> <!-- 384px -->
```

### 3. Thêm Marker (Ghim) Tùy Chỉnh
Nếu muốn thêm marker với tên công ty:

1. Trên Google Maps, click vào địa điểm
2. Click **"Save"** → **"Add to map"**
3. Tạo map mới hoặc chọn map có sẵn
4. Thêm label/description cho marker
5. Click **"Share"** → **"Embed a map"**

### 4. Thay Đổi Chế Độ Xem Mặc Định
Trong URL embed, bạn có thể thêm tham số:

```
&maptype=satellite  // Chế độ vệ tinh
&maptype=terrain    // Chế độ địa hình
&maptype=roadmap    // Chế độ đường (mặc định)
```

Ví dụ:
```
https://www.google.com/maps/embed?pb=...&maptype=satellite
```

---

## ✨ Tính Năng Đã Có

Bản đồ hiện tại hỗ trợ:

✅ **Kéo thả** - Người dùng có thể di chuyển bản đồ
✅ **Zoom in/out** - Phóng to/thu nhỏ bằng nút +/- hoặc cuộn chuột
✅ **Street View** - Xem ảnh đường phố (kéo người vàng vào đường)
✅ **Fullscreen** - Xem toàn màn hình
✅ **Directions** - Chỉ đường từ vị trí hiện tại
✅ **Responsive** - Tự động điều chỉnh theo màn hình
✅ **Lazy loading** - Chỉ tải khi người dùng cuộn đến

---

## 🚀 Ví Dụ Địa Chỉ Phổ Biến ở Việt Nam

### Hà Nội
```
Địa chỉ: 1 Hoàn Kiếm, Hà Nội
```

### TP. Hồ Chí Minh
```
Địa chỉ: 123 Nguyễn Huệ, Quận 1, TP.HCM (đang dùng)
```

### Đà Nẵng
```
Địa chỉ: 2 Trần Phú, Hải Châu, Đà Nẵng
```

---

## 🔒 Bảo Mật & Hiệu Suất

### Các Thuộc Tính Đã Được Tối Ưu:

1. **`loading="lazy"`** - Chỉ tải map khi người dùng cuộn đến
2. **`referrerPolicy="no-referrer-when-downgrade"`** - Bảo mật referrer
3. **`allowFullScreen=""`** - Cho phép xem toàn màn hình
4. **`title="..."`** - Hỗ trợ accessibility cho screen reader

---

## 🎯 Checklist Sau Khi Thay Đổi

- [ ] URL embed đã được cập nhật
- [ ] Địa chỉ văn bản đã khớp với bản đồ
- [ ] Test trên mobile (kéo thả hoạt động)
- [ ] Test trên desktop (zoom hoạt động)
- [ ] Kiểm tra marker hiển thị đúng vị trí
- [ ] Test chức năng "Get Directions"

---

## 🆘 Xử Lý Lỗi Thường Gặp

### Lỗi: Bản đồ không hiển thị
**Nguyên nhân**: URL embed không hợp lệ
**Giải pháp**: 
- Kiểm tra URL có bắt đầu bằng `https://www.google.com/maps/embed?pb=`
- Đảm bảo không có khoảng trắng trong URL
- Copy lại URL từ Google Maps

### Lỗi: Bản đồ bị cắt/méo
**Nguyên nhân**: Container không có kích thước phù hợp
**Giải pháp**:
```jsx
<div className="aspect-video overflow-hidden">
  <!-- Đảm bảo có overflow-hidden -->
</div>
```

### Lỗi: Không kéo thả được trên mobile
**Nguyên nhân**: CSS conflict
**Giải pháp**:
```jsx
<iframe 
  style={{ border: 0, touchAction: 'pan-y' }}
  ...
/>
```

---

## 📱 Responsive Behavior

Bản đồ tự động điều chỉnh:

- **Mobile** (< 768px): Full width, tỷ lệ 16:9
- **Tablet** (768px - 1024px): 50% width (cùng cột với form)
- **Desktop** (> 1024px): 50% width, chiều cao tự động

---

## 🎨 Styling Nâng Cao

### Thêm Border Gradient
```jsx
<div className="relative p-8 bg-n-7 border border-n-6 rounded-3xl overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 pointer-events-none" />
  <h5 className="h5 mb-6 relative z-10">Vị trí</h5>
  <div className="aspect-video rounded-lg overflow-hidden relative z-10">
    <iframe ... />
  </div>
</div>
```

### Thêm Shadow khi Hover
```jsx
<div className="... hover:shadow-2xl transition-shadow duration-300">
```

---

## 🔗 Tài Nguyên Tham Khảo

- [Google Maps Embed API](https://developers.google.com/maps/documentation/embed/get-started)
- [Google Maps Platform](https://mapsplatform.google.com/)
- [Iframe Embed Parameters](https://developers.google.com/maps/documentation/embed/embedding-map)

---

**Cập nhật lần cuối**: 2024-12-09  
**Tác giả**: ReVeo Studio Development Team
