# shell-sync 🛸: APIs

## Authentication

### 1. shell-sync register
**POST** `/auth/register`

Registers a new user and starts a session with JWT.

**Request**
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "********",
    "name": "John Doe"
  }
  ```

**Response**
- **Status Code:** 201 Created
- **Body:**
  ```json
  {
    "token": "JWT_TOKEN",
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "name": "John Doe"
    }
  }
  ```

### 2. shell-sync login
**POST** `/auth/login`

Authenticates the user and starts a session with JWT.

**Request**
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "********"
  }
  ```

**Response**
- **Status Code:** 200 OK
- **Body:**
  ```json
  {
    "token": "JWT_TOKEN",
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "name": "John Doe"
    }
  }
  ```

## Syncing History

### 3. shell-sync push
**POST** `/history/push`

Pushes local history (from SQLite) to the cloud.

**Request**
- **Headers:** `Authorization: Bearer JWT_TOKEN`
- **Body:**
  ```json
  {
    "commands": [
      { "command": "ls -al", "timestamp": "2024-11-30T14:20:00Z" }
    ]
  }
  ```

**Response**
- **Status Code:** 200 OK
- **Body:**
  ```json
  {
    "message": "Successfully synced 20 new commands."
  }
  ```

### 4. shell-sync pull
**GET** `/history/pull`

Fetches shell history from the backend and updates local storage.

**Request**
- **Headers:** `Authorization: Bearer JWT_TOKEN`

**Response**
- **Status Code:** 200 OK
- **Body:**
  ```json
  {
    "commands": [
      { "command": "git status", "timestamp": "2024-11-30T14:25:00Z" }
    ]
  }
  ```

### 5. shell-sync sync
**POST** `/history/sync`

Performs a full sync (push and pull).

**Request**
- **Headers:** `Authorization: Bearer JWT_TOKEN`
- **Body:**
  ```json
  {
    "commands": [
      { "command": "echo Hello World", "timestamp": "2024-11-30T14:30:00Z" }
    ]
  }
  ```

**Response**
- **Status Code:** 200 OK
- **Body:**
  ```json
  {
    "message": "History successfully synced.",
    "syncedCommands": 10,
    "pulledCommands": 15
  }
  ```

### 6. shell-sync status
**GET** `/status`

View the current synchronization state.

**Request**
- **Headers:** `Authorization: Bearer JWT_TOKEN`

**Response**
- **Status Code:** 200 OK
- **Body:**
  ```json
  {
    "lastSync": "10 minutes ago",
    "unsyncedCommands": 5,
    "devices": [
      { "device": "Home-PC", "id": "123456" },
      { "device": "Work-Laptop", "id": "789012" }
    ]
  }
  ```

## Exclusion List

### 7. shell-sync exclude --list
**GET** `/exclude`

List all currently excluded sensitive command patterns.

**Request**
- **Headers:** `Authorization: Bearer JWT_TOKEN`

**Response**
- **Status Code:** 200 OK
- **Body:**
  ```json
  {
    "exclusions": ["password", "token", "API_KEY"]
  }
  ```

### 8. shell-sync exclude --add `<pattern>`
**POST** `/exclude/add`

Add a new exclusion pattern for sensitive commands.

**Request**
- **Headers:** `Authorization: Bearer JWT_TOKEN`
- **Body:**
  ```json
  {
    "pattern": "secret"
  }
  ```

**Response**
- **Status Code:** 200 OK
- **Body:**
  ```json
  {
    "message": "Added 'secret' to the exclusion list."
  }
  ```

### 9. shell-sync exclude --remove `<pattern>`
**POST** `/exclude/remove`

Remove an exclusion pattern.

**Request**
- **Headers:** `Authorization: Bearer JWT_TOKEN`
- **Body:**
  ```json
  {
    "pattern": "API_KEY"
  }
  ```

**Response**
- **Status Code:** 200 OK
- **Body:**
  ```json
  {
    "message": "Removed 'API_KEY' from the exclusion list."
  }
  ```

## Device Management

### 10. shell-sync machines
**GET** `/devices`

View all devices linked to the account.

**Request**
- **Headers:** `Authorization: Bearer JWT_TOKEN`

**Response**
- **Status Code:** 200 OK
- **Body:**
  ```json
  {
    "devices": [
      { "name": "Home-PC", "id": "123456" },
      { "name": "Work-Laptop", "id": "789012" }
    ]
  }
  ```

