# Jalin App 🧵

**Jalin** is a mobile application that connects customers with professional tailors (penjahit) for custom sewing services. Built for Mobile Programming Class using React Native and Expo, this app provides a platform for seamless communication and service booking between clients and tailors.

## 📱 Features

### For Customers
- **Browse Tailors**: Find professional tailors in your area
- **Job Posting**: Create custom sewing job requests with specifications
- **Real-time Chat**: Communicate directly with tailors
- **Image Upload**: Share reference images for custom work
- **Location Services**: Find nearby tailors using GPS
- **Profile Management**: Manage personal information and preferences

### For Tailors
- **Professional Profile**: Showcase skills and portfolio
- **Job Management**: View and accept customer requests
- **Dashboard**: Track ongoing projects and earnings
- **Chat System**: Communicate with clients
- **Work Gallery**: Display completed projects

### General Features
- **Authentication**: Secure login and registration
- **Push Notifications**: Stay updated on job status
- **Multi-platform**: iOS, Android, and Web support
- **Offline Support**: Basic functionality without internet

## 🛠️ Tech Stack

### Frontend
- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tools
- **TypeScript**: Type-safe JavaScript
- **Expo Router**: File-based navigation

### Backend & Services
- **Firebase**: Authentication and real-time database
- **Firestore**: NoSQL document database
- **Cloudinary**: Image storage and optimization
- **Expo Location**: GPS and location services

### UI/UX
- **React Native Reanimated**: Smooth animations
- **Expo Vector Icons**: Comprehensive icon library
- **React Native Maps**: Interactive maps
- **Custom Styling**: Responsive design system

## 📁 Project Structure

```
jalin-app/
├── app/                    # Main application routes
│   ├── (app)/             # Protected app routes
│   │   ├── (tabs)/        # Tab navigation
│   │   │   ├── dashboard/ # Dashboard features
│   │   │   ├── jahitan/   # Sewing job management
│   │   │   └── penjahit/  # Tailor features
│   │   ├── chat.tsx       # Chat functionality
│   │   └── profile.tsx    # User profile
│   ├── (auth)/            # Authentication routes
│   │   ├── login.tsx      # Login screen
│   │   ├── signup.tsx     # Registration screen
│   │   └── create-profile.tsx # Profile setup
│   └── _layout.tsx        # Root layout
├── components/            # Reusable UI components
│   ├── CardPekerjaan.tsx  # Job card component
│   ├── CardPenjahit.tsx   # Tailor card component
│   ├── Header.tsx         # App header
│   ├── SearchInput.tsx    # Search functionality
│   └── MessageList.tsx    # Chat messages
├── config/                # Configuration files
│   └── firebase.ts        # Firebase setup
├── hooks/                 # Custom React hooks
├── service/               # External services
│   └── cloudinaryService.ts # Image upload service
├── styles/                # Styling system
├── constant/              # App constants
├── context/               # React context providers
├── assets/                # Images and static files
└── android/               # Android-specific files
```

## 🎯 Usage

### For Customers
1. **Register/Login**: Create an account or sign in
2. **Create Profile**: Set up your customer profile
3. **Browse Tailors**: Explore available tailors in your area
4. **Post Job**: Create a new sewing job with details and images
5. **Chat**: Communicate with interested tailors
6. **Track Progress**: Monitor your job status in the dashboard

### For Tailors
1. **Register as Tailor**: Sign up and complete tailor verification
2. **Set Up Shop**: Create your professional profile with portfolio
3. **Browse Jobs**: View available sewing jobs
4. **Accept Work**: Respond to job postings
5. **Manage Projects**: Track ongoing work in your dashboard
6. **Communicate**: Chat with clients about project details

## 🔧 Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run in web browser
- `npm test` - Run the test suite
- `npm run lint` - Run ESLint for code quality
- `npm run reset-project` - Reset to blank project template

## 🏗️ Building for Production

### Development Build
```bash
eas build --profile development
```

### Production Build
```bash
eas build --profile production
```

### Submit to App Stores
```bash
eas submit --platform ios
eas submit --platform android
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is created for educational purposes as part of Mobile Programming Class.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the [Expo documentation](https://docs.expo.dev/)

## 🙏 Acknowledgments

- Expo team for the amazing development platform
- Firebase for backend services
- React Native community for excellent libraries
- Mobile Programming Class instructors and students

---

Made with ❤️ for Mobile Programming Class
