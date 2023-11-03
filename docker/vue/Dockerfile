# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Compile o aplicativo Vue.js
RUN npm run build

# Copy the rest of the application code
COPY . .

# Expose the port your Vue.js app will run on
EXPOSE 8080

# Define the command to start your Vue.js application
CMD ["npm", "run", "serve"]
