# Use a lightweight Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Install 'serve' to serve the app statically
RUN npm install -g serve

# Expose the port 'serve' will use
EXPOSE 5000

# Serve the app
CMD ["serve", "-s", "build", "-l", "5000"]
