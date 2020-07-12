FROM node:12
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 4000
ENV ENV=production
CMD ["npm", "run", "build" ]
CMD ["npm", "run", "start"]