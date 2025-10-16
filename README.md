# 🌿 i-Clean Website - เว็บไซต์น้ำยาล้างจานเอนไซม์สับปะรด Organic 100%

## 📋 เกี่ยวกับโปรเจค

เว็บไซต์ Single Page แบบครบวงจรสำหรับธุรกิจ i-Clean - ผลิตภัณฑ์น้ำยาล้างจานจากเอนไซม์สับปะรดธรรมชาติ 100%

### ✨ Features หลัก

- 🎨 **Beautiful UI/UX Design** - ดีไซน์สวยงาม ทันสมัย ตามแนวทาง Organic/Green Product
- 📱 **Fully Responsive** - รองรับทุกขนาดหน้าจอ (Desktop, Tablet, Mobile)
- 🎯 **Dual Target Audience** - ออกแบบเพื่อ B2C (ลูกค้าปลีก) และ B2B (ขายส่ง/ตัวแทน)
- ⚡ **Fast & Optimized** - โหลดเร็ว ประสิทธิภาพสูง
- ♿ **Accessible** - รองรับการใช้งานด้วยคีย์บอร์ด และ Screen Readers
- 🔍 **SEO Friendly** - เตรียม Meta tags และโครงสร้างที่เหมาะสำหรับ SEO

---

## 🗂️ โครงสร้างไฟล์

```
i-clean-website/
│
├── index.html          # หน้าหลักของเว็บไซต์
├── styles.css          # ไฟล์ CSS สำหรับจัดรูปแบบ
├── script.js           # JavaScript สำหรับ Interactive Features
└── README.md           # คู่มือการใช้งาน (ไฟล์นี้)
```

---

## 🚀 วิธีการใช้งาน

### วิธีที่ 1: เปิดไฟล์ในเบราว์เซอร์โดยตรง

1. ดาวน์โหลดไฟล์ทั้งหมดมาไว้ในโฟลเดอร์เดียวกัน
2. Double-click ที่ไฟล์ `index.html`
3. เว็บไซต์จะเปิดในเบราว์เซอร์

### วิธีที่ 2: ใช้ Local Web Server (แนะนำ)

**ใช้ Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**ใช้ Node.js:**
```bash
npx http-server -p 8000
```

**ใช้ VS Code Extension:**
- ติดตั้ง "Live Server" extension
- Right-click บน `index.html` → "Open with Live Server"

จากนั้นเปิดเบราว์เซอร์ไปที่ `http://localhost:8000`

---

## 📄 รายละเอียด Sections

### 1. **Hero Section**
- Headline ที่ดึงดูดความสนใจ
- 2 CTA Buttons แยกสำหรับลูกค้าปลีกและขายส่ง
- Trust Badges แสดงจุดเด่นหลัก
- Product Showcase พร้อม Floating Elements

### 2. **Core Values Section (3 Pillars)**
- พลังเอนไซม์สับปะรด
- อ่อนโยนต่อผิว (ไม่กัดมือ)
- รักษ์โลก 100%

### 3. **Trust Section**
- NO LIST: รายการสารที่ไม่มีในผลิตภัณฑ์
- Certifications: มาตรฐานที่ได้รับการรับรong
- Testimonials: รีวิวจากลูกค้าจริง 4 ราย

### 4. **Wholesale & Partnership Section**
- 3 เหตุผลสำหรับคู่ค้า (กำไรดี, ตลาดเติบโต, ขายง่าย)
- Lead Generation Form สำหรับตัวแทนจำหน่าย
- Form validation และ submission handling

### 5. **Product Details Section**
- รายละเอียดผลิตภัณฑ์แบบ Table
- วิธีใช้งาน 4 ขั้นตอน
- Pro Tips

### 6. **FAQ Section**
- 8 คำถามที่พบบ่อย
- Accordion design (คลิกเพื่อเปิด/ปิด)
- Keyboard accessible

### 7. **Footer**
- ข้อมูลติดต่อ
- Quick Links
- Social Media
- Newsletter Signup

---

## 🎨 สี (Color Palette)

