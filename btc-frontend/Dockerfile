FROM node:16-alpine AS build

WORKDIR /app

COPY package.json ./
RUN npm install --legacy-peer-deps

COPY . .

ARG REACT_APP_BACKEND_URL=http://localhost:3001
ENV REACT_APP_BACKEND_URL=${REACT_APP_BACKEND_URL}

# Build the old CRA app tolerantly: treat TS/ESLint issues as warnings, not errors
ENV CI=false
ENV TSC_COMPILE_ON_ERROR=true
ENV ESLINT_NO_DEV_ERRORS=true
ENV DISABLE_ESLINT_PLUGIN=true

RUN npm run build

# Serve with nginx
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
