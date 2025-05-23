# 🩺 Patient Registry App – React + Vite + PGlite

A modern **frontend-only** web application to register and manage patient data locally using [PGlite](https://pglite.dev/docs/). Built with **React**, **Vite**, and **PGlite**, this lightweight app enables patient registration, raw SQL querying, local persistence, and a responsive UI — all running directly in the browser.


## 🚀 Features

### 📋 Patient Registration
- Register new patients with fields: **Name**, **Age**, **Gender**, **Contact**, **Address**
- Smart form validation:
  - Contact number must be numeric and at least 10 digits
  - Address is mandatory
  - Inline error messages for better UX

### 🔎 Query Interface
- Run raw **SQL** queries (eg. `SELECT * FROM patients`)
- Search by **patient name**
- View results in a clean table format
- Export results to **CSV**
- Delete individual records from the query results

### 🔄 Multi-Tab Sync & Persistence
- All patient data is stored using **IndexedDB**
- Uses `localStorage` signaling + **PGlite’s sharedWorker** for real-time sync across multiple tabs
- New records or deletions reflect instantly without page refresh

### 📊 Visual Stats Dashboard
- Gender distribution (Pie chart)
- Age group distribution (Bar chart)
- Total registered patients displayed dynamically

### 🧭 Navigation & UI
- Clean routing:
  - `/` → Home
  - `/register` → Register Patient
  - `/query` → Query Records
  - `/stats` → Patient Dashboard (if included)
- Includes:
  - Back-to-Home buttons
  - Styled buttons with hover effects
  - Fully responsive layout with modern styling


## 🛠️ Tech Stack

| Tool/Library         | Purpose                              |
|----------------------|--------------------------------------|
| **React**            | Frontend UI                          |
| **Vite**             | Lightning-fast dev/build tool        |
| **PGlite**           | In-browser PostgreSQL storage engine |
| **UUID**             | Generate unique patient IDs          |
| **Chart.js**         | Visual statistics        |
| **CSS**              | Custom styling and layout            |



## 📦 Setup & Usage Instructions

### 📁 Clone the Repository
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
This will launch the app at http://localhost:5173.

## ✨ What This App Can Do (Feature Highlights)

| Feature | Description |
|--------|-------------|
| 📝 **Register Patients** | Add name, age, gender, contact number (validated), and address |
| 🧾 **SQL Query Tool** | Run custom SQL queries to filter or explore patient data |
| 🔍 **Search by Name** | Quickly find patients using the name search input |
| 🗑️ **Delete Records** | Remove patient entries directly from the results table |
| 📤 **Export to CSV** | Download the result table as a `.csv` file |
| 📊 **Statistics Dashboard** | See charts for gender and age group distribution |
| 🌐 **Multi-tab Sync** | Add a patient in one tab, see updates in another tab instantly |
| 💾 **Persistent Data** | Patient data is stored using IndexedDB (no data loss on refresh) |
| 📱 **Responsive Design** | Works smoothly on desktop and mobile screens |



## 🧪 How to Test It Yourself

1. **Register a New Patient**  
   Go to `/register`, fill in the form, and click "Register".

2. **Query Data**  
    Go to `/query`, write any valid SQL such as:  
   - `SELECT` to view data  
   - `UPDATE` to modify patient info  
   - `DELETE` to remove records  
   Just enter your query in the text area and click **Run Query** to execute it.

3. **Try Search and Delete**  
   Use the "Search by Name" field. You can also delete a patient using the "Delete" button.

4. **Check CSV Export**  
   After querying, click **Export to CSV** to download results.

5. **Open Two Tabs**  
   Open the app in two browser tabs. Add a new patient in one, switch to the other — it updates automatically.

6. **View Statistics**  
   Visit `/stats` to see real-time charts on registered patients.




## 🧠 Challenges Faced

### 🔄 1. Keeping Data in Sync Across Tabs
Since the app uses local storage only, ensuring data stays updated in multiple open tabs was important. This was handled by:
- Enabling `sharedWorker` in PGlite for shared IndexedDB access
- Using `localStorage` events to notify other tabs after a new patient is registered

### 🌐 2. Deploying with WebAssembly (WASM)
PGlite uses a `.wasm` file for database features, so a few adjustments were needed to deploy on Netlify:
- Updating `vite.config.js` to include `.wasm` files
- Manually uploading the `dist/` folder instead of using Git-based deploy

### 📈 3. Displaying Stats in a Clean Way
Integrating charts for gender and age groups was straightforward using `chart.js`, but some extra styling helped make them responsive and visually balanced on different screen sizes.
