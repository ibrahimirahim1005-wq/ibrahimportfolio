# IBRAHIM.S — 3D Futuristic BCA Portfolio

A modern, responsive, 3D animated personal portfolio website built with **React 19**, **Vite**, **TypeScript**, **Three.js**, **Motion**, **Scroll Portal**, and **Tailwind CSS**.

---

## 🌀 Cinematic Scroll Portal Experience
The Home page features a **Scroll Portal** camera fly-through:
- As you scroll down from the initial hero, the camera smoothly zooms through nested neon cyan apertures into the portfolio gateway.
- Reveals quick gateway access to **About Me**, **Football Zone** (Featured Project), and the **Skills Matrix**.
- Continuing to scroll smoothly guides you into the full detailed sections below.
- Fully accessible with automatic fallback for users with reduced motion preferences.

## 🚀 Quick Start Guide (Windows Laptop & Google Chrome)

Follow these beginner-friendly steps to run this project on your Windows computer:

### Step 1: Install Node.js (If not already installed)
1. Download the **LTS (Recommended)** version of Node.js from [nodejs.org](https://nodejs.org/).
2. Run the installer `.msi` file and follow the default prompts (*Next -> Next -> Install*).
3. Verify the installation by opening **Command Prompt** (`cmd`) or **PowerShell** and running:
   ```cmd
   node -v
   npm -v
   ```
   *(You should see version numbers like `v20.x.x` or `v22.x.x` and `10.x.x`)*

---

### Step 2: Download & Extract the Project
1. In Google AI Studio, click the **Export** / **Download Code (ZIP)** icon in the top header.
2. Once the `.zip` file is downloaded to your Windows `Downloads` folder, right-click it and choose **Extract All...**.
3. Choose an easy-to-find destination, such as:
   `C:\Users\<YourUsername>\Projects\ibrahim-portfolio`

---

### Step 3: Open in Visual Studio Code
1. Open **Visual Studio Code** on your Windows laptop.
2. Click **File** > **Open Folder...** (or press `Ctrl + K, Ctrl + O`).
3. Select the extracted folder where `package.json` is located.
4. If prompted with *"Do you trust the authors of the files in this folder?"*, click **Yes, I trust the authors**.

---

### Step 4: Open the Integrated Terminal & Install Dependencies
1. In VS Code, open the built-in terminal by pressing:
   `Ctrl + ~` (tilde key, next to 1) 
   *(or go to the top menu: **Terminal** > **New Terminal**)*.
2. In the terminal window at the bottom, type the following command and press **Enter**:
   ```powershell
   npm install
   ```
3. Wait a few moments while `npm` downloads all required libraries (Three.js, React, Lucide icons, Tailwind, etc.). You will see a `node_modules` folder appear in your project tree.

---

### Step 5: Start the Local Development Server
1. In the same terminal, type:
   ```powershell
   npm run dev
   ```
2. You will see Vite boot up in less than a second with output like this:
   ```text
     VITE v8.3.0  ready in 240 ms

     ➜  Local:   http://localhost:3000/
     ➜  Network: http://192.168.x.x:3000/
     ➜  press h + enter to show help
   ```

---

### Step 6: View the Website in Google Chrome
1. Open **Google Chrome** on your laptop.
2. In the address bar at the top, navigate to:
   ```text
   http://localhost:3000
   ```
   *(or hold `Ctrl` and click the `http://localhost:3000/` link directly in the VS Code terminal)*.
3. Enjoy your interactive 3D futuristic portfolio!

---

## 🛠 Available NPM Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| **Start Dev Server** | `npm run dev` | Runs the Vite local server with hot module reloading at `http://localhost:3000` |
| **Build for Production** | `npm run build` | Compiles and optimizes assets into the `dist/` folder |
| **Preview Build** | `npm run preview` | Previews the production build locally |
| **Type Check / Lint** | `npm run lint` | Runs TypeScript type checker to ensure zero syntax or type errors |

---

## 💡 Windows Troubleshooting Tips

- **PowerShell Script Execution Error (`PSSecurityException`)**:
  If PowerShell shows *"running scripts is disabled on this system"*, you can either:
  1. Open Command Prompt (`cmd`) in VS Code instead: click the `+` dropdown arrow next to the terminal tab and pick **Command Prompt**.
  2. Or run this in PowerShell once as Administrator:
     `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`
- **Port 3000 in use**:
  If another app is using port 3000, Vite will automatically select the next available port (e.g. `http://localhost:3001`). Check the terminal output for the exact URL.
- **Stopping the Server**:
  To stop the server at any time, press `Ctrl + C` in the VS Code terminal and press `y` (or Enter).

---

## 📂 Project Architecture

```text
├── index.html                  # HTML entry with Orbitron, Space Grotesk & Fira Code fonts
├── package.json                # Dependencies, React 19, Three.js, Vite scripts
├── tsconfig.json               # TypeScript compiler config
├── vite.config.ts              # Vite bundler configuration
└── src/
    ├── main.tsx                # React root mount
    ├── App.tsx                 # Main layout orchestrating 3D canvas and sections
    ├── index.css               # Cyberpunk neon glow styles & Tailwind CSS
    ├── types.ts                # TypeScript data interfaces
    ├── data/
    │   └── portfolioData.ts    # Exact verified BCA student data from PDF
    └── components/
        ├── ThreeCanvas.tsx     # 3D WebGL engine (Dev Core, 3D Football, Nebula, Dock)
        ├── Navbar.tsx          # Sticky navigation with Resume & Profile shortcuts
        ├── Hero.tsx            # Animated hero with student badges & terminal
        ├── AboutSection.tsx    # Academic journey & BCA coursework breakdown
        ├── SkillsSection.tsx   # Verified competency meters (HTML/CSS 85%, JS 75%, etc.)
        ├── ProjectSection.tsx  # Football Zone showcase & live voting simulator
        ├── ExperienceSection.tsx # Transparent academic records & verified status
        ├── ContactSection.tsx  # GitHub, LinkedIn & 1-click email copy
        ├── ResumeModal.tsx     # Printable/viewable 1-page PDF replica
        ├── PhotoModal.tsx      # Student badge & profile photo preview tool
        └── Footer.tsx          # Copyright & back-to-top
```
