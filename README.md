# WanderLust

A full-stack web application for listing and reviewing vacation rentals, similar to Airbnb, built with Node.js, Express, and MongoDB.

## Project Overview

WanderLust is a vacation rental marketplace platform that allows users to explore, create, and review property listings from around the world. Users can browse various accommodation options, view detailed information including location maps, leave reviews, and manage their own listings. The platform provides a seamless experience for travelers looking for unique places to stay and hosts wanting to share their properties.

### Target Audience

- Travelers searching for accommodation options worldwide
- Property owners looking to list their vacation rentals
- Users interested in sharing and reading reviews about properties

### Core Purpose

To facilitate connections between travelers and property owners through an intuitive listing and review platform with integrated location services and secure user authentication.

## Features

### User Management
- User registration and authentication
- Session-based login/logout functionality
- User-specific permissions for creating, editing, and deleting listings
- Author attribution for reviews and listings

### Listing Management
- Browse all available property listings
- Create new listings with title, description, location, country, price, and images
- Edit and update existing listings (owner-only)
- Delete listings (owner-only)
- Image upload and storage via Cloudinary
- Automatic geocoding of listing locations

### Review System
- Leave reviews with ratings (1-5 stars) and comments
- View all reviews for a specific listing
- Delete reviews (author-only)
- Visual star rating display

### Map Integration
- Interactive maps powered by Leaflet and OpenStreetMap
- Automatic geocoding using OpenStreetMap Nominatim API
- Display listing location on a map with markers
- Real-time coordinate storage in GeoJSON format

### Validation & Error Handling
- Server-side validation using Joi schemas
- Client-side form validation
- Custom error handling with meaningful error messages
- Flash messages for user feedback

### Security Features
- Password hashing with passport-local-mongoose
- Protected routes requiring authentication
- Authorization checks for resource ownership
- Session management with MongoDB store

## Tech Stack

### Frontend Technologies
- **EJS** - Template engine for server-side rendering
- **EJS Mate** - Layout support for EJS templates
- **Bootstrap 5.3.8** - CSS framework for responsive design
- **Leaflet 1.9.4** - Interactive map library
- **Font Awesome 7.0.1** - Icon library
- **Starability** - CSS-based star rating system

### Backend Technologies
- **Node.js 24.6.0** - JavaScript runtime
- **Express 5.1.0** - Web application framework
- **Mongoose 8.18.2** - MongoDB object modeling

### Database
- **MongoDB Atlas** - Cloud-hosted MongoDB database
- **Connect-Mongo 6.0.0** - MongoDB session store for Express

### APIs & External Services
- **OpenStreetMap Nominatim API** - Geocoding service for converting locations to coordinates
- **Leaflet/OpenStreetMap** - Map tiles and visualization

### Authentication & Authorization
- **Passport 0.7.0** - Authentication middleware
- **Passport-Local 1.0.0** - Local authentication strategy
- **Passport-Local-Mongoose 8.0.0** - Mongoose plugin for user authentication
- **Express-Session 1.18.2** - Session middleware

### Storage & Media Handling
- **Cloudinary 1.41.3** - Cloud-based image storage and management
- **Multer 2.0.2** - Middleware for handling multipart/form-data (file uploads)
- **Multer-Storage-Cloudinary 4.0.0** - Cloudinary storage engine for Multer

### Tools & Utilities
- **Joi 18.0.1** - Schema validation library
- **Method-Override 3.0.0** - HTTP verb override middleware
- **Connect-Flash 0.1.1** - Flash message middleware
- **Cookie-Parser 1.4.7** - Cookie parsing middleware
- **Dotenv 17.2.3** - Environment variable management

## System Architecture

WanderLust follows a traditional MVC (Model-View-Controller) architecture with a RESTful API design:

### Request-Response Flow
1. Client sends HTTP request to Express server
2. Routes direct requests to appropriate controller functions
3. Middleware performs authentication, validation, and authorization checks
4. Controllers interact with Mongoose models to query/modify MongoDB database
5. External API calls (geocoding, Cloudinary) are made when necessary
6. Controllers render EJS views with data and send response to client
7. Session data is stored in MongoDB and managed via cookies

