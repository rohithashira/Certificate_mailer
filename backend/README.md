# Certificate Generation and Email Delivery System

A Node.js application that generates certificates dynamically using backend data and delivers them via email.

## Features

- **Backend Data Input**: Collects user information including name, email, GST number, business name, and business address
- **Certificate Generation**: Creates certificates in both JPG and PDF formats with dynamic data population
- **Email Delivery**: Automatically sends generated certificates to user's email address
- **React Frontend**: Clean and simple interface for certificate generation
- **PostgreSQL Database**: Stores user information and certificate records

## Tech Stack

### Backend
- Node.js with Express.js
- PostgreSQL database
- Canvas for JPG generation
- jsPDF for PDF generation
- Nodemailer for email delivery

### Frontend
- React with Vite
- Axios for API calls
- Modern CSS styling

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd certificate_generator
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Set up PostgreSQL database**
   - Install PostgreSQL on your system
   - Create a database named `certificate_db`
   - Run the schema file:
   ```bash
   psql -U your_username -d certificate_db -f database/schema.sql
   ```

5. **Configure environment variables**
   - Copy `env.example` to `.env`
   - Update the database and email configuration:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=certificate_db
   DB_USER=your_username
   DB_PASSWORD=your_password
   
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   
   PORT=5000
   NODE_ENV=development
   ```

## Running the Application

### Development Mode

1. **Start the backend server**
   ```bash
   npm run dev
   ```

2. **Start the frontend (in a new terminal)**
   ```bash
   cd client
   npm run dev
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Production Mode

1. **Build the frontend**
   ```bash
   cd client
   npm run build
   cd ..
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:email` - Get user by email
- `POST /api/users` - Create new user

### Certificates
- `POST /api/certificates/generate` - Generate certificate for user
- `GET /api/certificates/:email` - Get certificate by user email
- `GET /api/certificates/download/:email/:format` - Download certificate (jpg/pdf)

## Usage

1. **Access the frontend** at http://localhost:3000
2. **Enter user email and amount** in the form
3. **Click "Create Certificate"** to generate and send the certificate
4. **View the generated certificate** and download options
5. **Download certificates** in JPG or PDF format

## Database Schema

The application uses two main tables:

### Users Table
- `id` - Primary key
- `name` - User's full name
- `email` - User's email address (unique)
- `gst_number` - GST registration number
- `business_name` - Business name
- `business_address` - Business address
- `amount` - Transaction amount
- `created_at` - Record creation timestamp
- `updated_at` - Record update timestamp

### Certificates Table
- `id` - Primary key
- `user_id` - Foreign key to users table
- `certificate_path` - Path to generated certificate file
- `email_sent` - Boolean indicating if email was sent
- `created_at` - Certificate generation timestamp

## Email Configuration

The application uses Nodemailer for email delivery. For Gmail:

1. Enable 2-factor authentication
2. Generate an app password
3. Use the app password in the `EMAIL_PASS` environment variable

## File Structure

```
certificate_generator/
├── client/                 # React frontend
│   ├── src/
│   │   ├── App.jsx        # Main React component
│   │   ├── main.jsx       # React entry point
│   │   └── index.css      # Global styles
│   ├── package.json       # Frontend dependencies
│   └── vite.config.js     # Vite configuration
├── database/
│   ├── connection.js      # Database connection
│   └── schema.sql         # Database schema
├── routes/
│   ├── certificates.js    # Certificate routes
│   └── users.js          # User routes
├── utils/
│   ├── certificateGenerator.js  # Certificate generation logic
│   └── emailService.js          # Email service
├── certificates/          # Generated certificate files
├── server.js             # Express server
├── package.json          # Backend dependencies
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
