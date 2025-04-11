📱 React Native Project
This is a new React Native project, bootstrapped using @react-native-community/cli.

🛠️ Getting Started
Note: Before starting, ensure you've followed the React Native Environment Setup Guide.

🚀 Step 1: Start Metro
Metro is the JavaScript bundler for React Native. From your project root, start Metro with:

bash
Copy
Edit
# Using npm
npm start

# OR using Yarn
yarn start
📲 Step 2: Build and Run the App
In a new terminal window (with Metro running), build and run your app:

▶️ Android
bash
Copy
Edit
# Using npm
npm run android

# OR using Yarn
yarn android
🍏 iOS
For iOS development, ensure you have Xcode and CocoaPods installed.

Install CocoaPods (first time or when native dependencies change):

bash
Copy
Edit
bundle install
bundle exec pod install
Run the app:

bash
Copy
Edit
# Using npm
npm run ios

# OR using Yarn
yarn ios
If everything is set up correctly, your app will run in the emulator/simulator or on a connected device.

You can also build the app using Android Studio or Xcode directly.

✏️ Step 3: Modify Your App
Open the App.tsx file in your code editor and start making changes. Thanks to Fast Refresh, updates appear instantly.

🔁 Full Reload Options
Android: Press <kbd>R</kbd> twice or open Dev Menu with <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd</kbd> + <kbd>M</kbd> (macOS).

iOS: Press <kbd>R</kbd> in the iOS Simulator.