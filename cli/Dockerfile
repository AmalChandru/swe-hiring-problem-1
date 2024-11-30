# Use a specific Node.js version
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Step 1: Copy package.json and package-lock.json for CLI
COPY package*.json ./

# Step 2: Install all dependencies (including dev dependencies)
RUN npm install

# Step 3: Copy the source code for CLI
COPY src ./src

# Step 4: Copy tsconfig.json for CLI
COPY tsconfig.json ./

# Step 5: Compile TypeScript for CLI manually
RUN npm run build

# Step 6: Expose the port (if necessary, for CLI interaction)
EXPOSE 3001

# Step 7: Command to run the CLI
CMD ["node", "dist/index.js"]
