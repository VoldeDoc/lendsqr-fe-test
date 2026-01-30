FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the React app
RUN npm run build

# Expose the port
EXPOSE 3000

# Create a startup script that serves both API and frontend on the same port
RUN echo '#!/bin/sh' > /app/start.sh && \
    echo 'PORT=${PORT:-3000}' >> /app/start.sh && \
    echo 'echo "Starting JSON Server on port 5000"' >> /app/start.sh && \
    echo 'npm run server &' >> /app/start.sh && \
    echo 'echo "Starting React app on port $PORT"' >> /app/start.sh && \
    echo 'npx serve -s dist -l $PORT' >> /app/start.sh && \
    chmod +x /app/start.sh

# Start both services
CMD ["/app/start.sh"]