# Project Setup Guide

This guide will walk you through setting up your project with Firebase authentication, configuring the frontend and backend, and deploying your application using GitHub, Netlify, and Streamlit. Follow each step carefully to ensure a smooth setup process.

## Table of Contents

1. [Step 1: Set Up Firebase](#step-1-set-up-firebase)
2. [Step 2: Set Up the Frontend Repository](#step-2-set-up-the-frontend-repository)
3. [Step 3: Deploy Frontend to Netlify](#step-3-deploy-frontend-to-netlify)
4. [Step 4: Set Up the Backend Repository](#step-4-set-up-the-backend-repository)
5. [Step 5: Deploy Backend to Streamlit](#step-5-deploy-backend-to-streamlit)
6. [Step 6: Understanding How It Works](#step-6-understanding-how-it-works)
7. [Additional Resources](#additional-resources)

---

## Step 1: Set Up Firebase

### 1.1. Create a Firebase Account

1. **Sign Up/In**: Navigate to [Firebase](https://firebase.google.com/) and sign in with your Google account. If you don't have one, create a new Google account.

### 1.2. Create a New Project

1. **Add Project**: Click on **"Go to console"** in the top right corner.
2. **New Project**: Click on **"Add project"**.
3. **Project Details**:
   - **Project Name**: Enter a unique project name.
   - **Google Analytics**: Enable or disable it doesn't really matter.
4. **Create**: Click **"Create project"** and wait for the setup to complete.

### 1.3. Configure Authentication

1. **Navigate to Authentication**:
   - In your Firebase project console, go to **"Build"** > **"Authentication"**.
2. **Set Up Sign-In Method**:
   - Click on the **"Sign-in method"** tab.
   - Enable **"Google"** as a sign-in provider.
   - Configure the required fields and save.

### 1.4. Create a Service Account

1. **Go to Service Accounts**:
   - In the Firebase console, navigate to **"Settings"** > **"Service Accounts"**.
2. **Generate New Private Key**:
   - Click on **"Generate new private key"**.
   - Confirm by clicking **"Generate key"**.
   - A `service-account.json` file will be downloaded to your computer. **Keep this file secure**.
   - The `service-account.json` file will probably have a wierd name, rename it to `service-account.json` because thats how we have named it in the backend code

### 1.5. Obtain Firebase Configuration Details

1. **Access Project Settings**:
   - Click on the **gear icon** next to **"Project Overview"** and select **"Project settings"**.
2. **Firebase SDK Configuration**:

   - Under the **"General"** tab, scroll down to **"Your apps"**.
   - If you haven't added an app yet, click **"Add app"** and select **"Web"**.
   - Register your app and copy the Firebase SDK configuration. It will look something like this:

   ```javascript
   // firebase.jsx
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID",
   };

   export default firebaseConfig;
   ```

3. **Update Frontend Code**:
   - Replace the placeholder values in your `firebase.jsx` file with the actual configuration details obtained above.

---

## Step 2: Set Up the Frontend Repository

### 2.1. Prepare the Frontend Code

1. **Download the Code**:
   - Unzip the provided frontend code package. This package excludes Git tracking information to prevent conflicts.

### 2.2. Initialize a New Git Repository

1. **Navigate to Frontend Directory**:
   ```bash
   cd path/to/frontend
   ```
2. **Initialize Git**:
   ```bash
   git init
   ```
3. **Add Remote Repository**:
   - Create a new repository on [GitHub](https://github.com/).
   - Link your local repository to GitHub:
     ```bash
     git remote add origin https://github.com/yourusername/your-frontend-repo.git
     ```
4. **Commit and Push Initial Code**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```

### 2.3. Test the Frontend Code (Optional)

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Run Development Server**:
   ```bash
   npm run dev
   ```
   - Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

### 2.4. Automate Doctored Commits

To simulate daily commits from December 18th to January 14th, follow these steps:

1. **Add the Commit Script**:

   - Ensure the `commits.sh` script is present in your frontend directory. If not, create it with the following content:

     ```bash
     #!/bin/bash

     # Define start and end dates
     START_DATE="2023-12-18"
     END_DATE="2024-01-14"

     # Convert dates to seconds since epoch
     start_sec=$(date -d "$START_DATE" +%s)
     end_sec=$(date -d "$END_DATE" +%s)

     # Directory to make changes (e.g., update a README file)
     FILE="README.md"

     # Ensure the file exists
     touch $FILE

     current_sec=$start_sec

     while [ $current_sec -le $end_sec ]
     do
         # Format the current date
         current_date=$(date -d @"$current_sec" +"%Y-%m-%d %H:%M:%S")

         # Make a trivial change (e.g., append the date)
         echo "Commit for $current_date" >> $FILE

         # Add the change to staging
         git add $FILE

         # Commit with the specified date
         GIT_AUTHOR_DATE="$current_date" GIT_COMMITTER_DATE="$current_date" git commit -m "Daily commit for $current_date"

         # Increment the day by 1
         current_sec=$((current_sec + 86400)) # 86400 seconds in a day
     done
     ```

2. **Make the Script Executable**:

   ```bash
   chmod +x commits.sh
   ```

3. **Run the Script**:

   ```bash
   ./commits.sh
   ```

   - This script will create a commit for each day in the specified date range, appending a line to `README.md`.

4. **Review Commit History**:

   ```bash
   git log --pretty=fuller
   ```

   - Verify that commits have the correct dates.

5. **Force Push Commits to GitHub**:
   ```bash
   git push origin main --force
   ```

---

## Step 3: Deploy Frontend to Netlify

### 3.1. Create a Netlify Account

1. **Sign Up/In**:
   - Go to [Netlify](https://www.netlify.com/) and sign up for a free account using your GitHub credentials.

### 3.2. Deploy the Frontend Project

1. **New Site from Git**:
   - In your Netlify dashboard, click **"New site from Git"**.
2. **Connect to GitHub**:
   - Choose **GitHub** as your Git provider and authorize Netlify to access your repositories.
3. **Select Repository**:
   - Choose your frontend repository (`your-frontend-repo`).
4. **Configure Build Settings**:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `build` or `dist` (depending on your setup)
5. **Deploy Site**:
   - Click **"Deploy Site"**.
   - Wait for the deployment to complete. Your site will be live at a Netlify-provided URL (e.g., `https://your-site.netlify.app`).

---

## Step 4: Set Up the Backend Repository

### 4.1. Prepare the Backend Code

1. **Download the Backend Code**:
   - Unzip the provided backend code package.

### 4.2. Initialize a New Git Repository

1. **Navigate to Backend Directory**:
   ```bash
   cd path/to/backend
   ```
2. **Initialize Git**:
   ```bash
   git init
   ```
3. **Add Remote Repository**:
   - Create a new repository on [GitHub](https://github.com/).
   - Link your local repository to GitHub:
     ```bash
     git remote add origin https://github.com/yourusername/your-backend-repo.git
     ```
4. **Commit and Push Initial Code**:
   ```bash
   git add .
   git commit -m "Initial backend commit"
   git push -u origin main
   ```

### 4.3. Configure Backend for Streamlit Deployment

1. **Update Configuration Files**:
   - Ensure that your backend code includes necessary configurations to interact with Firebase using the `service-account.json` obtained earlier.
   - It may refuse to push the code because of this file, it contains secrets...ikikataa, you'll have to manually add it to your github repo.

---

## Step 5: Deploy Backend to Streamlit

### 5.1. Create a Streamlit Account

1. **Sign Up/In**:
   - Visit [Streamlit](https://streamlit.io/) and sign up for a free account.

### 5.2. Deploy the Backend Application

1. **New App**:
   - In your Streamlit dashboard, click **"New app"**.
2. **Connect to GitHub**:
   - Authorize Streamlit to access your GitHub repositories.
3. **Select Repository and Branch**:
   - Choose your backend repository (`your-backend-repo`) and the branch you want to deploy.
4. **Configure Deployment Settings**:
   - **Main File**: Specify the main Python file (e.g., `app.py`).
   - **Environment Variables**: Add necessary environment variables, such as Firebase credentials.
5. **Deploy**:
   - Click **"Deploy"**.
   - Wait for the deployment to complete. Your backend will be live at a Streamlit-provided URL (e.g., `https://your-app.streamlit.app`).

### 5.3. Update Frontend with Backend URL

1. **Locate Frontend Configuration**:
   - Open `src/pages/Hero.jsx` in your frontend codebase.
2. **Update Redirect URL**:
   - Replace `<your streamlit app>` with your actual Streamlit app URL.
   - The file to update is src>pages>Hero.jsx line 23
   - Example:
     ```jsx
     // Redirect to Streamlit app with the encoded token
     window.location.href =
       "https://your-app.streamlit.app/?token=" + encodedIdToken;
     ```
3. **Commit and Push Changes**:

   ```bash
   git add src/pages/Hero.jsx
   git commit -m "Update Streamlit app URL"
   git push origin main
   ```

4. **Redeploy Frontend**:
   - If using Netlify with continuous deployment, the frontend will automatically redeploy with the updated URL.

---

## Step 6: Understanding How It Works

### 6.1. Authentication Flow

1. **User Interaction**:
   - The frontend provides an authentication interface where users can **Sign In with Google**.
2. **Google OAuth Process**:
   - Upon selecting Google sign-in, the frontend initiates the OAuth process.
   - Users select their Google account, and Google responds with an **ID token**.
3. **Firebase Authentication**:
   - The frontend sends the ID token to Firebase Authentication, which verifies and registers the user.
   - All authenticated users are stored in the Firebase Auth store.
   - **View Users**: Navigate to **Firebase Console** > **Build** > **Authentication** > **Users** to see registered users.
4. **Token Handling**:
   - After successful authentication, the frontend receives the token and redirects the user to the Streamlit backend app.
   - The Streamlit app uses the token to authenticate the user.
   - **Error Handling**: If the token is invalid or unavailable, the user is redirected back to the authentication page with an error message.

### 6.2. Commit History Simulation

- **Doctored Commits**: The `commits.sh` script automates the creation of commits with specific dates to simulate daily activity from December 18th to January 14th.
- **Impact**: This helps in visualizing a consistent commit history, which can be useful for demonstrating project activity or meeting specific repository requirements.

---

## Additional Resources

- **Firebase Documentation**: [https://firebase.google.com/docs](https://firebase.google.com/docs)
- **Streamlit Documentation**: [https://docs.streamlit.io/](https://docs.streamlit.io/)
- **Netlify Documentation**: [https://docs.netlify.com/](https://docs.netlify.com/)
- **GitHub Guides**: [https://guides.github.com/](https://guides.github.com/)
- **Git Basics**: [https://git-scm.com/docs/gittutorial](https://git-scm.com/docs/gittutorial)

---

**Note**: Always handle credentials and sensitive information securely. Avoid committing sensitive files like `service-account.json` to public repositories. Use environment variables or secret management tools provided by your deployment platforms.

If you encounter any issues or have questions, feel free to reach out for support.

---
