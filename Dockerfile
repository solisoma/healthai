# -------------------------------
# Stage 1: Python dependencies
# -------------------------------
FROM python:3.12-slim AS python-stage

WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy FastAPI code
COPY api/ ./api/


# -------------------------------
# Stage 2: Node.js build
# -------------------------------
FROM node:22-alpine AS node-builder

WORKDIR /app

# ✅ Add all build arguments
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_IS_DOCKERIZED
ARG CLERK_SECRET_KEY
ARG BACKEND_URL

# ✅ Set environment variables (needed during build)
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_IS_DOCKERIZED=$NEXT_PUBLIC_IS_DOCKERIZED
ENV CLERK_SECRET_KEY=$CLERK_SECRET_KEY
ENV BACKEND_URL=$BACKEND_URL

# Install Node dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy frontend code
COPY . .

# Build Next.js
RUN npm run build


# -------------------------------
# Stage 3: Final image - Python base with Node installed
# -------------------------------
FROM python:3.12-slim

WORKDIR /app

# Install Node.js and npm
RUN apt-get update && apt-get install -y curl build-essential \
    && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# -------------------------------
# Copy Python dependencies and API
# -------------------------------
COPY --from=python-stage /usr/local/lib/python3.12 /usr/local/lib/python3.12
COPY --from=python-stage /usr/local/bin /usr/local/bin
COPY --from=python-stage /app/api ./api

# -------------------------------
# Copy Node build & source code
# -------------------------------
COPY --from=node-builder /app/node_modules ./node_modules
COPY --from=node-builder /app/.next ./.next
COPY --from=node-builder /app/public ./public
COPY --from=node-builder /app/package*.json ./

# Expose ports
EXPOSE 3000
EXPOSE 8000
    