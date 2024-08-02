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
  Responsible for the map page, app architecture, documentation, prototyping and legal work.
- [Filip](https://github.com/filvr), 3rd year Chemical Engineering student. Responsible for marketing and finances.
- [Jack](https://github.com/JSnelgrove), 3rd year Computer Science student. Responsible for the List page, design, ads and prototyping.
- [Nat](https://github.com/ntrem071), 4th year Computer Engineering student. Responsible for the Account page, marketing and ads.
- [Tomer](https://github.com/tomersz12), 3rd year Computer Science student. Responsible for operations, marketing, design and branding.

## Developer Setup

**WARNING:** Do NOT run this app in a Windows Subsystem for Linux (WSL) environment. You will run into issues with
IP addresses, port forwarding and poor performance.

1.  Install dependencies

    ```bash
    npm install
    npm run prepare
    ```

2.  Setup and sign in to Expo EAS

    ```bash
    npm install -g eas-cli
    eas login
    ```

3.  Add API key

    A Mapbox Access Token (API Key) is required to build this app. Once you have one,
    make a copy of `project.env.ts.example` named `project.env.ts`, and add your access token in the file.

    Follow the instructions in [this Mapbox help article](https://docs.mapbox.com/help/getting-started/access-tokens/)
    to create an access token. If you do not have a Mapbox account, you will need to make one.

    Make sure that the access token that you create has access to the following Mapbox API endpoints:

    - NAVIGATION:
      - Directions API
      - Isochrone API
    - SEARCH:
      - Search Box API Sessions
      - Search Box API Requests

    As a reminder, as you are the owner of the token, you are responsible for all charges associated with usage
    of the Mapbox APIs through your key. Please review the [Mapbox Pricing Structure](https://www.mapbox.com/pricing)
    for each of the 4 endpoints listed above to make yourself aware of the free usage limits.

    **SHOPPING TAKES NO RESPONSIBILITY FOR ANY MAPBOX API FEES THAT YOU INCUR AS A RESULT OF USING OUR APP.**

    **NOTE:** File-based API key storage is not secure and is only being used as a temporary solution for prototyping.
    You should deactivate your key when not in use.

    **WARNING:** If you try to launch the app without a Mapbox Access Token, it will crash.

4.  Start the app

    ```bash
     npx expo start
    ```

### Accessing the app using Expo Go

Once Expo is ready, the recommended usage method is to download the Expo Go app on an Android or iOS device of your
choice and log into the Expo Go app using your Expo EAS credentials. Provided you are on the same network and your
computer is discoverable, you should be able to tap the session in the Expo Go app to open the ShopPing app.
You can also scan the QR code shown in your terminal output.

For more information on how to use Expo Go, please see [this Expo website](https://expo.dev/go).

**WARNING**: While Expo Go nominally supports opening the app in a web browser, we have NOT implemented the polyfills
required for web support as ShopPing is meant to be used on a mobile device. As such,
we cannot guarantee any functionality if you attempt to open the app in a browser.

For developers: Instructions for implementing the polyfills are located in a comment at the top of `app/_layout.tsx`,
should web support be desired in the future.

### Alternatives to Expo Go

If Expo Go does not work for you, you may try using a platform emulator or simulator provided you have the relevant
SDK available on your computer. Instructions for doing so are below:

- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)

As a last resort, you may fallback to
[development builds](https://docs.expo.dev/develop/development-builds/introduction/).
However, note that we have not tested this method, and as such, we cannot guarantee any
functionality if you choose to use it.
