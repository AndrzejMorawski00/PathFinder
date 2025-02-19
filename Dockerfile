FROM node:22-alpine AS base

WORKDIR /app

COPY package*.json ./

RUN npm install


# Development Stage
FROM base AS dev

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]

# Production Builder Stage

FROM base AS builder

COPY . . 

RUN npm run build

# Production Stage
FROM nginx:stable-alpine AS prod

COPY --from=builder /app/dist /usr/share/nginx/html

COPY /nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
