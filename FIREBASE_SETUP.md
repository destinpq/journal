# Firebase Setup Guide

This guide will help you set up and configure Firebase for your Personal Journey Tracker app.

## 🔥 Firebase Services Used

- **Firestore Database**: For storing weight, exercise, and journal entries
- **Firebase Authentication**: Ready for future user authentication
- **Firebase Analytics**: For tracking app usage

## 🚀 Setup Instructions

### 1. Firebase Project Setup
Your Firebase project is already configured with the following details:
- **Project ID**: `journal-dec12`
- **App ID**: `1:534952391913:web:8c46a8722f9468825d6c78`
- **Domain**: `journal-dec12.firebaseapp.com`

### 2. Firestore Database Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (`journal-dec12`)
3. Navigate to **Firestore Database**
4. Click **Create database**
5. Choose **Start in test mode** for development
6. Select your preferred location

### 3. Firestore Security Rules
Update your Firestore security rules for development:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access for all documents (development only)
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**⚠️ Note**: These rules are for development only. Implement proper authentication and authorization for production.

## 📁 Collections Structure

The app creates the following Firestore collections:

### `weightEntries`
```typescript
{
  id: string,
  date: Timestamp,
  weight: number,
  createdAt: Timestamp
}
```

### `exerciseEntries`
```typescript
{
  id: string,
  date: Timestamp,
  description: string,
  duration?: number,
  createdAt: Timestamp
}
```

### `journalEntries`
```typescript
{
  id: string,
  date: Timestamp,
  title?: string,
  content: string,
  createdAt: Timestamp
}
```

## 🌱 Seeding Initial Data

To add some sample data for testing:

1. Start your development server: `npm run dev`
2. Open your app in the browser
3. Open the developer console (F12)
4. Import and run the seed function:
   ```javascript
   import { seedInitialData } from './scripts/seed-data.ts';
   seedInitialData();
   ```

## 🎯 Features

### ✅ What's Working
- **Real-time Updates**: Data syncs automatically across browser tabs
- **Offline Support**: Basic offline capabilities (Firebase SDK built-in)
- **Loading States**: Beautiful loading skeletons while data loads
- **Error Handling**: Graceful error boundaries and retry mechanisms
- **Responsive Design**: Works great on all devices

### 🔮 Future Enhancements
- **User Authentication**: Login with Google, email, or other providers
- **Data Export**: Export your data to CSV or PDF
- **Cloud Backup**: Automatic cloud backup of all your data
- **Sharing**: Share progress with friends or trainers
- **Push Notifications**: Reminders for logging entries

## 🛠️ Development Commands

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🐛 Troubleshooting

### Common Issues

1. **Firebase connection errors**
   - Check your internet connection
   - Verify Firestore is enabled in Firebase Console
   - Check browser console for detailed error messages

2. **Data not appearing**
   - Check Firestore security rules
   - Verify collections exist in Firebase Console
   - Look for JavaScript errors in console

3. **Loading forever**
   - Check network tab for failed requests
   - Verify Firebase configuration is correct
   - Try refreshing the page

### Error Messages

- **"Permission denied"**: Update Firestore security rules
- **"Firebase app not initialized"**: Check Firebase configuration
- **"Network error"**: Check internet connection and Firebase status

## 📞 Support

If you encounter any issues:
1. Check the browser console for error messages
2. Verify your Firebase project settings
3. Ensure Firestore is properly configured
4. Try clearing browser cache and cookies

## 🔐 Security Notes

- Current setup uses test mode (no authentication required)
- For production, implement proper user authentication
- Update security rules to protect user data
- Consider implementing field-level security rules

---

Happy tracking! 🚀 