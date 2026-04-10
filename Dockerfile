# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy built assets from builder stage
COPY --from=builder /app/dist ./dist

# Copy the server script
COPY server.js ./

# Create the data file for persistent locks
RUN touch access_locks.json

# Expose port (Internal)
EXPOSE 80

# Environment variables
ENV NODE_ENV=production
ENV PORT=80

# Start server
CMD ["node", "server.js"]
