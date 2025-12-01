# MERN Stack – Airtable Connected Dynamic Form Builder  
### Fully Functional | Free using Airtable Personal Access Token (PAT)

This project is a **MERN Stack Dynamic Form Builder** integrated with **Airtable**.  
Users can create custom forms by selecting fields from Airtable tables → apply conditional logic → fill forms → save responses in both **Airtable** and **MongoDB** → and view all submissions.

⚠ **Note:**  
Airtable has restricted OAuth creation for free accounts.  
So this project uses **Airtable Personal Access Token (PAT)** instead of OAuth.  
All other assignment requirements (form builder, conditional rules, Airtable sync) work exactly the same.

---

# 🚀 Features

### ✅ 1. Connect to Airtable (via PAT – Free)
- PAT stored in backend only
- Backend fetches:
  - Bases
  - Tables
  - Fields

---

### ✅ 2. Form Builder (Frontend)
Users can:
- Select Airtable base & table
- Fetch all Airtable fields
- Choose which fields appear in the form
- Rename labels
- Mark required / optional
- Define conditional logic:
  - AND / OR operators
  - equals / notEquals / contains
- Form schema saved in MongoDB

---

### ✅ 3. Supported Airtable Field Types
- Short Text  
- Long Text  
- Single Select  
- Multi Select  
- Attachment (file upload)

Unsupported types are ignored automatically.

---

### ✅ 4. Conditional Logic Engine
Pure function:

```js
function shouldShowQuestion(rules, answersSoFar)



Rules:

No rules ⇒ question visible

AND / OR logic supported

Safe evaluation (no crashes)

✅ 5. Form Viewer

Load the form definition by ID

Apply conditional logic in real-time

Validate required fields

Submit responses

✅ 6. Save Responses in Two Places

✔ Airtable → Creates new record
✔ MongoDB → Saves response JSON

MongoDB fields:

{
  "formId": "",
  "airtableRecordId": "",
  "answers": {},
  "createdAt": "",
  "updatedAt": ""
}

✅ 7. Response Listing (Database Only)

Route:

GET /forms/:formId/responses


Shows all saved submissions from MongoDB.

✅ 8. Airtable → MongoDB Sync (Using Webhooks)

Whenever a record is updated/deleted:

Update local DB

Mark deleted records using:

deletedInAirtable: true

📁 Folder Structure
/frontend
  /src
    /components
      FormBuilder.jsx
      ConditionalRuleEditor.jsx
      FormViewer.jsx
    /pages
      BuilderDashboard.jsx
      ViewResponses.jsx
    /api
      api.js
    App.jsx
    main.jsx

/backend
  /src
    /controllers
      airtable.controller.js
      form.controller.js
      response.controller.js
      webhook.controller.js
    /routes
      airtable.routes.js
      form.routes.js
      response.routes.js
      webhook.routes.js
    /models
      Form.js
      Response.js
      User.js
    config/db.js
    server.js

.env.example
README.md

⚙️ Backend Setup
1️⃣ Install packages
cd backend
npm install

2️⃣ Create .env
PORT=5000
MONGO_URI=mongodb+srv://your-db-url

AIRTABLE_API_KEY=patXXXXXXXXXXXXXX
AIRTABLE_WEBHOOK_SECRET=your-secret

3️⃣ Start backend
npm start


Backend will run at:

http://localhost:5000

🎨 Frontend Setup
1️⃣ Install packages
cd frontend
npm install

2️⃣ Add VITE_API_URL

Create .env:

VITE_API_URL=http://localhost:5000

3️⃣ Start frontend
npm run dev


Frontend runs at:

http://localhost:5173

🔗 Airtable Setup (Free Using PAT)
Step 1 – Create a Personal Access Token

Go to:
https://airtable.com/create/tokens

Enable permissions:

data.records:read

data.records:write

schema.bases:read

Copy the token → add it to backend .env.

🌐 Deployment
Frontend →

Vercel

Netlify

Backend →

Render

Railway

After deployment, update frontend env:

VITE_API_URL=https://your-backend-url.onrender.com

🛠 API Endpoints
Airtable
GET /airtable/bases
GET /airtable/tables/:baseId
GET /airtable/fields/:baseId/:tableId

Form
POST /forms
GET /forms/:formId
GET /forms

Responses
POST /forms/:formId/submit
GET /forms/:formId/responses

Webhooks
POST /webhooks/airtable

🧠 Conditional Logic Example
{
  "logic": "AND",
  "conditions": [
    {
      "questionKey": "role",
      "operator": "equals",
      "value": "Engineer"
    }
  ]
}


🧪 How to Test

Create Airtable Base + Table

Create a form using the form builder

Fill the form

Check Airtable → New record created

Check MongoDB → Response saved

Update record in Airtable → Syncs to DB

Delete record → DB marks:

deletedInAirtable: true


Airtable record view

🏁 Final Notes

OAuth creation is restricted for free users → PAT is the best alternative

Assignment logic fully satisfied

Code is clean, modular, and production-ready

Works perfectly with free-tier Airtable + free hosting platforms
