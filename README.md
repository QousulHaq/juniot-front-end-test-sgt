# 🌐 Test Front-End Web Application (CRUD Product)

Proyek ini merupakan **front-end web application** yang dibangun menggunakan **Next.js**, **TypeScript**, dan **Ant Design (AntD)**.  
Aplikasi ini berfungsi sebagai antarmuka pengguna untuk sistem CRUD produk berbasis API yang terhubung dengan backend (Node.js).  
Autentikasi pengguna menggunakan **Firebase Authentication**.

---

## ⚙️ Instalasi dan Setup

### 1. Clone Repository

```bash
git clone https://github.com/QousulHaq/juniot-front-end-test-sgt.git
cd nama-project
```

### 2. Install Dependensi

Gunakan salah satu perintah berikut:

```bash
# Menggunakan npm
npm install

# atau menggunakan yarn
yarn install
```

---

### 3. Konfigurasi Environment Variables

Salin file contoh konfigurasi:

```bash
cp .env.example .env
```

Lalu isi variabel di file `.env` seperti berikut:

```env
# URL backend API (contoh: Laravel)
BACKEND_URL=http://localhost:8001/api/web/v1

# URL API Route dari Next.js (proxy ke backend)
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000/api
```

---

### 4. Konfigurasi Firebase

Isi variabel berikut menggunakan data dari **Firebase Project Settings → General → SDK setup and configuration (Web App)**:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

> ⚠️ **Catatan:** Pastikan domain lokal (misalnya `localhost`) sudah ditambahkan ke daftar Authorized Domains di Firebase Authentication.

---

### 5. Jalankan Aplikasi

Untuk mode pengembangan:

```bash
npm run dev
# atau
yarn dev
```

Akses di browser melalui:
👉 [http://localhost:3000](http://localhost:3000)

---

### 6. Build untuk Production

```bash
npm run build
npm start
# atau
yarn build
yarn start
```

---

## 🧩 Struktur Folder

```
src/
├─ app/              # Routing utama Next.js (App Router)
├─ components/       # Reusable UI Components
├─ hooks/            # Custom React Hooks
├─ lib/              # Konfigurasi helper (Axios, Firebase, dsb)
└─ types/            # TypeScript type definitions
```

---

## 🧰 Tech Stack

| Kategori | Teknologi |
|-----------|------------|
| Framework | [Next.js 14](https://nextjs.org/) |
| Bahasa | [TypeScript](https://www.typescriptlang.org/) |
| UI Library | [Ant Design](https://ant.design/) + [Tailwind CSS](https://tailwindcss.com/) |
| State Management | React Hooks / React Query |
| Authentication | [Firebase Authentication](https://firebase.google.com/docs/auth) |
| API Client | Axios (custom axios instance in lib/axiosInstance.ts) |

---

## 🚀 Fitur Utama

- 🔐 **Login & Register** menggunakan Firebase Authentication  
- 📦 **CRUD Produk / Data** dengan koneksi API backend  
- 🔄 **React Query Integration** untuk caching & refetch data  
- 🎨 **Responsive UI** menggunakan Tailwind + Ant Design  
- ⚙️ **Konfigurasi Environment yang mudah dan fleksibel**

---

## ⚠️ Catatan

- Pastikan backend sudah berjalan sebelum menjalankan frontend  
- Jangan commit file `.env` ke repository publik  
- Untuk integrasi Firebase, pastikan kredensial yang digunakan **tidak bersifat sensitif** atau gunakan environment variables pada server

---

### ✨ Dibangun dengan ❤️ menggunakan Next.js + TypeScript + Firebase
