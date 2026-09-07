FROM node:22-slim

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy application source and build
# Note: NEXT_PUBLIC_* vars are inlined at build time, not read at container
# startup, so any such var must be passed as a build ARG/--build-arg if the
# app comes to depend on one at runtime.
COPY . .
RUN npm run build

# Expose web port
EXPOSE 3000

# Run Next.js production server
CMD ["npm", "start"]