### Architecture Pattern
- **Monolithic Architecture**: Single Express.js application handling all concerns
- **MVC Pattern**: Clear separation of models, views, and controllers
- **RESTful Design**: Standard HTTP methods (GET, POST, PUT, DELETE) for resource management
- **Middleware Chain**: Express middleware for cross-cutting concerns (authentication, validation, error handling)

## Folder Structure

```
MAJOR_PROJECT/
├── app.js                      # Main application entry point
├── package.json                # Project dependencies and scripts
├── package-lock.json           # Locked dependency versions
├── .env                        # Environment variables (not committed)
├── .gitignore                  # Git ignore rules
├── cloudConfig.js              # Cloudinary configuration
├── middleware.js               # Custom middleware functions
├── schema.js                   # Joi validation schemas
│
├── models/                     # Mongoose data models
│   ├── listing.js              # Listing model with geometry field
│   ├── review.js               # Review model with rating and comment
│   └── user.js                 # User model with passport integration
│
├── controllers/                # Business logic and request handlers
│   ├── listing.js              # Listing CRUD operations
│   ├── review.js               # Review create and delete operations
│   └── users.js                # User authentication operations
│
├── routes/                     # Express route definitions
│   ├── listing.js              # Listing routes
│   ├── review.js               # Review routes
│   └── user.js                 # User authentication routes
│
├── views/                      # EJS templates
│   ├── layouts/
│   │   └── boilerplate.ejs     # Main layout template
│   ├── includes/
│   │   ├── navbar.ejs          # Navigation bar partial
│   │   ├── footer.ejs          # Footer partial
│   │   └── flash.ejs           # Flash message partial
│   ├── listings/
│   │   ├── index.ejs           # All listings page
│   │   ├── show.ejs            # Individual listing detail page
│   │   ├── new.ejs             # Create new listing form
│   │   └── edit.ejs            # Edit listing form
│   ├── users/
│   │   ├── signup.ejs          # User registration form
│   │   └── login.ejs           # User login form
│   └── error.ejs               # Error page template
│
├── public/                     # Static assets
│   ├── css/
│   │   ├── style.css           # Main stylesheet
│   │   └── rating.css          # Star rating styles
│   └── js/
│       ├── script.js           # Client-side JavaScript
│       └── map.js              # Leaflet map initialization
│
├── utils/                      # Utility functions
│   ├── ExpressError.js         # Custom error class
│   ├── wrapAsync.js            # Async error wrapper
│   └── geocode.js              # Geocoding utility using Nominatim
│
└── init/                       # Database initialization
    ├── index.js                # Database seeding script
    └── data.js                 # Sample listing data
```

## Database Schema / Models

### Listing Model
**File**: `models/listing.js`

**Fields**:
- `title` (String, required) - Property title
- `description` (String) - Detailed description
- `image` (Object)
  - `url` (String) - Cloudinary image URL
  - `filename` (String) - Cloudinary filename
- `price` (Number) - Rental price per night
- `location` (String, required) - City or area name
- `country` (String, required) - Country name
- `geometry` (Object, required) - GeoJSON format
  - `type` (String) - Always "Point"
  - `coordinates` (Array of Numbers) - [longitude, latitude]
- `reviews` (Array of ObjectIds) - References to Review documents
- `owner` (ObjectId) - Reference to User document

**Relationships**:
- One-to-Many with Review (populated on show page)
- Many-to-One with User (owner relationship)

**Middleware**:
- Post-delete hook: Automatically deletes all associated reviews when listing is deleted

### Review Model
**File**: `models/review.js`

**Fields**:
- `comment` (String) - Review text
- `rating` (Number, 1-5) - Star rating
- `createdAt` (Date) - Auto-generated timestamp
- `author` (ObjectId) - Reference to User document

**Relationships**:
- Many-to-One with Listing
- Many-to-One with User (author relationship)

### User Model
**File**: `models/user.js`

**Fields**:
- `email` (String, required) - User email address
- `username` (String, auto-generated by plugin) - Unique username
- `hash` (String, auto-generated by plugin) - Password hash
- `salt` (String, auto-generated by plugin) - Password salt

