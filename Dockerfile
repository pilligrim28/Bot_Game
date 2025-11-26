# Multi-stage Dockerfile
# Stage 1: builder — install deps and build backend + frontend
FROM node:20 AS builder
WORKDIR /build

# copy package manifests
COPY package*.json ./
COPY frontend/package*.json ./frontend/

# install root deps (including dev deps needed for build)
RUN npm ci

# install frontend dependencies separately with dev deps
RUN cd frontend && npm ci

# copy project files
COPY . .

# build backend and frontend
RUN npm run build:all

### Stage 2: runtime image
FROM node:20-slim AS runtime
WORKDIR /app

ENV NODE_ENV=production

# copy package files and install only production deps
COPY package*.json ./
RUN npm ci --omit=dev

# copy built app and frontend build from builder
COPY --from=builder /build/dist ./dist
COPY --from=builder /build/frontend/dist ./frontend/dist

# copy uploads dir (if any was present during build)
COPY --from=builder /build/uploads ./uploads

# Create uploads directory if it doesn't exist
RUN mkdir -p uploads

VOLUME ["/app/uploads"]

EXPOSE 3000

CMD ["node", "dist/main.js"]