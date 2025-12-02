# Build stage
FROM node:18-alpine as builder

# Set working directory
WORKDIR /app

# Copy package files
COPY dog-api/package*.json ./

# Install dependencies
RUN npm ci

# Copy source files
COPY dog-api/ .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY dog-api/package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built files from builder
COPY --from=builder /app/dist ./dist

# Create uploads directory
RUN mkdir -p /app/uploads

# Expose the port the app runs on
EXPOSE 10000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=10000

# Command to run the application
CMD ["node", "dist/index.js"]

# Set working directory
WORKDIR /app

# Copy package files
COPY dog-api/package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built files from builder
COPY --from=builder /app/dist ./dist

# Create uploads directory
RUN mkdir -p /app/uploads

# Expose the port the app runs on
EXPOSE 10000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=10000

# Command to run the application
CMD ["node", "dist/index.js"]
