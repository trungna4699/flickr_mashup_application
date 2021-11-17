FROM node:erbium

# Copy app source 
COPY /assignment1 .

# Install nodemon
RUN npm install nodemon -g

# Install app dependencies
RUN npm install

# Export port to outside world
EXPOSE 3000

# Start command as per package.json
CMD ["npm", "start"]