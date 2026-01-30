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

# Expose only the frontend port
EXPOSE 3000

# Set the API URL for the build
ENV VITE_BASE_URL=http://localhost:5000

# Create a startup script
RUN echo '#!/bin/sh' > /app/start.sh && \
    echo 'echo "Starting JSON Server on port 5000"' >> /app/start.sh && \
    echo 'npm run server &' >> /app/start.sh && \
    echo 'echo "Starting React app on port 3000"' >> /app/start.sh && \
    echo 'npx serve -s dist -l 3000' >> /app/start.sh && \
    chmod +x /app/start.sh

# Start both services
CMD ["/app/start.sh"]