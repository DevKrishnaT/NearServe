# NearServe

### A Full-Stack Service Marketplace Connecting Customers with Local Service Providers

NearServe is a full-stack marketplace platform that enables customers to discover and book local services while allowing service providers to manage and fulfill bookings through a structured workflow. The platform combines location-based service discovery, OTP-based authentication, caching, and cloud deployment to deliver a scalable and responsive user experience.

Built with React, Express.js, MySQL, Redis, Firebase Phone Authentication, and Geoapify.

---

## Key Highlights

* OTP-based authentication using Firebase Phone Authentication
* Customer and Provider role-based workflows
* Service booking and order management
* Geoapify-powered address search and autocomplete
* Redis caching with Upstash
* MySQL database hosted on Aiven
* Cloud deployment using Vercel and Render
* Complete booking lifecycle management

---

## Features

### Customer Features

* Secure OTP login using Firebase
* Browse available services
* Search services by category
* Manage service addresses
* Address autocomplete and validation
* Current location support
* Create service bookings
* Track booking status
* View booking history

### Provider Features

* Provider onboarding
* Manage offered services
* Receive customer bookings
* Accept incoming requests
* Update order status
* Mark services as completed
* Manage provider-specific orders

### Location Features

* Address autocomplete
* Geocoding
* Reverse geocoding
* Location suggestions
* Current location detection

---

## System Architecture

```text
Frontend (React + Vercel)
            │
            ▼
Backend API (Node.js + Express + Render)
            │
     ┌──────┴──────┐
     ▼             ▼
MySQL          Redis
(Aiven)       (Upstash)
```

---

## Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* REST APIs

### Authentication

* Firebase Phone Authentication
* OTP Verification

### Database

* MySQL
* Hosted on Aiven

### Caching

* Redis
* Hosted on Upstash

### Maps & Location Services

* Geoapify

  * Address Autocomplete
  * Geocoding
  * Reverse Geocoding
  * Location Suggestions

### Deployment

* Frontend: Vercel
* Backend: Render

---

## API Overview

### User APIs

```http
/api/user
/api/user/address
/api/user/orders
```

### Service APIs

```http
/api/services
/api/provider/services
```

### Provider APIs

```http
/api/provider/list
/api/isprovider
/api/provider/orders
/api/provider/accept-order
/api/provider/inProgress-order
/api/provider/complete-order
```

### Order APIs

```http
/api/order
/api/user/orders
/api/provider/orders
```

---

## Booking Workflow

```text
Customer Selects Service
            │
            ▼
Creates Booking Request
            │
            ▼
Provider Receives Order
            │
            ▼
Provider Accepts Order
            │
            ▼
Service In Progress
            │
            ▼
Service Completed
```

---

## Performance Optimization

Redis caching is used to:

* Reduce database load
* Improve API response times
* Cache frequently accessed data
* Improve scalability
* Enhance overall user experience

---

## Database Design

### Users

* User profile information
* Firebase authentication details
* Saved addresses

### Providers

* Provider profile information
* Service offerings

### Services

* Service categories
* Service details

### Orders

* Booking information
* Status tracking

### Addresses

* Customer service locations

---

## Deployment

| Service  | Platform      |
| -------- | ------------- |
| Frontend | Vercel        |
| Backend  | Render        |
| Database | Aiven MySQL   |
| Cache    | Upstash Redis |
| Maps     | Geoapify      |

---

## Challenges Solved

### Location Handling

Integrated Geoapify APIs for accurate address search, autocomplete, and geocoding.

### Authentication

Implemented secure OTP-based authentication using Firebase Phone Authentication.

### Performance Optimization

Used Redis caching with Upstash to reduce repeated database queries and improve response times.

### Order Lifecycle Management

Built a complete service workflow:

```text
Pending
   ↓
Accepted
   ↓
In Progress
   ↓
Completed
```

### Role-Based Access Control

Separated customer and provider functionality through dedicated workflows and APIs.

---

## What I Learned

During the development of NearServe, I gained practical experience with:

* Full-Stack Application Development
* REST API Design
* Firebase OTP Authentication
* MySQL Database Design
* Redis Caching Strategies
* Cloud Deployment
* Location-Based Services
* Order Lifecycle Management
* Role-Based Access Control
* Scalable Application Architecture

---

## Future Improvements

* Real-time notifications
* Ratings and reviews
* Payment gateway integration
* Service scheduling
* Provider availability management
* Customer-provider chat
* Admin dashboard
* Analytics dashboard

---

## Project Summary

NearServe is a production-ready full-stack service marketplace built using React, Express.js, MySQL, Redis, Firebase Phone Authentication, and Geoapify. The platform enables customers to discover and book local services while allowing providers to manage bookings through a complete service lifecycle.

Built with ❤️ using React, Node.js, Express, MySQL, Firebase Authentication, Redis, Geoapify, Vercel, Render, Aiven, and Upstash.
