**Job Tracker**
A full-stack MERN application designed to help job seekers efficiently organize, track, and analyze their job applications. Users can manage applications across custom Kanban columns, view graphical insights, filter entries by tags, and export data.

**Features**
-> Secure Authentication: User registration and login utilizing JSON Web Tokens (JWT) and bcryptjs password hashing.
-> Full CRUD Operation: Create, read, update, and delete job applications tied exclusively to individual user accounts.
-> Kanban Status Board: Categorized workflow views for tracking application progress through Applied, Interview, Offer, and Rejected stages.
-> Dynamic Analytics: Visual performance breakdowns via interactive Bar and Pie charts powered by chart.js and react-chartjs-2.
-> Search & Filter: Local search filtering by company/position and interactive tag cloud categorization.
-> Data Portability: Local CSV spreadsheet exporter built with papaparse.
-> Overdue Alerts: Native date calculations highlighting missed or overdue milestones.

**Tech Stack**
*Backend*
    Node.js & Express — RESTful API routing and application server structure.
    MongoDB & Mongoose — Schematized relational NoSQL cloud database.
    JSON Web Tokens (JWT) — Stateless secure user session assignment.
    BcryptJS — One-way salting and hashing algorithm for storage security.

*Frontend*
    React (v18) — Context API state handling and component life-cycles.
    React Router DOM — Secure declarative routing engine with dedicated Private Routes.
    Axios — Promised-based client-side HTTP networking wrapper.
    Chart.js & PapaParse — Extensible data charting and text stream handling utilities.

**Repository Structure**
Job-Tracker/
├── backend/
│   ├── config/          # Database connection orchestration
│   ├── controllers/     # API execution blocks (Auth & Jobs)
│   ├── middleware/      # Protected endpoint access security layer
│   ├── models/          # Strict database schemas (User & Job)
│   ├── routes/          # REST Endpoint path mappings
│   ├── .env             # Environment variables profile
│   └── server.js        # Main express assembly entryway
└── frontend/
    └── src/
        ├── api/         # Global axios endpoint routing profile
        ├── components/  # Modular interface controls (Cards, Forms, Nav)
        ├── context/     # Global access lifecycle provider (AuthContext)
        ├── pages/       # Display views (Dashboard, Analytics, Auth)
        ├── App.js       # App configuration and route bindings
        └── index.js     # Dom attachment injection point

