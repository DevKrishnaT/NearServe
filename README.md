# NearServe 

NearServe is a full-stack service marketplace platform that connects customers with local service providers. Users can discover services, manage addresses, place bookings, and track service requests, while providers can manage services and handle bookings through a complete order lifecycle.

The platform is built with a scalable cloud architecture using React, Express.js, PostgreSQL, Redis, and Geoapify.

---

##  Features

###  Customer Features

- Secure user authentication
- Browse available services
- Search services by category
- Address management
- Geoapify-powered address autocomplete
- Current location support
- Book service requests
- View booking history
- Track order status

### 🛠️ Provider Features

- Provider onboarding
- Service management
- Receive customer bookings
- Accept incoming orders
- Update order status
- Mark services as completed
- Manage provider-specific orders

###  Location Features

- Address autocomplete
- Address validation
- Geocoding
- Reverse geocoding
- Location-based service experience

---

##  System Architecture

```text
Frontend (React + Vercel)
            │
            ▼
Backend API (Node.js + Express + Render)
            │
     ┌──────┴──────┐
     ▼             ▼
PostgreSQL       Redis
(Aiven)         (Upstash)
```

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- Axios

### Backend

- Node.js
- Express.js
- JWT Authentication

### Database

- PostgreSQL
- Hosted on Aiven

### Caching

- Redis
- Hosted on Upstash

### Maps & Location Services

- Geoapify
    - Address Autocomplete
    - Geocoding
    - Reverse Geocoding
    - Location Suggestions

### Deployment

- Frontend: Vercel
- Backend: Render

---

##  API Endpoints

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

##  Booking Workflow

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

##  Performance Optimization

Redis caching is used to:

- Reduce database load
- Improve API response times
- Cache frequently accessed data
- Improve scalability
- Deliver a faster user experience

---

##  Database Design

### Main Entities

#### Users

- User information
- Authentication details
- Saved addresses

#### Providers

- Provider profile
- Services offered

#### Services

- Service categories
- Service details

#### Orders

- Booking information
- Order status tracking

#### Addresses

- Customer service locations

---

##  Deployment

| Service | Platform |
|----------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | Aiven PostgreSQL |
| Cache | Upstash Redis |
| Maps | Geoapify |

---

##  Challenges Solved

### Location Handling

Integrated Geoapify APIs for accurate address searching and validation.

### Performance

Implemented Redis caching using Upstash to reduce repeated database queries.

### Order Lifecycle Management

Built a complete workflow:

```text
Pending
   ↓
Accepted
   ↓
In Progress
   ↓
Completed
```

### Role-Based Access

Separated customer and provider functionality with dedicated APIs and workflows.

---



##  What I Learned

During the development of NearServe, I gained practical experience with:

- REST API design
- Authentication & authorization
- PostgreSQL database design
- Redis caching strategies
- Cloud deployment
- Location-based services
- Order lifecycle management
- Full-stack application architecture

---

##  Project Summary

NearServe is a production-ready full-stack service marketplace built using React, Express.js, PostgreSQL, Redis, and Geoapify. The platform allows customers to book local services efficiently while enabling providers to manage bookings through a structured workflow. The application demonstrates cloud deployment, caching, location services, role-based architecture, and real-world business logic.

---

Built with ❤️ using React, Node.js, Express, PostgreSQL, Redis, Geoapify, Vercel, Render, Aiven, and Upstash.
