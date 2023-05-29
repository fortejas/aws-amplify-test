#

## Prerequisites

- AWS Account
- GitHub Repo - to host our frontend code

### 1. Generate Client Credentials for Login with Amazon

Navigate to (the Amazon Developers Portal)[https://developer.amazon.com/] and then to the developer console. If you haven't registered for an Amazon Developer account you'll be prompted for some details about your business & contact details.

Next, head to "Login with Amazon Console" > "Create a New Security Profile"

- **Security Profile Name:** Your App Name
- **Security Profile Description:** Brief description of what your app does
- **Consent Privacy Notice URL:** Link to your Privacy policy / notice
- **Consent Logo Image:** Upload a logo for your app

Hit confirm and you'll see you security profile listed under the "Login with Amazon Configurations" section. Next to your new app hit the "Show Client ID and Client Secret" link & copy these for later.

### 2. Cloud 9 Environment or Local Env

## Creating an Amplify App with S3 Backend

Login to your AWS account and navigate to the AWS Amplify console. Hit create app and chose "Build an App" from the drop down menu. Enter the name of the app and choose "Confirm Deployment".

The deployment should kick off. Wait a bit and you'll be redirected to the list of Amplify apps. Navigate to the app we just created > Backend Environments. A `staging` backend should be deploying or deployed. Choose "Launch Studio".

## Add the Amazon Login Mechanism

Once you're in Amplify Studio, navigate to Authentication on the left. This is where we'll configure how our users will authenticate with our web app. Ensure the top "Start from Scratch" option is selected.

We'll keep the ability to login with a email address and password. To add Login with Amazon choose "Add login mechanism" and select Amazon from the dropdown. Here we enter the App ID and the App Secret from our Amazon Developer Console.

When you add these credentials, you'll see a redirect url is provided to you. Enter this into the field `Sign-in & sign-out redirect URLs`.

### Configure the Redirect URL in Amazon Developer Console

In order to allow the full flow. We need to now tell the Amazon Security Profile that this URL is allowed for our app.

### Configure Sign Up Options

Now we want to define how our users will signup select "Add Attribute" > "Email" to configure our app to allow signup with a username and password.

### Set the Password & Verification Settins (Optional)

You are able to specify the requirements for the password that your users choose. You can also define how the verification email looks when your users sign up.

### Deploy the authentication backend

Now choose "Deploy" > "Confirm Deployment" to deploy the backend for your app. While this happens you can check out the deployment logs.

**Note** You'll need to wait for this to finish before we can add the storage component.

We won't pull the client config just yet because we need to setup the storage.




### View the User Management Interface

Now that we've setup the authentication backend we can navigate to the "User management" interface on the left panel. If we go to "Groups" tab we can see there is a group setup for our Login with Amazon users.

## Adding Storage Backend on S3

Now we want to configure our storage backend. On the left navigation panel choose "Storage". We are presented with some options for our storage backend.

Ensure the "Create new S3 bucket" option is selected at the top. We will View access to both signed in and guest users. We will only allow uploads and deletes from signed in users.

Choose "Create bucket" to start the deployment process for our storage backend. Again we see the deployment happening and can view the logs of the changes happening to our backend.

Choose "Done" when the deployment has finished. We'll integrate these into our frontend code in a bit.

### Explore the File Browser

Once the deployment has finished you should be able to navigate to the file browser. There are 3 folders by default, `private`, `public` & `protected`.

## Building the Frontend

Now we've created our backend we can move to the frontend. From the Amplify Studio console select "UI Library" from the navigation bar on the left. We will make use of the "Amplify UI Primitives" to help us build out our initial MVP frontend.

If you hit the "View Docs" button you are taken to [AWS Amplify UI Docs](https://ui.docs.amplify.aws/).

The frontend can be independent from the AWS enviornment. This means you could use any environment to host your frontend code. You can choose to develop locally (VSCode) or use a Cloud based IDE like (Cloud9).

### Create the Frontend App

We're going to create a bare React app that connects to our backend. To do this navigate to an empty file.

```bash
$ npm create vite@latest my-amplify-s3-app -- --template react
```

_Note: At the time of writing we are using Vite 4.3.2_

The output of the above line will tell us how to run the local version of our project. Let's do what it says:

```bash
$ cd my-amplify-s3-app
$ npm install
$ npm run dev
```

If you navigate to [http://localhost:5173](http://localhost:5173) you should see our shiny new frontend site. The starting example has a count that you can click to increment.

### Install Amplify Packages

Now we need to tell our frontend app about our AWS Amplify backend. There are a few libraries that we need to accomplish this:

- `@aws-amplify/cli@latest` - AWS Amplify CLI to allow us to pull down our configuration from our backend.
- `aws-amplify` - A library that helps our app communicate correctly with out AWS Amplify backend.
- `@aws-amplify/ui-react` - AWS Amplify UI components library for React to allow us to easily create our frontend using pre-built react components. (See [here](https://ui.docs.amplify.aws/react/getting-started/installation) for docs)


To install these navigate to the root of our react project and install our required npm packages.

```bash
$ # Install the CLI
$ npm i --include=dev @aws-amplify/cli@latest
$ # Install the frontend libraries and UI framework
$ npm i @aws-amplify/ui-react aws-amplify
$ # Verify that Amplify is installed
$ npx amplify version
12.0.3
```

> Note: Here we are using `npx` to execute our amplify library. This is useful to do because it pins the amplify cli version based on our `package.json` file.

Now with everything we need installed, we need to initialize our AWS Amplify environment.

### Amplify our Frontend

Navigate back to AWS Amplify Studio. To get the details for our local environment go to the top right and select "Deployment successful - click for next steps". This will take us back to the page we saw earlier.

We'll take this first line and run it in our local environment.

> Remember to add `npx` at the front to use our local installation of the AWS Amplify CLI.

```bash
$ npx amplify pull --appId d3guqrnvbny0wl --envName staging
```

When you do this you'll be directed to a browser page asking you to login to the CLI. Hit "Yes" to confirm you're logging in.

Now head back to the CLI and you'll see some options are showing to configure your local environment. Follow the prompts - most of the defaults should be fine for this example:

- **Choose your default editor:** Visual Studio Code
- **Choose the type of app that you're building:** javascript
- **What javascript framework are you using:** react
- **Source Directory Path:** src
- **Distribution Directory Path:** build
- **Build Command:** npm.cmd run-script build
- **Start Command:** npm.cmd run-script start
- **Do you plan on modifying this backend?** n

With the wizard completed, you should now see a file `src/aws-exports.js` in your project. If you open it, there are a number of configuration options that have been pulled down from the Amplify Studio backend.

#### Add our project to GitHub

Now we'll commit our code to ensure we are able to revert to a last known good state of our app. Do this from the base of your app (i.e. next to `package.json`).

```bash
$ git init
$ git remote add origin git@github.com:fortejas/aws-amplify-test.git
$ git add .
$ git commit -m "Initial AWS Amplify + S3 application"
$ git push -u origin main
```

Now that it's commited to GitHub we can deploy the frontend

### Deploy our initial frontend

As mentioned, you can use whatever means to deploy your frontend. For this example we will deploy using CloudFront + S3. To do this we need to go back to our [AWS Amplify Console](https://console.aws.amazon.com/amplify/home#/) and select or App `sample-amplify-s3`.

Navigate to the "Hosting Environments" tab. Here we'll configure Amplify to pull our code from GitHub and deploy to S3 + CloudFront. Select GitHub and choose "Connect branch".

If you've never allowed Amplify to authenticate with GitHub you'll be directed to a GitHub page to grant AWS Amplify access to your repo. (See detailed docs [here](https://docs.aws.amazon.com/amplify/latest/userguide/setting-up-GitHub-access.html)).

Once you've granted access, you'll be redirected back to the AWS Amplify page. Here you select the repo to build your frontend from and the branch. Choose "Next" to take us to the "Build settings" page.

AWS Amplify has already detected that the code is a web app. Now we need to select which backend we want to deploy our app with. Under "Select a backend environment to use with this branch" choose our backend from earlier and choose the `staging` environment.

We need an IAM role that gives the AWS Amplify console permission to deploy our frontend and backend components. Choose "Create new Role". Follow the wizard to create the new role. Here we named it `amplifyconsole-backend-role-example`.

Navigate back to the AWS Amplify console and hit "Refresh existing roles". We can now select our new role from the dropdown.

You are also able to view the buildspec that AWS Amplify will use to deploy your application (see [here](https://docs.aws.amazon.com/amplify/latest/userguide/build-settings.html) for details on the AWS build settings).

> If you are making use of vite for the deployment ensure that `artifacts.baseDirectory` is set to `dist` where our output files will be generated.

Leave the rest as is and then hit "Next". You'll be shown the review page. Here you can confirm all the settings for our frontend. Now hit "Save and deploy" to deploy our frontend code.

#### Explore our deployed frontend

Once the app is deployed you can navigate to the new frontend via the URL. Here you can see that our application has deployed successfully to our AWS Amplify Endpoint.

Now we can get to writing the actual code for our app.

## Coding a frontend

There are two components we need to build into our frontend:

- Authentication
- Upload Files

### Initialize AWS Amplify

To initialize the AWS Amplify libraries within your frontend open the `src/main.jsx` and add the following initialization code:

```jsx
...
import App from './App.jsx'
import './index.css'

import { Amplify } from 'aws-amplify'
import awsExports from "./aws-exports.js"
Amplify.configure(awsExports)
...
```

If we try to run our app locally now, we will see that nothing loads! We can check what's going on in the developer console.


We're assigning a global variable when we configure Amplify. To allow this with vite we need to include it as part of the `vite.config.js` file.

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: { global: {} } // <--- Add this line
})
```

Now when we run our app we should see it working again.

### Authentication

We'll add our app to the authentication  (see [docs](https://ui.docs.amplify.aws/react/connected-components/authenticator)).

```jsx



```
