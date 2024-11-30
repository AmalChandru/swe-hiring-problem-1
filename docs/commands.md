# Core Commands

### 1. **`shell-sync start`**

Interactive Menu to choose login or register.

- **Purpose**: Start the Shell-Sync application and choose to log in or register.
- Status: ✅ Done
- **Example**:
    
    ```bash
    $ shell-sync start
    Please choose: login or register
    ```

---

### 2. **`shell-sync register`**

Register a new user with the Shell-Sync backend.

- **Purpose**: Create a new account to access syncing functionality.
- Status: ✅ Done
- **Example**:
    
    ```bash
    $ shell-sync register
    Enter your email: user@example.com
    Enter your password: ********
    ```

---

### 3. **`shell-sync login`**

Authenticate with the Shell-Sync backend.

- **Purpose**: Log in with your credentials to access syncing functionality.
- Status: ✅ Done
- **Example**:
    
    ```bash
    $ shell-sync login
    Enter your email: user@example.com
    Enter your password: ********
    ```

---

### 4. **`shell-sync push`**

Send local shell history (from SQLite) to the backend.

- **Purpose**: Uploads unsynced commands from your local database to the cloud.
- Status: 🚧 Under Dev
- **Example**:
    
    ```bash
    $ shell-sync push
    Uploading local history to the cloud...
    Successfully synced 20 new commands.
    ```

---

### 5. **`shell-sync pull`**

Fetch shell history from the backend and update local storage.

- **Purpose**: Downloads commands added by other devices and merges them into your local database and shell history file.
- Status: 🚧 Under Dev
- **Example**:
    
    ```bash
    $ shell-sync pull
    Downloading shell history from the cloud...
    Fetched 25 new commands.
    ```

---

### 6. **`shell-sync sync`**

Perform a full synchronization by pushing local changes and pulling remote updates.

- **Purpose**: Combines `push` and `pull` into a single command.
- Status: 📌 Planned
- **Example**:
    
    ```bash
    $ shell-sync sync
    Uploading local history to the cloud...
    Successfully synced 10 new commands.
    Downloading shell history from the cloud...
    Fetched 15 new commands.
    ```

---

### 7. **`shell-sync status`**

View the current synchronization state.

- **Purpose**: Displays information about your sync status, including unsynced commands, last sync time, and registered devices.
- Status: 📌 Planned
- **Example**:
    
    ```bash
    $ shell-sync status
    Sync Status:
      - Last sync: 10 minutes ago
      - Unsynced commands: 5
      - Registered devices: 2 (Home-PC, Work-Laptop)
    ```

---

### **Configuration Commands**

### 8. **`shell-sync exclude --list`**

List the currently defined sensitive command patterns that are excluded from syncing.

- **Purpose**: View patterns or keywords used to prevent commands from being synced.
- Status: 📌 Planned
- **Example**:
    
    ```bash
    $ shell-sync exclude --list
    Current exclusions:
      - password
      - token
      - API_KEY
    ```

---

### 9. **`shell-sync exclude --add <pattern>`**

Add a new exclusion pattern for sensitive commands.

- **Purpose**: Customize patterns to flag sensitive commands that shouldn’t be stored or synced.
- Status: 📌 Planned
- **Example**:
    
    ```bash
    $ shell-sync exclude --add "secret"
    Added "secret" to the sensitive command exclusion list.
    ```

---

### 10. **`shell-sync exclude --remove <pattern>`**

Remove an existing exclusion pattern.

- **Purpose**: Delete an exclusion rule to allow commands matching the pattern to be synced.
- Status: 📌 Planned
- **Example**:
    
    ```bash
    $ shell-sync exclude --remove "API_KEY"
    Removed "API_KEY" from the sensitive command exclusion list.
    ```

---

### **Machine Management Commands**

### 11. **`shell-sync machines`**

View all machines linked to your account.