**Plugin**: Passport-Local-Mongoose
- Automatically adds username, hash, and salt fields
- Provides authentication methods (authenticate, serializeUser, deserializeUser)
- Handles password hashing and verification

**Relationships**:
- One-to-Many with Listing (owner)
- One-to-Many with Review (author)

## Authentication & Authorization

### Authentication Strategy
- **Passport.js** with Local Strategy for username/password authentication
- **Passport-Local-Mongoose** plugin integrated with User model
- Passwords are hashed and salted automatically by the plugin

### Session Management
- **Express-Session** with MongoDB session store (Connect-Mongo)
- Sessions persist for 7 days
- HTTP-only cookies for security
- Session secret stored in environment variables

### Authorization Middleware

**isLoggedIn**: Ensures user is authenticated before accessing protected routes
- Redirects to login page if not authenticated
- Saves original URL for redirect after login

**isOwner**: Verifies user owns the listing before allowing edit/delete operations
- Compares logged-in user ID with listing owner ID
- Displays flash error message if unauthorized

**isReviewAuthor**: Verifies user authored the review before allowing deletion
- Compares logged-in user ID with review author ID
- Displays flash error message if unauthorized

### Protected Routes
- Creating listings: Requires `isLoggedIn`
- Editing listings: Requires `isLoggedIn` and `isOwner`
- Deleting listings: Requires `isLoggedIn` and `isOwner`
- Creating reviews: Requires `isLoggedIn`
- Deleting reviews: Requires `isLoggedIn` and `isReviewAuthor`

## APIs & Routes

### Authentication Routes
**Base**: `/`

- `GET /signup` - Display signup form
- `POST /signup` - Register new user
- `GET /login` - Display login form
- `POST /login` - Authenticate user with Passport Local Strategy
- `GET /logout` - Log out current user

### Listing Routes
**Base**: `/listings`

- `GET /listings` - Display all listings (index page)
- `GET /listings/new` - Display create listing form (protected)
- `POST /listings` - Create new listing with image upload (protected, validated)
- `GET /listings/:id` - Display single listing with reviews and map (show page)
- `GET /listings/:id/edit` - Display edit form (protected, owner-only)
- `PUT /listings/:id` - Update listing with optional image upload (protected, owner-only, validated)
- `DELETE /listings/:id` - Delete listing (protected, owner-only)

### Review Routes
**Base**: `/listings/:id/reviews`

- `POST /listings/:id/reviews` - Create new review for listing (protected, validated)
- `DELETE /listings/:id/reviews/:reviewId` - Delete review (protected, author-only)

### Middleware Applied
- **Authentication**: `isLoggedIn` middleware for protected routes
- **Authorization**: `isOwner` and `isReviewAuthor` for ownership checks
- **Validation**: `validateListing` and `validateReview` using Joi schemas
- **File Upload**: `multer` middleware with Cloudinary storage for images
- **Error Handling**: `wrapAsync` wrapper for async route handlers

## Map / Geolocation

### Geocoding Service
- **OpenStreetMap Nominatim API** - Free, open-source geocoding service
- Converts location and country strings to latitude/longitude coordinates
- API endpoint: `https://nominatim.openstreetmap.org/search`
- User-Agent header: `WanderLust-Airbnb-Clone`

### Geocoding Implementation
**File**: `utils/geocode.js`

Process:
1. Combines location and country into a single query string
2. Makes fetch request to Nominatim API
3. Parses JSON response to extract latitude and longitude
4. Returns coordinates as `{lat, lon}` object
5. Throws error if location not found or API request fails

### Coordinate Storage
- Stored in Listing model as `geometry` field in **GeoJSON format**
- Structure:
  ```javascript
  geometry: {
    type: "Point",
    coordinates: [longitude, latitude]  // Note: [lon, lat] order
  }
  ```

### Map Display
**Library**: Leaflet 1.9.4 with OpenStreetMap tiles

**File**: `public/js/map.js`

Features:
- Interactive map centered on listing coordinates
- Marker with popup showing listing title and location
- Map view set to zoom level 13
- Map size invalidation after load to prevent display issues

