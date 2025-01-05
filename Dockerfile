# Use Node.js LTS version
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Build the application
RUN npm run build

# Expose the application's port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:prod"]
