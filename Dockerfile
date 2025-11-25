# -------------------------------
# Stage 1: Python dependencies
# -------------------------------
FROM python:3.12-slim AS python-stage

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY api/ ./api


# -------------------------------
# Stage 2: Node.js build
# -------------------------------
FROM node:22-alpine AS node-builder

WORKDIR /app

ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_IS_DOCKERIZED
ARG CLERK_SECRET_KEY
ARG BACKEND_URL

ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_IS_DOCKERIZED=$NEXT_PUBLIC_IS_DOCKERIZED
ENV CLERK_SECRET_KEY=$CLERK_SECRET_KEY
ENV BACKEND_URL=$BACKEND_URL

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

RUN npm run build


# -------------------------------
# Stage 3: Final image
# -------------------------------
FROM python:3.12-slim

WORKDIR /app

# -------------------------------
# Install system components
# -------------------------------
RUN apt-get update && apt-get install -y \
    curl build-essential nginx \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs


# -------------------------------
# Copy Python backend
# -------------------------------
COPY --from=python-stage /usr/local/lib/python3.12 /usr/local/lib/python3.12
COPY --from=python-stage /usr/local/bin /usr/local/bin
COPY --from=python-stage /app/api ./api


# -------------------------------
# Copy Next.js build artifacts
# -------------------------------
COPY --from=node-builder /app/.next ./.next
COPY --from=node-builder /app/public ./public
COPY --from=node-builder /app/node_modules ./node_modules
COPY --from=node-builder /app/package*.json ./


# -------------------------------
# Copy nginx config
# -------------------------------
COPY nginx.conf /etc/nginx/nginx.conf


# Expose ports
EXPOSE 8080


# -------------------------------
# Start 3 services
# -------------------------------
CMD sh -c "\
    nginx && \
    uvicorn api.index:app --host 0.0.0.0 --port 8000 & \
    npm start -- -p 3000 & \
    wait \
"
