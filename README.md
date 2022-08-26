## React Native skeleton
React Native skeleton repository

## Setup

- Note: Make sure to install jq package in linux(sudo apt install jq)/mac(brew install jq)
- Run ./start.sh
- Enter Your project name and wait for the command to exit.

### Development

Requires:
- Node
- React Native Environment Setup  [here](https://readytowork.atlassian.net/wiki/spaces/WAT/pages)

Environment Files required for the project can be found [here](https://readytowork.atlassian.net/wiki/spaces/WAT/pages)

#### After environment for development has been installed.

- Copy `config.ts` file from `config.ts.example` to `environments/<dev|local|prod>`.
  - **NOTE** `apiUrl` needs ip address of server if running from live device.

- For firebase configuration
  - Android
    - Copy **google-services.json** inside `android/app` as `google-services.json.<dev|local|prod>`

  - IOS
    - Copy **GoogleService-Info.plist** inside `ios` as `GoogleService-Info.plist.<dev|local|prod>`

- Finally, run `yarn set:env:<dev|local|prod>` to set up the required environmental configuration.

#### ▶️ Run on android

- `react-native start` will start development server.
- `react-native run-android` will run the project in mobile for android.

#### ▶️ Run on ios

- if pod install is not done. you need to go to `ios` directory and run command `pod install` or `npx pod install`.
For m1 macs (running with rosetta emulation) `sudo arch -x86_64 gem install ffi` and `arch -x86_64 pod install`

- `react-native run-ios` will run project in simulator in ios.
