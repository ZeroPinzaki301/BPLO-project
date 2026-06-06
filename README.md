# 📑 BPLO Management System - Municipality of Angat

An automated management system for the **Business Permit and Licensing Office (BPLO)** of the Municipality of Angat, Bulacan. This full-stack MERN application eliminates manual certificate editing in Microsoft Word, centralizes client records, and provides dynamic template generation for barangay-specific clearances.

## 🎯 Project Overview

The BPLO currently faces challenges in manually editing business clearances and certificates using Microsoft Word, leading to inefficiencies, formatting errors, and difficulty retrieving historical client data. This system addresses those pain points by:

- Replacing manual Word document editing with a web-based form and PDF/print-ready output
- Storing client records in a structured database for easy retrieval and reporting
- Allowing barangay-specific certificate templates
- Exporting data to Excel for offline analysis and archival

## ✨ Key Features

- ✅ **Client Data Management** – Store and manage all business/client records with barangay-based categorization.
- ✅ **Dynamic Certificate Generation** – Automatically populate certificates from saved form data (no more manual Word editing).
- ✅ **Barangay-Specific Templates** – Switch or customize clearance certificate formats based on barangay.
- ✅ **Excel Export** – Export client records or permit data to `.xlsx`/`.csv` files.
- ✅ **User Authentication** – Secure login for BPLO staff (optional role-based access).
- ✅ **Search & Filter** – Quickly find client records by name, barangay, or permit type.

## 🛠️ Tech Stack (MERN)

| Layer       | Technology                      |
|-------------|---------------------------------|
| Frontend    | React.js (Vite/CRA)             |
| Backend     | Node.js + Express.js            |
| Database    | MongoDB (Atlas or local)        |
| Excel Export| `xlsx` or `exceljs` library     |
| PDF/Print   | `react-print-pdf` / browser print |
| Styling     | TailwindCSS / Bootstrap (your choice) |

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB (local or Atlas URI)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ZeroPinzaki301/BPLO-project.git
   cd BPLO-project
   cd backend
   npm install
   npm start
  
   cd ../frontend
   npm install
   npm run dev

   
