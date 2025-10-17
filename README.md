# 🌿 i-Clean Multi-Product Website

## 📋 โครงสร้างเว็บไซต์

เว็บไซต์นี้ประกอบด้วย **5 หน้า**:

### 🏠 หน้าหลัก (index.html)
- แสดงผลิตภัณฑ์ทั้ง 4 ตัวใน Product Showcase
- สามารถคลิกเพื่อไปยังหน้าสินค้าแต่ละตัว
- มีส่วน About, Wholesale, Contact

### 📦 4 หน้าสินค้า (products/)

1. **สเปรย์กันยุงตะไคร้หอม** (`mosquito-spray.html`)
   - สูตร 1: สำหรับผู้ใหญ่ (มีแอลกอฮอล์)
   - สูตร 2: สำหรับเด็กและสัตว์เลี้ยง (ไม่มีแอลกอฮอล์)

2. **น้ำยาถูพื้น** (`floor-cleaner.html`)
   - สูตร 1: แก่นมะกรูด
   - สูตร 2: ตะไคร้หอม

3. **น้ำยาล้างจาน** (`dish-soap.html`)
   - เอนไซม์สับปะรด 100%
   - ไม่กัดมือ ปลอดภัย

4. **น้ำยาซักผ้า** (`laundry.html`)
   - เอนไซม์สับปะรด
   - อ่อนโยนต่อผ้า

---

## 🗂️ โครงสร้างไฟล์

```
i-clean-multi/
├── index.html                 # หน้าหลัก
├── products/
│   ├── mosquito-spray.html   # หน้าสเปรย์กันยุง
│   ├── floor-cleaner.html    # หน้าน้ำยาถูพื้น
│   ├── dish-soap.html        # หน้าน้ำยาล้างจาน
│   └── laundry.html          # หน้าน้ำยาซักผ้า
├── css/
│   ├── main.css              # CSS หลักสำหรับหน้าแรก
│   └── products.css          # CSS สำหรับหน้าสินค้า
├── js/
│   └── main.js               # JavaScript หลัก
└── README.md                 # ไฟล์นี้
```

---

## 🚀 วิธีใช้งาน

### 1. ดาวน์โหลดไฟล์

ดาวน์โหลดทุกไฟล์และเก็บโครงสร้างตามด้านบน

### 2. เปิดดูเว็บไซต์

**วิธีง่าย:**
- Double-click ที่ `index.html`

**วิธีใช้ Local Server (แนะนำ):**
```bash
# Python 3
python3 -m http.server 8000

# Python 2  
python -m SimpleHTTPServer 8000

# Node.js
npx http-server -p 8000
```

จากนั้นเปิดเบราว์เซอร์: `http://localhost:8000`

---

## 🎨 การปรับแต่ง

### เปลี่ยนสี

แก้ไขใน `css/main.css` หรือ `css/products.css`:

```css
:root {
    --green-primary: #4A7C4E;   /* สีเขียวหลัก */
    --yellow-primary: #F9DB6D;  /* สีเหลือง */
    /* ... */
}
```

### เปลี่ยนข้อมูลสินค้า

1. เปิดไฟล์ HTML ที่ต้องการแก้ไข
2. ค้นหาส่วนที่ต้องการเปลี่ยน
3. แก้ไขข้อความตามต้องการ

### เพิ่มรูปภาพสินค้า

แทนที่ URL รูปภาพใน HTML:

```html
<!-- เปลี่ยนจาก -->
<img src="https://page.gensparksite.com/..." alt="Product">

<!-- เป็น -->
<img src="img/your-product.jpg" alt="Product">
```

---

## 🌐 การ Deploy (นำขึ้น Server)

### Vercel (แนะนำ - ฟรี)

1. ติดตั้ง Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
cd i-clean-multi
vercel
```

3. ทำตามขั้นตอนบนหน้าจอ

### Netlify (ฟรี)

1. ไปที่ [https://netlify.com](https://netlify.com)
2. Drag & drop โฟลเดอร์ `i-clean-multi`
3. เว็บจะได้ URL ทันที

### GitHub Pages (ฟรี)

1. สร้าง repository บน GitHub
2. Upload ไฟล์ทั้งหมด
3. Settings → Pages → เลือก branch: main
4. เว็บจะอยู่ที่ `https://username.github.io/repo-name`

---

## 📱 การทดสอบ Mobile

1. เปิด Chrome DevTools (F12)
2. คลิก Toggle Device Toolbar (Ctrl+Shift+M)
3. เลือกอุปกรณ์ต่างๆ เพื่อทดสอบ

---

## 🔗 การเชื่อมต่อระหว่างหน้า

### จากหน้าหลักไปยังหน้าสินค้า:
```html
<a href="products/dish-soap.html">ดูน้ำยาล้างจาน</a>
```

### จากหน้าสินค้ากลับหน้าหลัก:
```html
<a href="../index.html">กลับหน้าหลัก</a>
```

---

## 💡 Tips & Tricks

### เพิ่มข้อมูล SEO

แก้ไขใน `<head>` ของแต่ละหน้า:

```html
<title>ชื่อหน้า - i-Clean</title>
<meta name="description" content="คำอธิบายสั้นๆ">
<meta name="keywords" content="คีย์เวิร์ด1, คีย์เวิร์ด2">
```

### Google Analytics

เพิ่มใน `<head>` ของทุกหน้า:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Facebook Pixel

เพิ่มใน `<head>` ของทุกหน้า:

```html
<!-- Facebook Pixel Code -->
<script>
  !function(f,b,e,v,n,t,s){...}
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

---

## ✅ Checklist ก่อน Deploy

- [ ] ทดสอบทุกหน้าบนเบราว์เซอร์
- [ ] ทดสอบบน Mobile
- [ ] ตรวจสอบลิงก์ทั้งหมดทำงาน
- [ ] เปลี่ยนรูปภาพเป็นรูปจริง
- [ ] กรอกข้อมูลติดต่อจริง
- [ ] เพิ่ม Analytics tracking
- [ ] เพิ่ม Meta Tags ครบถ้วน
- [ ] ทดสอบฟอร์ม submission

---

## 📞 ติดต่อ

หากมีคำถามหรือต้องการความช่วยเหลือ:

- 📧 Email: info@i-clean.co.th
- 💬 Line: @iclean.th
- 📱 Phone: 02-XXX-XXXX

---

## 🔄 การอัปเดตในอนาคต

แนวทางการพัฒนาต่อ:

1. **E-commerce Integration**
   - เพิ่มระบบตะกร้าสินค้า
   - เชื่อมต่อกับ Payment Gateway

2. **CMS Integration**
   - ใช้ WordPress / Strapi
   - อัปเดตเนื้อหาง่ายขึ้น

3. **Blog Section**
   - เพิ่มบทความเกี่ยวกับ Organic lifestyle
   - SEO content marketing

4. **Customer Portal**
   - ระบบสมาชิก
   - ติดตามคำสั่งซื้อ

5. **Multi-language**
   - รองรับภาษาอังกฤษ
   - รองรับนักท่องเที่ยว

---

## 📄 License

© 2024 i-Clean Thailand. All Rights Reserved.

---

**Made with 💚 for i-Clean**