- **Green Primary** (#4A7C4E) - สีหลัก แสดงความเป็นธรรมชาติ
- **Green Dark** (#2C4A2F) - สำหรับ text และ footer
- **Yellow Primary** (#F9DB6D) - สีสับปะรด สำหรับ CTA และ highlights
- **Cream** (#F8F6F0) - พื้นหลังอบอุ่น
- **White** (#FFFFFF) - พื้นหลักที่สะอาด

---

## 🔧 การปรับแต่ง

### เปลี่ยนสี
แก้ไขใน `styles.css` ส่วน `:root` variables:
```css
:root {
    --green-primary: #4A7C4E;  /* เปลี่ยนเป็นสีที่คุณต้องการ */
    --yellow-primary: #F9DB6D;
    ...
}
```

### เปลี่ยนฟอนต์
แก้ไขใน `styles.css`:
```css
:root {
    --font-heading: 'Kanit', sans-serif;  /* ฟอนต์หัวข้อ */
    --font-body: 'Prompt', sans-serif;    /* ฟอนต์เนื้อหา */
}
```

### เปลี่ยนเนื้อหา
แก้ไข HTML ใน `index.html` ตามส่วนที่ต้องการ

### เพิ่มรูปภาพ
- เตรียมรูปภาพคุณภาพสูง (แนะนำ 1920x1080px สำหรับ hero)
- ใส่ลงในโฟลเดอร์ `images/`
- แก้ไข path ใน `index.html`:
```html
<img src="images/your-product.jpg" alt="i-Clean Product">
```

---

## 📊 การเชื่อมต่อ Backend/Database

### Form Submission

ปัจจุบันฟอร์มจะแสดง alert เมื่อส่งข้อมูล เพื่อเชื่อมต่อกับ backend:

**ใน `script.js` แก้ไขส่วนนี้:**

```javascript
wholesaleForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(wholesaleForm);
    const data = Object.fromEntries(formData.entries());
    
    // ส่งข้อมูลไป backend
    fetch('https://your-api.com/api/wholesale-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        alert('✅ ส่งข้อมูลสำเร็จ!');
        wholesaleForm.reset();
    })
    .catch(error => {
        alert('❌ เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
        console.error('Error:', error);
    });
});
```

### Newsletter Subscription

แก้ไขใน `script.js` เช่นเดียวกับฟอร์ม wholesale

---

## 🔍 SEO Optimization

### Meta Tags ที่ควรเพิ่ม

เพิ่มใน `<head>` ของ `index.html`:

```html
<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://www.i-clean.co.th/">
<meta property="og:title" content="i-Clean - น้ำยาล้างจานเอนไซม์สับปะรด Organic 100%">
<meta property="og:description" content="ล้างสะอาด ไม่กัดมือ ปลอดภัยสำหรับทุกคนในครอบครัว">
<meta property="og:image" content="https://www.i-clean.co.th/images/og-image.jpg">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://www.i-clean.co.th/">
<meta property="twitter:title" content="i-Clean - น้ำยาล้างจานเอนไซม์สับปะรด">
<meta property="twitter:description" content="ล้างสะอาด ไม่กัดมือ ปลอดภัย">
<meta property="twitter:image" content="https://www.i-clean.co.th/images/twitter-image.jpg">

<!-- Favicon -->
<link rel="icon" type="image/png" href="favicon.png">
```

### Schema Markup

เพิ่ม JSON-LD schema สำหรับ Google:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "i-Clean น้ำยาล้างจานเอนไซม์สับปะรด",
  "description": "น้ำยาล้างจาน Organic 100% จากเอนไซม์สับปะรด",
  "brand": {
    "@type": "Brand",
    "name": "i-Clean"
  },
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "THB",
    "availability": "https://schema.org/InStock"
  }
}
</script>
```

---

## 📈 Google Analytics & Facebook Pixel

### Google Analytics 4

เพิ่มใน `<head>`:

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

```html
<!-- Facebook Pixel Code -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

---

## 🧪 Testing Checklist

### Desktop (Chrome, Firefox, Safari, Edge)
- [ ] Navigation ทำงานถูกต้อง
- [ ] ทุก Section แสดงผลสมบูรณ์
- [ ] Form submission ทำงาน
- [ ] FAQ accordion เปิด/ปิดได้
- [ ] Smooth scroll ทำงาน
- [ ] Animations เรียบหรู

### Mobile (iOS & Android)
- [ ] Responsive design ถูกต้อง
- [ ] Mobile menu ทำงาน
- [ ] Touch targets มีขนาดเหมาะสม
- [ ] Font sizes อ่านง่าย
- [ ] Images load ถูกต้อง

### Performance
- [ ] Page load time < 3 วินาที
- [ ] Images optimized
- [ ] No console errors
- [ ] All links working

---

## 🚀 Deployment (การนำขึ้น Server จริง)

### วิธีที่ 1: GitHub Pages (ฟรี)

1. สร้าง repository ใหม่บน GitHub
2. Upload ไฟล์ทั้งหมด
3. Settings → Pages → เลือก branch: main
4. เว็บจะอยู่ที่ `https://username.github.io/repo-name`

### วิธีที่ 2: Netlify (ฟรี)

1. ไปที่ netlify.com
2. Drag & drop โฟลเดอร์เข้าไป
3. เว็บจะได้ URL ทันที (เช่น `i-clean.netlify.app`)

### วิธีที่ 3: Shared Hosting

1. Upload ไฟล์ทั้งหมดผ่าน FTP
2. ใส่ลง `public_html/` หรือ `www/`
3. เข้าถึงผ่าน domain ของคุณ

---

## 🛠️ Troubleshooting

### ปัญหา: Fonts ไม่แสดงผล
**แก้ไข:** ตรวจสอบ internet connection (fonts โหลดจาก Google Fonts)

### ปัญหา: Mobile menu ไม่ทำงาน
**แก้ไข:** ตรวจสอบว่ามี `script.js` ในโฟลเดอร์เดียวกัน และ path ถูกต้อง

### ปัญหา: Form ไม่ส่งข้อมูล
**แก้ไข:** ตรวจสอบ console ใน browser (F12) เพื่อดู error

### ปัญหา: Images ไม่แสดง
**แก้ไข:** ตรวจสอบ path ของรูปภาพใน HTML ว่าถูกต้อง

---

## 📞 Support & Contact

สำหรับคำถามหรือปัญหาเพิ่มเติม:

- 📧 Email: info@i-clean.co.th
- 💬 Line: @iclean.th
- 📱 Phone: 02-XXX-XXXX

---

## 📝 License

© 2024 i-Clean. All Rights Reserved.

---

## 🙏 Credits

- **Design & Development:** AI-Powered Web Design
- **Icons:** Emoji Unicode
- **Fonts:** Google Fonts (Kanit, Prompt)
- **Color Palette:** Based on brand identity

---

## 🔄 Version History

**v1.0.0** (2024-10-16)
- ✅ Initial release
- ✅ Full responsive design
- ✅ All sections completed
- ✅ Interactive features
- ✅ Form handling
- ✅ SEO optimization

---

**Made with 💚 for i-Clean Thailand**