- **Purpose**: Displays a list of registered devices along with their identifiers.
- Status: 📌 Planned
- **Example**:
    
    ```bash
    $ shell-sync machines
    Registered Devices:
      - Machine: Home-PC (ID: 123456)
      - Machine: Work-Laptop (ID: 789012)
    ```

---

### 12. **`shell-sync machines --deregister <machine-id>`**

Remove a specific machine from your account.

- **Purpose**: Deregister a machine to stop syncing with it.
- Status: 📌 Planned
- **Example**:
    
    ```bash
    $ shell-sync machines --deregister 789012
    Successfully deregistered Work-Laptop.
    ```

---

### **Security Commands**

### 13. **`shell-sync logout`**

Log out from the current session.

- **Purpose**: Clears your session and removes stored tokens locally.
- Status: 📌 Planned
- **Example**:
    
    ```bash
    $ shell-sync logout
    Logged out successfully.
    ```

---

### 14. **`shell-sync encrypt --enable`**

Enable encryption for your local SQLite database.

- **Purpose**: Ensures local data is encrypted using a secure key.
- Status: 📌 Planned
- **Example**:
    
    ```bash
    $ shell-sync encrypt --enable
    Local database encryption enabled.
    ```

---

### 15. **`shell-sync encrypt --disable`**

Disable encryption for your local SQLite database.

- **Purpose**: Removes local encryption if not required for your use case.
- Status: 📌 Planned
- **Example**:
    
    ```bash
    $ shell-sync encrypt --disable
    Local database encryption disabled.
    ```

---

### **Advanced Commands**

### 16. **`shell-sync export --file <path>`**

Export your shell history from SQLite to a file.

- **Purpose**: Backup your local shell history to a text file.
- Status: 📌 Planned
- **Example**:
    
    ```bash
    $ shell-sync export --file ~/backup/shell_history.txt
    Exported 500 commands to ~/backup/shell_history.txt.
    ```

---

### 17. **`shell-sync import --file <path>`**

Import shell history from a file into SQLite.

- **Purpose**: Restore shell history from a text file to the local SQLite database.
- Status: 📌 Planned
- **Example**:
    
    ```bash
    $ shell-sync import --file ~/backup/shell_history.txt
    Imported 500 commands into local storage.
    ```

---

### 18. **`shell-sync debug`**

View detailed debug logs for troubleshooting.

- **Purpose**: Provides detailed output of sync operations for debugging.
- Status: 📌 Planned
- **Example**:
    
    ```bash
    $ shell-sync debug
    [DEBUG] Pushing 5 commands to backend...
    [DEBUG] Successfully updated sync status.
    ```

---

### Summary Table

| **Command** | **Description** | **Status** |
| --- | --- | --- |
| `start` | Start the Shell-Sync application. | ✅ Done |
| `register` | Create a new account for syncing. | ✅ Done |
| `login` | Log in to Shell-Sync. | ✅ Done |
| `push` | Upload local history to the backend. | 🚧 Under Dev |
| `pull` | Fetch shell history from the backend. | 🚧 Under Dev |
| `sync` | Perform a full sync (push + pull). | 📌 Planned |
| `status` | View sync status. | 📌 Planned |
| `exclude --list` | List sensitive command exclusion patterns. | 📌 Planned |
| `exclude --add <pattern>` | Add a new exclusion pattern. | 📌 Planned |
| `exclude --remove <pattern>` | Remove an exclusion pattern. | 📌 Planned |
| `machines` | View all registered machines. | 📌 Planned |
| `machines --deregister <id>` | Deregister a machine from your account. | 📌 Planned |
| `logout` | Log out from the current session. | 📌 Planned |
| `encrypt --enable` | Enable encryption for local SQLite storage. | 📌 Planned |
| `encrypt --disable` | Disable encryption for local SQLite storage. | 📌 Planned |
| `export --file <path>` | Export shell history to a file. | 📌 Planned |
| `import --file <path>` | Import shell history from a file. | 📌 Planned |
| `debug` | Display debug logs for troubleshooting. | 📌 Planned |