# Book Explorer - A Full-Stack Discovery App

![Next.js](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)![Go](https://img.shields.io/badge/go-%2300ADD8.svg?style=for-the-badge&logo=go&logoColor=white)![Zustand](https://img.shields.io/badge/Zustand-422a57?style=for-the-badge)![SCSS](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

A modern full-stack web application for discovering, searching, and saving books. This project leverages a powerful tech stack to deliver a fast, responsive, and feature-rich user experience. The Go backend acts as a robust proxy to the [Open Library API](https://openlibrary.org/developers/api), while the Next.js frontend is built for performance and scalability.

## 🌐 Live Website: https://book-site-cyan.vercel.app/
### Note: The free backend service may take 15-30 seconds to "wake up" on the first request.

## 🌟 Key Features

*   **📚 Dynamic Homepage:** Browse books by genre with a clean, grid-based layout.
*   **♾️ Infinite Scroll:** Seamlessly load more books as you scroll down the page, providing an uninterrupted browsing experience.
*   **🔍 Live Search:** Instantly search for books by title or author directly from the navigation bar, with a "debounced" input for optimal performance.
*   **❤️ Favorites System:** Add or remove any book to your personal favorites list. Your collection is persistently stored in the browser's `localStorage`.
*   **📖 Dedicated Favorites Page:** View your entire collection on a dedicated page, also featuring infinite scroll for large collections.
*   **⚡️ Live Filtering:** Filter your favorites list in real-time using the global search bar.
*   **📱 Fully Responsive Design:** The layout gracefully adapts to all screen sizes, from mobile phones to widescreen desktops, with an adaptive genre filter that collapses into a dropdown on smaller devices.
*   **🚀 "Scroll to Top" Button:** A convenient button appears on long pages to quickly navigate back to the top.
*   **🖼️ Optimized Images:** Leverages Next.js Image optimization for fast loading and modern `WebP` format delivery.

## 🛠️ Tech Stack

### Frontend (Client)

*   **Next.js:** A React framework for building high-performance, server-rendered applications.
*   **React:** A JavaScript library for building user interfaces.
*   **TypeScript:** For strong typing, enhanced code quality, and scalability.
*   **Zustand:** A small, fast, and scalable state management solution.
*   **SCSS (Modules):** For writing modular, scoped, and maintainable styles with a preprocessor.
*   **Feature-Sliced Design (FSD):** An architectural methodology for building scalable and maintainable frontend applications.

### Backend (Server)

*   **Go (Golang):** A fast, compiled language perfect for building efficient and concurrent backend services.
*   **Chi:** A lightweight and idiomatic router for building structured Go HTTP services.
*   **Open Library API:** As the external data source for book information.

### Deployment

*   **Vercel:** For hosting the Next.js frontend, providing a global CDN, automatic deployments, and image optimization.
*   **Render:** Cloud platforms for deploying the Go backend.
*   **Docker:** For containerizing the backend application, ensuring a consistent and reliable deployment environment.

## 🚀 Getting Started

To run this project locally, follow these steps:

### Prerequisites

*   Node.js (v18.x or higher)
*   npm / yarn / pnpm
*   Go (v1.25 or higher)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/nikitinvitya/book_site.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd book_site
    ```

3.  **Run the Go backend server:**
    *   Navigate to the server directory:
    ```bash
    cd server
    ```
    *   Run the server:
    ```bash
    go run ./cmd/main.go
    ```
    The server will start on `http://localhost:8080`.

4.  **Run the Next.js frontend application:**
    *   In a **new terminal window**, navigate to the client directory:
    ```bash
    cd client 
    ```
    *   Install the dependencies:
    ```bash
    npm install
    ```
    *   Create a local environment file `.env.local` in the `client` directory and add the following line:
    ```
    NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
    ```
    *   Start the development server:
    ```bash
    npm run dev
    ```

5.  **Open the application in your browser:**
    Navigate to [http://localhost:3000](http://localhost:3000).

## 📁 Project Structure (FSD)

The frontend application is structured based on the Feature-Sliced Design methodology to ensure separation of concerns and scalability:

*   **/app:** Next.js App Router setup, book store, global styles, and layout providers.
*   **/views (formerly /pages):** Application-level pages (e.g., `Homepage`, `FavoritesBooksPage`).
*   **/widgets:** Large, compositional UI blocks (e.g., `NavBar`, `BookList`, `GenreButtonPanel`).
*   **/features:** User interaction logic and actions (e.g., `FavoriteButton`, `ScrollToTopButton`, `useDebounce`).
*   **/entities:** Core business entities of the application (e.g., `Book`, `BookCard`).
*   **/shared:** Reusable code with no business logic dependencies (UI kit like `Button` and `Loader`, API clients, constants, etc.).