# LayOver - Layover Itinerary Application

Transform your long layovers from tedious waits into enjoyable, short travel experiences by helping you discover, plan, and manage activities, transportation, and accommodation within your layover city.

## 🚀 Features

### MVP (Phase 1)
- **Flight Information Input**: Manual input of flight details with automatic time calculations
- **Time Management**: Calculate usable "free time" accounting for security buffers and travel time
- **POI Discovery**: Search and display Points of Interest around layover cities
- **Basic Transportation**: Show estimated travel times from airport to city center
- **Simple Itinerary Builder**: Create chronological activity lists with time allocation
- **Mobile-First Design**: Clean, intuitive interface optimized for travelers on the go

### Planned Features (Phase 2 & 3)
- Real-time flight tracking and dynamic itinerary adjustments
- Intelligent recommendations based on preferences and layover duration
- Public transportation integration with real-time data
- Ride-sharing integration (Uber/Lyft)
- In-app booking for activities and transportation
- Push notifications for flight changes and reminders
- Offline mode for downloaded itineraries
- AI-powered itinerary generation

## 🛠 Technology Stack

### Frontend
- **React Native** with **Expo** for cross-platform development
- **Expo Router** for file-based navigation
- **TypeScript** for type safety
- **React Context** for state management

### APIs & Services
- **Google Places API** for POI discovery
- **Google Maps API** for mapping and directions
- **Google Directions API** for route planning
- **Axios** for HTTP requests

### Development Tools
- **ESLint** for code linting
- **Jest** for testing
- **Babel** for JavaScript compilation

## 📱 Screenshots

*Screenshots will be added once the app is running*

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd LayOverApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your API keys:
   ```
   GOOGLE_PLACES_API_KEY=your_google_places_api_key_here
   GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   GOOGLE_DIRECTIONS_API_KEY=your_google_directions_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Run on device/simulator**
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Scan QR code with Expo Go app on your phone

### API Keys Setup

1. **Google Cloud Console**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable the following APIs:
     - Places API
     - Maps JavaScript API
     - Directions API
   - Create credentials (API Key)
   - Add restrictions to the API key for security

2. **Add API Keys to Environment**
   - Copy your API keys to the `.env` file
   - Never commit API keys to version control

## 📁 Project Structure

```
LayOverApp/
├── app/                          # Expo Router app directory
│   ├── (auth)/                   # Authentication routes
│   ├── (tabs)/                   # Main tab navigation
│   ├── flight-input.tsx          # Flight details input
│   ├── poi-details.tsx           # POI detail view
│   ├── itinerary-builder.tsx     # Detailed itinerary builder
│   └── _layout.tsx               # Root layout
├── components/                   # Reusable components
│   ├── ui/                       # Basic UI components
│   ├── flight/                   # Flight-related components
│   ├── poi/                      # Points of Interest components
│   ├── itinerary/                # Itinerary components
│   └── common/                   # Shared components
├── constants/                    # App constants
├── hooks/                        # Custom React hooks
├── services/                     # API and external services
├── types/                        # TypeScript type definitions
├── utils/                        # Helper functions
├── context/                      # React Context providers
└── assets/                       # Static assets
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📦 Building for Production

### iOS
```bash
# Build for iOS
expo build:ios

# Or use EAS Build
eas build --platform ios
```

### Android
```bash
# Build for Android
expo build:android

# Or use EAS Build
eas build --platform android
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Follow the existing code style

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Maps Platform for location services
- Expo team for the amazing development platform
- React Native community for the ecosystem

## 📞 Support

For support, email support@layover-app.com or create an issue in this repository.

## 🔄 Roadmap

### Phase 1 (MVP) - Current
- [x] Project setup and structure
- [x] Basic flight input and time calculations
- [x] POI search and discovery
- [x] Simple itinerary builder
- [ ] UI/UX implementation
- [ ] Testing and bug fixes

### Phase 2 (Enhanced Features)
- [ ] Real-time flight tracking
- [ ] Smart recommendations
- [ ] Public transportation integration
- [ ] Ride-sharing integration
- [ ] User accounts and preferences

### Phase 3 (Advanced Features)
- [ ] In-app booking
- [ ] Push notifications
- [ ] Offline mode
- [ ] AI-powered recommendations
- [ ] Monetization features

---

**Made with ❤️ for travelers who want to make the most of their layovers** 