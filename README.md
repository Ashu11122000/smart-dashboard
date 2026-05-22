# Smart Dashboard

A modern React-based productivity dashboard built as a single project that combines multiple frontend assignments into one portfolio-quality application.

This project demonstrates practical React development using:

- ReactJS
- Vite
- TailwindCSS
- JavaScript (ES6+)
- Axios
- React Hooks
- OpenWeather API
- LocalStorage
- Responsive UI Design

---

# Project Objective

Instead of building multiple disconnected mini-projects, this application combines all required assignments into a single dashboard.

Assignments covered:

- Counter using `useState`
- User Form with controlled inputs
- To-Do List (add, complete, delete tasks)
- Debounced Search using `useEffect`
- Simple Calculator
- Weather App using public API fetch

---

# Features

## Counter Module

Track button clicks using React state.

Features:

- Increment counter
- Decrement counter
- Reset counter
- Persist count with LocalStorage (optional)

---

## User Form Module

Capture and display user information.

Features:

- Name input
- Email input
- Controlled components
- Save user profile
- Form validation (optional)

---

## To-Do List Module

Task management system.

Features:

- Add task
- Mark task complete
- Delete task
- Filter tasks:
  - All
  - Active
  - Completed
- Persist tasks with LocalStorage

---

## Debounced Search Module

Search functionality optimized with debouncing.

Features:

- Input search query
- Delay execution using debounce
- Prevent unnecessary API calls
- Cleanup using `useEffect`

---

## Calculator Module

Basic arithmetic calculator.

Features:

- Addition
- Subtraction
- Multiplication
- Division
- Clear screen

---

## Weather Module

Fetch live weather data from OpenWeather API.

Features:

- Search by city
- Current temperature
- Weather condition
- Humidity
- Wind speed
- Error handling
- Loading indicator

---

# Tech Stack

## Frontend

- ReactJS
- Vite
- TailwindCSS
- JavaScript

## Libraries

- Axios
- React Icons
- React Toastify
- UUID
- clsx

## APIs

- OpenWeather API

---

# Project Setup

## Step 1: Create Project

```bash
npm create vite@latest smart-dashboard
```

Choose:

```bash
Framework: React
Variant: JavaScript
```

Move into project:

```bash
cd smart-dashboard
```

Install base dependencies:

```bash
npm install
```

---

# TailwindCSS Setup

## Important Note

If latest Tailwind installation causes:

```bash
npm error could not determine executable to run
```

Use Tailwind v3.

Remove existing version:

```bash
npm uninstall tailwindcss
```

Install stable version:

```bash
npm install -D tailwindcss@3.4.17 postcss autoprefixer
```

Generate config files:

```bash
npx tailwindcss init -p
```

Expected:

```bash
Created Tailwind CSS config file: tailwind.config.js
Created PostCSS config file: postcss.config.js
```

---

# Configure Tailwind

## tailwind.config.js

Replace with:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

---

## src/index.css

Replace everything with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  font-family: Arial, sans-serif;
}
```

---

# Install Dependencies

Install required packages:

```bash
npm install react-icons axios react-toastify uuid clsx
```

Installed packages:

- react-icons
- axios
- react-toastify
- uuid
- clsx

---

# Environment Variables

Create:

```bash
.env
```

Add:

```env
VITE_WEATHER_API_KEY=your_api_key_here
```

Usage:

```js
import.meta.env.VITE_WEATHER_API_KEY
```

---

# Project Folder Structure

```text
smart-dashboard/
│
├── public/
│
├── src/
│
│   ├── assets/
│
│   ├── components/
│   │
│   │   ├── common/
│   │   │   ├── Card.jsx
│   │   │   ├── Button.jsx
│   │   │   └── Loader.jsx
│   │   │
│   │   ├── layout/
│   │   │   └── Navbar.jsx
│   │   │
│   │   ├── counter/
│   │   │   └── Counter.jsx
│   │   │
│   │   ├── form/
│   │   │   └── UserForm.jsx
│   │   │
│   │   ├── todo/
│   │   │   ├── TodoList.jsx
│   │   │   ├── TodoItem.jsx
│   │   │   └── TodoFilter.jsx
│   │   │
│   │   ├── calculator/
│   │   │   └── Calculator.jsx
│   │   │
│   │   ├── search/
│   │   │   └── DebouncedSearch.jsx
│   │   │
│   │   └── weather/
│   │       └── Weather.jsx
│
│   ├── hooks/
│   │   ├── useDebounce.js
│   │   └── useLocalStorage.js
│
│   ├── services/
│   │   └── weatherApi.js
│
│   ├── utils/
│   │   ├── constants.js
│   │   └── calculatorHelpers.js
│
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

---

# Development Roadmap

## Phase 1 — Base Layout

Build:

- Navbar
- Dashboard layout
- Reusable Card component
- Reusable Button component
- Loader component

---

## Phase 2 — Counter Module

Implement:

- `useState`
- increment
- decrement
- reset

---

## Phase 3 — User Form

Implement:

- controlled inputs
- form state
- handle submit
- display saved data

---

## Phase 4 — To-Do List

Implement:

- add task
- toggle complete
- delete task
- filter tasks

---

## Phase 5 — Debounced Search

Implement:

- search input
- `useDebounce` custom hook
- delayed execution
- cleanup function

---

## Phase 6 — Calculator

Implement:

- calculator UI
- input display
- operations
- clear
- helper functions

---

## Phase 7 — Weather App

Implement:

- API integration
- Axios requests
- loading state
- error handling
- weather display

---

## Phase 8 — LocalStorage Integration

Persist:

- todos
- user profile
- counter value

---

## Phase 9 — Notifications

Add React Toastify notifications:

Examples:

- Task added
- Task deleted
- Profile saved
- Weather fetch failed

---

## Phase 10 — Responsive Design

Optimize for:

- mobile
- tablet
- desktop

---

## Phase 11 — Final Polish

Add:

- animations
- hover states
- dark mode (optional)
- better spacing
- UI improvements

---

# Run Project

Start development server:

```bash
npm run dev
```

Open:

```bash
http://localhost:5173
```

---

# Git Setup

Initialize repository:

```bash
git init
```

First commit:

```bash
git add .
git commit -m "Initial project setup"
```

---

# Learning Outcomes

This project demonstrates:

## React

- Components
- Props
- useState
- useEffect
- Custom Hooks
- Conditional Rendering
- Controlled Components
- List Rendering
- Event Handling
- API Integration

## JavaScript

- ES6 modules
- Array methods
- Objects
- Async/Await
- Axios
- setTimeout
- clearTimeout

## Styling

- TailwindCSS
- Flexbox
- Grid
- Responsive Design
- Utility-first CSS

---

# Future Improvements

Possible enhancements:

- Authentication
- Theme toggle
- Drag-and-drop todo tasks
- Weather forecast
- Search suggestions
- Calculator history
- Charts dashboard

---

# Author

Built as a React learning + portfolio project.