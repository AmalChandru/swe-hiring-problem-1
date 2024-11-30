# Running shell-sync 🛸 Locally

To run the Shell-Sync application locally with Docker, follow these steps:

## Prerequisites

Before you begin, ensure that you have the following tools installed on your machine:

- **Docker**: Install [Docker](https://docs.docker.com/engine/install/)
- **Docker Compose**: Install [Docker Compose](https://docs.docker.com/compose/install/)

## Steps to Run the Application Locally

### 1. Clone the Repository

Clone the Shell-Sync repository to your local machine:

```bash
git clone https://github.com/AmalChandru/swe-hiring-problem-1.git
cd swe-hiring-problem-1
```

### 2. Set Up Environment Variables

The application uses environment variables that need to be defined in a `.env` file. Make sure the `.env` file is in the root directory of your project.

Here's an example of what the `.env` file should look like:

```bash
# Backend variables
PORT=port_number
MONGODB_URI=mongodb://localhost:27017/shell-sync
API_SECRET=your-api-secret
LOG_LEVEL=info

# CLI variables
API_URL=backend_api_url
HOME=~/
```

Ensure that you replace `your-api-secret` with a secret key of your choice.

### 3. Build and Start the Containers

Once you have Docker and Docker Compose set up, you can build and run the application containers.

Run the following command to start the backend, CLI, and MongoDB containers:

```bash
docker compose up --build
```

This will:

- Build the images for the backend, CLI, and MongoDB services.
- Start the services as containers.
- Expose the backend on port `PORT` and MongoDB on port 27017.

You should see output in the terminal indicating the services are running. The backend logs will appear, and MongoDB will be up and ready.

### 4. Verify the Application is Running

Once the containers are running, you can verify that the backend is up and accessible by visiting the given `API_URL` in your browser

You should see the message: **Shell-Sync Backend is up and running.**

**Note:** The setup has been only tested and verified on fedora linux system with the following versions of Docker and Docker Compose:
- Docker Engine version: `v27.3.1`
- Docker Compose version: `v2.29.7`
