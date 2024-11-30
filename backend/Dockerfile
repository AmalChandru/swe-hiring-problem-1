# Use a specific Node.js version
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install production dependencies
RUN npm install --production

# Step 5: Copy the source code
COPY src ./src

# Step 6: Copy tsconfig.json to the working directory
COPY tsconfig.json ./

# Step 7: Install development dependencies
RUN npm install --only=development

# Step 8: Compile TypeScript
RUN npm run build


# Step 10: Start the application
CMD ["node", "dist/app.js"]
