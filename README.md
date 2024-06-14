# Contact manager app



https://github.com/alihussnain-git/ContactManager/assets/58841397/b8203f36-91ef-4153-b1fc-b4affb710cfc




## Prerequisites

Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup)


## Installation

run `yarn`
This command will install all packages and prepare the development environment to run the app.
```
for building ios after yarn install run 
1. cd ios
2. pod install
```

## Available scripts

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
yarn start
```

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For android

```bash
yarn android
```

### For iOS

```bash
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

### Run tests
```
yarn test
```

### Run Lint
```
yarn lint
```

## Solution
This React Native contact manager app allows users to sync their phone contacts with the app. If the user chooses to sync, their saved contacts will auto-populate within the app. If not, the contact list will be empty by default. Users can add new contacts, including a name, email address, and phone number. Additionally, users can view and edit existing contacts, ensuring that the ability to edit a contact is properly implemented.

User permission handling is implemented effectively, allowing users to sync contacts later if they initially deny permission. A sync button is added to enable users to import contacts from their phone at any time.

The app uses Redux Toolkit (RTK) for state management in combination with Redux Persist to maintain state across sessions. For accessing phone contacts, the app leverages the react-native-contacts library.


## Know limitations 
Due to time constraints, the following limitations are present:

- Limited Testing: The app has basic testing coverage for 3 screens, but more comprehensive tests, including unit tests and integration tests, are needed to ensure robustness and prevent potential bugs.

- No App Theming (color, spacing, typography, etc.): The app does not include a customizable theme, which affects the visual consistency and user experience. Implementing theming would allow for a more polished and cohesive look and feel plus cleaner code when it comes to styles.

- No Localization: The app is currently available only in one language. Localization would make the app accessible to a broader audience by supporting multiple languages, enhancing user experience for non-English speakers and avoiding hard coded strings in code.

- No End-to-End (e2e) Tests: The app lacks end-to-end tests, which are crucial for validating the entire application flow from the user's perspective. E2E tests help ensure that all components of the app work together correctly and that critical workflows are functioning as intended.

