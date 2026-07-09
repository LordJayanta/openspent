# OpenSpent 🪙

**A professional, offline-first personal finance companion built with React Native and Expo.**

<p align="center">
  <img src='./assets/images/icon.png' alt='OpenSpent Logo' width='160' height='160' />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0--stable-green" alt="Version" />
  <img src="https://img.shields.io/badge/APK--Size-Optimized-blue" alt="Size" />
  <img src="https://img.shields.io/badge/license-Apache--2.0-blue" alt="License" />
  <img src="https://img.shields.io/badge/platform-Android-green" alt="Platform" />
</p>

OpenSpent (formerly **SpendWise**) is a lightweight, high-performance expense manager designed to put users in total control of their financial data. Engineered with an offline-first philosophy, it ensures that your records never leave your device, prioritizing privacy and speed above all else.

---

## ✨ Key Features (v1.0.0 Stable)

### 🎨 Design & Experience

- **v1.0.0 Design System**: A completely custom, Figma-to-Code UI overhaul for a premium product feel.
- **Dynamic Theming**: Persistent Dark and Light mode support with a centralized theme engine.
- **Semantic UI**: Robust button and interaction system with semantic variants (Success, Danger, Warning, Info).
- **Smooth Performance**: Powered by **@shopify/flash-list** for 60FPS scrolling even with thousands of records.

### 🛡️ Security & Privacy

- **Biometric Locking**: Integrated hardware-level security (FaceID/Fingerprint) with background AppState protection.
- **Privacy First**: No cloud syncing, no tracking, and zero internet permissions required for core functionality.

### ⚙️ Data & Logic

- **Enterprise Architecture**: Built using a modular Feature-Based structure, **Zustand** state management, and **Drizzle ORM**.
- **Data Portability**: Industrial-grade CSV Import and Export powered by **PapaParse** for easy backups and migrations.
- **Deep Insights**: Visual spending analytics with category-specific breakdown and monthly growth tracking.

---

## 🛠 Tech Stack

| Layer             | Technology                                                               |
| :---------------- | :----------------------------------------------------------------------- |
| **Framework**     | Expo (React Native)                                                      |
| **Database**      | SQLite + [Drizzle ORM](https://orm.drizzle.team/)                        |
| **State**         | [Zustand](https://zustand-demo.pmnd.rs/) (with AsyncStorage Persistence) |
| **Parsing**       | PapaParse (CSV Serialization)                                            |
| **List Engine**   | [@shopify/flash-list](https://shopify.github.io/flash-list/)             |
| **Visualization** | `react-native-gifted-charts`                                             |
| **Optimizations** | Hermes Engine, ProGuard/R8, WebP Compression                             |

---

## 📦 Installation

### For Users

Download the official v1.0.0 stable release:

1. Go to the [Releases](https://github.com/LordJayanta/openspent/releases) page.
2. Download `OpenSpent_v1.0.0.apk`.
3. Install the APK on your Android device.

> **Note for Legacy Users**: If you are migrating from the old "SpendWise" (v0.4.0), please export your data to CSV in the old app and import it into OpenSpent v1.0.0.

### For Developers

```bash
git clone https://github.com/LordJayanta/openspent.git
cd openspent
npm install
npx expo start
```

---

## 🧠 Engineering Insights

This project serves as a showcase of modern mobile development patterns. I documented the technical challenges, Git workflows, and architectural decisions in my developer diary:

👉 **[Read the Developer Learnings & Cheatsheet](./docs/LEARNINGS.md)**

---

## 📄 License

Distributed under the **Apache License 2.0**. See `LICENSE` for more information.

---

## 🤝 Support & Contact

> Maintained by [LordJayanta](https://github.com/LordJayanta)

**GitHub/LordJayanta** - [@LordJayanta](https://github.com/LordJayanta)  
**OpnenSpent.site** - [Official Website](https://lordjayanta.github.io/openspent.site/)  
**Project Link**: [https://github.com/LordJayanta/openspent](https://github.com/LordJayanta/openspent)

---

<p align="center">Built with ❤️ for better financial clarity.</p>
