# 🩺 Patient Registry App – React + Vite + PGlite

A modern **frontend-only** web application to register and manage patient data locally using [PGlite](https://pglite.dev/docs/). Built with **React**, **Vite**, and **PGlite**, this lightweight app enables patient registration, raw SQL querying, data persistence, and responsive UI — all in the browser.


## 🚀 Features

### 📋 Patient Registration
- Register new patients with details: Name, Age, Gender, Contact, Address
- Form validation includes:
  - Contact number must be numeric and at least 10 digits
  - Address is mandatory
  - Displays inline error messages

### 🔎 Query Interface
- Write and execute custom **SQL** queries (e.g. `SELECT * FROM patients`)
- Search patient records by **name**
- View results in a clean, responsive table

### 🧰 Data Management
- **Delete** individual patient records from query results
- **Export** all query results as a `.csv` file
- Data persists using **IndexedDB** for local storage
- Supports multi-tab access and page refreshes

### 🧭 Navigation & UI
- Intuitive navigation with routes:
  - `/` → Home
  - `/register` → Register Patient
  - `/query` → Query Records
- UI includes:
  - Responsive layout
  - Back-to-Home buttons
  - Styled buttons with hover effects
  - Clean, modern font and spacing



## 🛠️ Tech Stack

| Tool/Library        | Purpose                          |
|---------------------|----------------------------------|
| **React**           | Frontend UI                      |
| **Vite**            | Fast bundler & dev server        |
| **PGlite**          | Postgres-like SQL in the browser |
| **UUID**            | Generate unique patient IDs      |
| **CSS**             | Responsive and styled UI         |



## 📦 Setup Instructions

### 🧑‍💻 Local Development

#### Clone the repo
```bash
git clone https://github.com/Ashishkr05/patient-registry-pglite
cd patient-registry-pglite
````

#### Install dependencies

```bash
npm install
```

#### Run locally

```bash
npm run dev
```
