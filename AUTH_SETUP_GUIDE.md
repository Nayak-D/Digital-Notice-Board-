# Authentication Setup Guide

## Overview
The Digital Notice Board now supports dual authentication modes: **Student Login** and **Admin Login** with specific credentials.

## Login Credentials

### 🎓 Student Login
- **Email:** `student@gmail.com`
- **Password:** `student@123`
- **Access:** Student Notice Feed
- **Route:** `/` (home page)

### 👨‍💼 Admin Login
Only the following emails are authorized to login as admin with the universal admin password:

| Email | Role |
|-------|------|
| `nayak@gmail.com` | Admin |
| `akhil@gmail.com` | Admin |
| `jilan@gmail.com` | Admin |
| `trinadh@gmail.com` | Admin |

**Password (all admins):** `admin@123`

**Access:** Admin Dashboard
**Route:** `/admin`

## Frontend Changes

### LoginPage.tsx (`frontend/src/pages/LoginPage.tsx`)
- Added toggle buttons for **Student** and **Admin** login modes
- Displays appropriate placeholder text based on selected mode
- Shows demo credentials in an info card
- Automatically routes users to correct dashboard based on role

### Types Update (`frontend/src/types/index.ts`)
- Updated `LoginDto` interface to include optional `mode` field ('student' | 'admin')

## Backend Changes

### Auth Controller (`backend/src/controllers/authController.js`)
- Enhanced `login` function to handle both student and admin authentication
- **Admin Login Validation:**
  - Checks if email is in the allowed admin list
  - Validates password is exactly `admin@123`
  - Automatically creates admin user in database if not exists
  - Maintains backward compatibility with existing student login

### Database Seed (`backend/src/utils/seed.js`)
- Creates all 4 admin users with correct emails
- Creates student demo account with `student@gmail.com`
- All users use unified passwords for easier testing
- Updated console output with new credentials

## How It Works

### Student Login Flow
1. User selects "Student" tab on login page
2. Enters `student@gmail.com` and password
3. Backend validates credentials against database
4. On success, user is redirected to `/` (student feed)

### Admin Login Flow
1. User selects "Admin" tab on login page
2. Enters authorized admin email (nayak@, akhil@, jilan@, or trinadh@gmail.com)
3. Enters password `admin@123`
4. Backend:
   - Verifies email is in allowed admin list
   - Checks password matches
   - Creates user in database if first time login
   - Returns admin token and user data
5. User is redirected to `/admin` (admin dashboard)

## Security Notes

⚠️ **For Production:**
- Store allowed admin emails in environment variables or database config
- Use proper password hashing for admin credentials
- Implement rate limiting on login endpoint
- Add email verification for admin accounts
- Implement session timeout
- Use HTTPS only

## Testing

### Seeds the Database
Run the seed script to populate database with test users:
```bash
cd backend
npm run seed
```

This will create:
- 4 admin accounts (nayak@, akhil@, jilan@, trinadh@ gmail.com) with password `admin@123`
- 1 student account (student@gmail.com) with password `student@123`
- Sample notices for demonstration

### Manual Testing

**Test Student Login:**
1. Navigate to login page
2. Click "Student" tab
3. Enter: student@gmail.com / student@123
4. Should redirect to notice feed

**Test Admin Login:**
1. Navigate to login page
2. Click "Admin" tab
3. Enter: nayak@gmail.com / admin@123
4. Should redirect to admin dashboard

**Test Invalid Credentials:**
1. Try non-authorized email in admin mode
2. Try wrong password
3. Should show error toast

## API Endpoint

**POST `/api/auth/login`**

Request body:
```json
{
  "email": "nayak@gmail.com",
  "password": "admin@123",
  "mode": "admin"
}
```

Response:
```json
{
  "success": true,
  "message": "Welcome back, Nayak Admin!",
  "data": {
    "user": {
      "id": "user_id",
      "name": "Nayak Admin",
      "email": "nayak@gmail.com",
      "role": "admin"
    },
    "token": "jwt_token"
  }
}
```

## File Changes Summary

| File | Change |
|------|--------|
| `frontend/src/pages/LoginPage.tsx` | Added student/admin mode toggle and UI |
| `frontend/src/types/index.ts` | Extended LoginDto with mode field |
| `backend/src/controllers/authController.js` | Enhanced login with admin validation |
| `backend/src/utils/seed.js` | Updated with new credentials |

---

**Last Updated:** April 27, 2026
**Status:** ✅ Ready for Testing
