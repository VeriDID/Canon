# Use an official Node.js alpine image for smaller size
FROM node:16-alpine

# Create a directory for the application
WORKDIR /usr/src/app

# Install global dependencies
RUN yarn global add @nestjs/cli

# Copy package.json, yarn.lock and package-lock.json (if available)
COPY package*.json yarn.lock ./

# Install dependencies
RUN yarn install --production

# Copy source code
COPY . .

# Change the owner of the /usr/src/app directory to node
RUN chown -R node:node /usr/src/app

# Use node user to run the next commands and the application
USER node

# Compile the TypeScript code
RUN yarn build

# Expose the intended port for the application
# You can still define the default EXPOSE without an ENV value
EXPOSE 8000

# Command to run the application
CMD [ "node", "dist/main.js" ]
