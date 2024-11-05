# frontend/Dockerfile
# Use a lightweight Node.js image as the base
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies (helps with caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app for production
RUN npm run build

# Use a simple static server to serve the files, e.g., 'serve'
RUN npm install -g serve

# Expose the port 'serve' will use (e.g., 3000)
EXPOSE 3000

# Start the app using 'serve' on port 3000
CMD ["serve", "-s", "build", "-l", "3000"]
