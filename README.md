# Hotel Booking Frontend

[![Angular](https://img.shields.io/badge/Angular-21-DD0031?logo=angular&logoColor=white)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Material Design](https://img.shields.io/badge/Material%20Design-21-757575?logo=material-design&logoColor=white)](https://material.angular.io/)
[![RxJS](https://img.shields.io/badge/RxJS-7.8-B7178C?logo=reactivex&logoColor=white)](https://rxjs.dev/)

A modern, responsive hotel booking web application built with Angular 21 and Angular Material. Features real-time room availability search, user authentication, reservation management, and a seamless booking experience.

## Features

- **Hotel Search & Discovery**: Search hotels with advanced filters (location, dates, guests, price range)
- **Room Availability**: Real-time room availability with detailed room information and pricing
- **User Authentication**: Secure login/logout with JWT token handling
- **Reservation Management**: View booking history, upcoming reservations, and cancel bookings
- **Responsive Design**: Mobile-first approach with Angular Material components
- **Reactive State Management**: RxJS-based state handling for search context and user sessions

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Angular 21 |
| UI Library | Angular Material 21 |
| Language | TypeScript 5.9 |
| Styling | SCSS |
| State Management | RxJS 7.8 |
| Testing | Vitest 4.x |
| Package Manager | npm 11.9 |

## Project Structure

```
src/app/
├── core/                    # Singleton services, guards, interceptors, interfaces
│   ├── guards/              # Route guards (auth protection)
│   ├── interceptors/        # HTTP interceptors (JWT, error handling)
│   ├── interface/           # TypeScript interfaces
│   └── services/            # API services (auth, hotel, room, reservation, search)
├── features/                # Lazy-loaded feature modules
│   ├── auth/                # Login/logout pages
│   ├── home/                # Landing page with hero search
│   ├── search/              # Search results page
│   └── user/                # User profile & bookings dashboard
├── shared/                  # Reusable components
│   └── components/          # Booking card, hotel card, search form, room details
├── app.config.ts            # App configuration & providers
└── app.routes.ts          # Route definitions with lazy loading
```

## Prerequisites

- **Node.js**: LTS version (v20+ recommended)
- **npm**: 11.9.0 (specified in package.json)
- **Angular CLI**: 21.0.5+ (`npm install -g @angular/cli`)
- **Backend API**: Running on `http://localhost:3000`

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd booking_hotel_front_end

# Install dependencies
npm install
```

## Development

```bash
# Start development server
npm start

# Or with explicit host/port
ng serve --host 0.0.0.0 --port 4200
```

Open your browser at `http://localhost:4200`

The app will automatically reload when you make changes.

## Build

```bash
# Production build with optimizations
npm run build

# Development build with source maps
ng build --configuration development

# Watch mode for development
npm run watch
```

Production builds are output to the `dist/` directory.

## Testing

```bash
# Run unit tests with Vitest
npm test

# Run with coverage
npm test -- --coverage
```

## API Configuration

The application expects a REST API running at `http://localhost:3000`. Key endpoints include:

| Endpoint | Description |
|----------|-------------|
| `POST /auth/login` | User authentication |
| `GET /hotels` | List/search hotels |
| `GET /hotels/:id` | Hotel details |
| `GET /rooms` | Room search with filters |
| `POST /reservations` | Create booking |
| `GET /reservations` | User's booking history |

Configure the API base URL in the environment files or service layer as needed.

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start dev server (`ng serve`) |
| `npm run build` | Production build |
| `npm run watch` | Development build with file watching |
| `npm test` | Run unit tests |
| `npm run ng` | Angular CLI commands |

## Architecture Highlights

- **Lazy Loading**: Feature modules are lazy-loaded for optimal performance
- **Standalone Components**: Modern Angular standalone component architecture
- **Reactive Patterns**: RxJS Observables for async operations and state management
- **Dependency Injection**: Services provided at appropriate levels (root/feature)
- **Type Safety**: Comprehensive TypeScript interfaces for all data models
- **Guards & Interceptors**: Route protection and automatic JWT handling

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is private and confidential.

---

**Note**: Ensure the backend API is running before starting the frontend application.
