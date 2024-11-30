# shell-sync 🛸: secure shell history, anywhere : ) 

Shell-Sync is a lightweight, secure tool designed for synchronizing shell history across multiple devices, emphasizing high availability, security, offline support, and conflict resolution.

## Core Components

### CLI Tool
- **Purpose:** Manages local shell history and interfaces with the backend for sync operations.
- **Technology:** TypeScript (Node.js 18+) with SQLite for local caching.
- **Key Features:**
  - User authentication (login/logout).
  - Shell history synchronization (push/pull).
  - Local SQLite database management with optional encryption.
  - Configurable exclusion rules for sensitive commands.
- **Supported Commands:** A comprehensive list of implemented, under development, and planned commands can be found in [commands.md](commands.md).

### Backend Service
- **Purpose:** Provides APIs for authentication, shell history syncing, user session management, and device registration.
- **Technology:** Express (Node.js 18) with MongoDB for scalable storage.
- **Key Features:**
  - JWT-based user login and session management.
  - Push and pull request processing, command history management, and conflict resolution.
  - Device tracking and registration linked to user accounts.
- **Supported APIs:** A comprehensive list of implemented, under development, and planned APIs can be found in [api-spec.md](api-spec.md).

### Data Security
- **Encryption:**
  - At Rest: Optional SQLite database encryption on the user's local machine.
  - In Transit: HTTPS encryption for all CLI-backend communication.
  - Command Encryption: Commands encrypted before sending to the backend.

- **Authentication:**
  - JWT token issuance post-login for subsequent API calls.
  - Passwords hashed with bcrypt on the backend before storage.

- **Exclusion Rules:** Users can define patterns to prevent syncing of sensitive commands (e.g., passwords, API keys), ensuring they are not stored in the local SQLite database.

### Local Storage (SQLite)
- **Purpose:** Local storage of shell history and metadata for offline use.
- **Schema:**
  - **commands:** Command text, timestamps, and sync status.
  - **settings:** User preferences, encryption settings, and exclusion rules.
- **Encryption:** SQLite database can be encrypted with AES.
- **Exclusion Rules:** Filters for sensitive data patterns to prevent saving or syncing of commands containing passwords or tokens.

### Backend Architecture
- **Core Modules:**
  - **Authentication:** User registration, login, and session management with JWT and bcrypt.
  - **Synchronization:** Push/pull operations for shell history syncing, conflict resolution based on timestamps.
  - **Device Management:** Device registration and tracking for authorized syncing.
  - **Conflict Resolution:** Timestamp-based approach where the latest command prevails.
  - **Data Encryption:** AES encryption for local database security and HTTPS for secure data transmission.

- **Database Schema:**
  - **users:** User details, hashed passwords, and authentication metadata.
  - **machines:** Registered devices for each user account.
  - **commands:** User command history for synchronization.

## System Design

### Data Flow
- **User Registration:** The CLI sends user details to the backend; upon successful registration, a JWT token is returned for session management.
- **User Login:** The CLI sends credentials to the backend; successful login returns a JWT token for local storage.
- **Local History Storage:** Shell history is stored in an encrypted SQLite database, enabling offline access and secure storage.
- **Synchronization:**
  - **Push:** Unsynced commands are sent to the backend via the `POST /history/push` API, updating the cloud with local history.
  - **Pull:** The CLI requests new commands from the backend using the `GET /history/pull` API, merging them into the local database.
  - **Full Sync:** The CLI can perform a full synchronization using the `POST /history/sync` API, which combines both push and pull operations.
- **Conflict Resolution:** The backend resolves conflicts by comparing timestamps; the latest command prevails during synchronization.
- **Exclusion Management:** The CLI can manage sensitive command patterns using the `GET /exclude`, `POST /exclude/add`, and `POST /exclude/remove` APIs to ensure that sensitive data is not synced.

## Security Architecture

1. **Local Data Security**
   - Encrypted SQLite database protects contents from unauthorized access.
   - Command data encryption before sending to the backend.

2. **Communication Security**
   - HTTPS encryption for secure data transmission.

3. **Authentication & Authorization**
   - JWT for user authentication and authorization.
   - Passwords hashed with bcrypt before storage.

4. **Rate Limiting and Abuse Prevention**
   - API rate limiting to prevent brute force attacks and abuse.

5. **Protecting Sensitive Data**
   - Exclusion patterns for sensitive commands, allowing user-defined configurations for privacy and security.

A comprehensive list of implemented, under development, and planned security features can be found in [security.md](./security.md).

## Technical Stack

| Component        | Technology                |
|------------------|---------------------------|
| CLI Tool         | TypeScript (Node.js 18)   |
| Backend          | Express, MongoDB          |
| Local Storage    | SQLite                    |
| Encryption       | AES (local), HTTPS (in-transit) |
| Testing Framework| Jest                      |
| Deployment       | Docker, AWS/GCP           |