Implementation:
- Coordinates passed from server to client via data attributes on map div
- Map initialized on listing show page
- OpenStreetMap tiles used for free map rendering

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# Cloudinary Configuration
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

# MongoDB Atlas Connection
ATLASDB_URL=mongodb+srv://username:password@cluster.mongodb.net/?appName=AppName

# Session Secret
SECRET=your_session_secret_key

# Node Environment (optional)
NODE_ENV=development
```

### Variable Descriptions

- **CLOUD_NAME**: Cloudinary cloud name from your account dashboard
- **CLOUD_API_KEY**: Cloudinary API key for authentication
- **CLOUD_API_SECRET**: Cloudinary API secret for secure uploads
- **ATLASDB_URL**: MongoDB Atlas connection string with credentials
- **SECRET**: Secret key for signing session cookies (use a strong random string)
- **NODE_ENV**: Environment mode (development/production); dotenv loads only in non-production

## Installation & Setup

### Prerequisites
- Node.js version 24.6.0 or compatible
- MongoDB Atlas account (or local MongoDB installation)
- Cloudinary account for image storage

### Step-by-Step Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MAJOR_PROJECT
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Create a `.env` file in the root directory
   - Add all required environment variables (see Environment Variables section)
   - Obtain credentials from MongoDB Atlas and Cloudinary

4. **Initialize the database** (optional)
   - Update `init/index.js` with your MongoDB URL and owner ID
   - Run the seeding script:
     ```bash
     node init/index.js
     ```
   - This populates the database with sample listings

5. **Start the application**
   ```bash
   npm start
   ```
   - Application will run on `http://localhost:8080`

6. **Access the application**
   - Open your browser and navigate to `http://localhost:8080/listings`
   - Register a new account to start creating listings

### Development Mode
For development with automatic restarts (requires nodemon):
```bash
npm install -g nodemon
nodemon app.js
```

## Scripts / Commands

### Available NPM Scripts

**`npm start`**
- Runs the application using Node.js
- Command: `node app.js`
- Starts server on port 8080
- Use this for production or standard development

### Additional Commands

**Database Initialization**
```bash
node init/index.js
```
- Seeds the database with sample listing data
- Geocodes all locations automatically
- Requires valid MongoDB connection
- Update OWNER_ID in `init/index.js` before running

**Manual Testing**
- No test scripts currently configured
- Manual testing recommended through browser and API clients

## Future Improvements

### Functionality Enhancements
- Search and filter listings by location, price range, and amenities
- Booking system with calendar availability and reservation management
- User profiles with avatar uploads and listing history
- Favorite/wishlist functionality for saving listings
- Email notifications for bookings and reviews
- Real-time messaging between hosts and guests
- Advanced search with map-based filtering

### Technical Improvements
- Implement automated testing (unit, integration, and E2E tests)
- Add API rate limiting and security headers (Helmet.js)
- Optimize image loading with lazy loading and responsive images
- Implement caching strategy (Redis) for improved performance
- Add pagination for listings and reviews
- Migrate to TypeScript for better type safety
- Implement GraphQL API as alternative to REST
- Add Docker containerization for easier deployment

### UI/UX Enhancements
- Mobile-responsive design improvements
- Dark mode support
- Advanced photo gallery with image carousel
- Accessibility improvements (ARIA labels, keyboard navigation)
- Progressive Web App (PWA) capabilities
- Multi-language support (i18n)

### Security & Performance
- Implement CSRF protection
- Add input sanitization to prevent XSS attacks
- Implement rate limiting on authentication routes
- Add monitoring and logging (Winston, Morgan)
- Database indexing optimization
- CDN integration for static assets

## License

Not specified

## Author / Credits

**Author**: Vishal Kumar

This project was developed as a learning exercise to demonstrate full-stack web development skills using the MERN stack with EJS templating. The application architecture and features are inspired by popular vacation rental platforms.

### Third-Party Services & Libraries
- OpenStreetMap and Nominatim for geocoding and map tiles
- Cloudinary for image hosting and management
- MongoDB Atlas for cloud database hosting
- Bootstrap for UI components
- Leaflet for interactive maps

---

For questions, issues, or contributions, please refer to the project repository or contact the author.
