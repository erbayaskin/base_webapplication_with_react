# Build stage
FROM node:18-alpine AS build

# Gerekli paketleri ekle
#RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json ./

# Install dependencies
RUN npm config set strict-ssl false
RUN npm i
#RUN rm -rf node_modules package-lock.json && npm install

# Copy the rest of the application code
COPY . .


# Build the React app
RUN npm run build

# Serve stage
FROM nginx:1.25.1

# Copy the custom nginx.conf file to the container
COPY .docker/nginx.conf /etc/nginx/nginx.conf

# Copy the built React app from the build stage to the nginx container
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 8088

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]