### 11. shell-sync machines --deregister `<machine-id>`
**POST** `/devices/deregister`

Remove a machine from the account.

**Request**
- **Headers:** `Authorization: Bearer JWT_TOKEN`
- **Body:**
  ```json
  {
    "machineId": "789012"
  }
  ```

**Response**
- **Status Code:** 200 OK
- **Body:**
  ```json
  {
    "message": "Successfully deregistered Work-Laptop."
  }
  ```

## Security

### 12. shell-sync logout
**POST** `/auth/logout`

Log out and remove the session token.

**Request**
- **Headers:** `Authorization: Bearer JWT_TOKEN`

**Response**
- **Status Code:** 200 OK
- **Body:**
  ```json
  {
    "message": "Logged out successfully."
  }
  ```

### 13. shell-sync encrypt --enable
**POST** `/encrypt/enable`

Enable local database encryption.

**Request**
- **Headers:** `Authorization: Bearer JWT_TOKEN`

**Response**
- **Status Code:** 200 OK
- **Body:**
  ```json
  {
    "message": "Local database encryption enabled."
  }
  ```

### 14. shell-sync encrypt --disable
**POST** `/encrypt/disable`

Disable local database encryption.

**Request**
- **Headers:** `Authorization: Bearer JWT_TOKEN`

**Response**
- **Status Code:** 200 OK
- **Body:**
  ```json
  {
    "message": "Local database encryption disabled."
  }
  ```

## Backup and Restore

### 15. shell-sync export --file `<path>`
**POST** `/export`

Export your shell history to a file.

**Request**
- **Headers:** `Authorization: Bearer JWT_TOKEN`
- **Body:**
  ```json
  {
    "filePath": "~/backup/shell_history.txt"
  }
  ```

**Response**
- **Status Code:** 200 OK
- **Body:**
  ```json
  {
    "message": "Exported 500 commands to ~/backup/shell_history.txt."
  }
  ```

### 16. shell-sync import --file `<path>`
**POST** `/import`

Import shell history from a file into SQLite.

**Request**
- **Headers:** `Authorization: Bearer JWT_TOKEN`
- **Body:**
  ```json
  {
    "filePath": "~/backup/shell_history.txt"
  }
  ```

**Response**
- **Status Code:** 200 OK
- **Body:**
  ```json
  {
    "message": "Imported 500 commands into local storage."
  }
  ```

### 17. shell-sync debug
**GET** `/debug`

View detailed debug logs for troubleshooting.

**Request**
- **Headers:** `Authorization: Bearer JWT_TOKEN`

**Response**
- **Status Code:** 200 OK
- **Body:**
  ```json
  {
    "logs": [
      "[DEBUG] Pushing 5 commands to backend...",
      "[DEBUG] Successfully updated sync status."
    ]
  }
  ```
### API Summary Table

| **API** | **Description** | **Status** |
| --- | --- | --- |
| `POST /auth/register` | Registers a new user and starts a session with JWT. | ✅ Done |
| `POST /auth/login` | Authenticates the user and starts a session with JWT. | ✅ Done |
| `POST /history/push` | Pushes local history to the backend. | 🚧 Under Dev |
| `GET /history/pull` | Fetches shell history from the backend. | 🚧 Under Dev |
| `POST /history/sync` | Performs a full sync (push and pull). | 📌 Planned |
| `GET /status` | Views the current synchronization state. | 📌 Planned |
| `GET /exclude` | Lists currently excluded sensitive command patterns. | 📌 Planned |
| `POST /exclude/add` | Adds a new exclusion pattern for sensitive commands. | 📌 Planned |
| `POST /exclude/remove` | Removes an exclusion pattern. | 📌 Planned |
| `GET /devices` | Views all devices linked to the account. | 📌 Planned |
| `POST /devices/deregister` | Deregisters a machine from the account. | 📌 Planned |
| `POST /auth/logout` | Logs out and removes the session token. | 📌 Planned |
| `POST /encrypt/enable` | Enables local database encryption. | 📌 Planned |
| `POST /encrypt/disable` | Disables local database encryption. | 📌 Planned |
| `POST /export` | Exports shell history to a file. | 📌 Planned |
| `POST /import` | Imports shell history from a file into SQLite. | 📌 Planned |
| `GET /debug` | Displays detailed debug logs for troubleshooting. | 📌 Planned |