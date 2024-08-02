# ShopPing App

ShopPing is for time and money conscious shoppers. It is a cross-platform, React Native-based Android and iOS app.
Our app brings more efficient shopping trips to shoppers by analyzing their shopping lists and daily habits
to help them make as few stops as possible.

## User Experience Plan

### List Page

On this page, users can enter their shopping lists for the app to process.

They can also create multiple lists, and logged-in users also gain the ability to share lists
to other ShopPing users.

### Map Page

This part of the app presents an interface very similar to popular mapping apps. Users enter their desired
start and end locations (for example, home and work). The app will calculate the best route, and then
will check each store along the route and display a number over each store showing the number of items available from
the user's shopping list for that store.

The number will take into account the stock availability at each store. Tapping a marker will display
details about the store, as well as its address.

This feature helps users find stores along their travels so they can avoid wasting time making separate
shopping trips and can instead pick up goods while they're already out of the house.

At the present, directions default to driving directions only. Alternative modes will be added in future
releases.

### Notifications

If the user grants location permissions, they can also benefit from on-the-go notifications.
This feature will regularly use the user's location to search for stores near the user.
If a nearby store has a sufficient number of items available from the user's shopping list
(configurable in the settings), a notification will be presented to the user, allowing them the option
to shop now to save their time later.

If users do not want to share their location, they can still use the map feature to search for stores
near them.

## Team

ShopPing was developed as a project for the GNG 4120/GNG 5120/EED 5120 class at the University of Ottawa.

ShopPing was created by:

- [Eric](https://github.com/ricetech), 5th year Software Engineering student.
  Responsible for the map page, app architecture, prototyping and legal work.
- [Filip](https://github.com/filvr), 3rd year Chemical Engineering student. Responsible for marketing and finances.
- [Jack](https://github.com/JSnelgrove), 3rd year Computer Science student. Responsible for the List page, design, ads and prototyping.
- [Nat](https://github.com/ntrem071), 4th year Computer Engineering student. Responsible for the Account page, marketing and ads.
- [Tomer](https://github.com/tomersz12), 3rd year Computer Science student. Responsible for operations, marketing, design and branding.

## Developer Setup

1.  Install dependencies

    ```bash
    npm install
    npm run prepare
    ```

2.  Setup and sign into Expo EAS

    ```bash
    npm install -g eas-cli
    eas login
    ```

3.  Add API key

    A Mapbox API key is required to build this app. Once you have one, make a copy of `project.env.ts.example`
    named `project.env.ts`, and add your API key in the file.

    **NOTE:** File-based API key storage is not secure and is only being used as a temporary solution for prototyping.
    You should deactivate your key when not in use.

4.  Start the app

    ```bash
     npx expo start
    ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo
- **NOTE**: Web may work, but it is not officially supported and may be broken. If full web support is desired,
  the commented steps in \_layout.tsx should be completed.
