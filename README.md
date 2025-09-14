# MoneySpy (IN PROGRESS)

MoneySpy is a Nuxt.js/Vue.js website where you can log and monitor your expenses. It offers a great dashboard, an expense tracking interface, an achievements system, profile settings, authentication, and more.

## How to run the website?

### Live Website
You can access the website at https://moneyspy-prod.web.app

### Run manually

#### Firebase project creation
This site uses Firebase. Therefore, to run it properly, you'll need a Firebase project. You can create one in the [Firebase console](https://console.firebase.google.com).

After creating your project, run the commands below to create the Firebase configuration files according to your preferences.

```bash
firebase login

firebase init
```

This project already has some configuration files that were used to deploy it to our environment, but they probably won't be useful to you.

Once you've completed all of your project configuration, run the Firebase's deploy command to apply it to your environment:

```bash
firebase deploy # or npm run deploy
```

#### Package installation
Make sure to install dependencies with NPM or an equivalent package manager.

(Note that the project was created with NPM and has a package-lock.json file. Therefore, if you want to use a different package manager, remove the package-lock.json file before running the packages install command.)

```bash
npm install
```

#### Environment variables
After that, set the environment variables as specified in the **.env.example** file.

#### Run at localhost
Finally, to run the project at http://localhost:3000, use the command:

```bash
npm run dev
```

## How to build and deploy the website?

### Firebase project creation
Please, read the "Firebase project creation" topic at "Run manually" section before proceed.

### Build
To build the website, use the command:

```bash
npm run generate
```

### Deploy
To deploy the website, use the command:

```bash
firebase deploy # or npm run deploy
```