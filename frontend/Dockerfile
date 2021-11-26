# STAGE 1 Angular Development
FROM node:17 AS development

ARG UID=1000
ARG GID=1000

RUN \
  usermod --uid ${UID} node && groupmod --gid ${GID} node &&\
  mkdir /srv/app && chown node:node /srv/app

USER node

SHELL ["/bin/bash", "-c"]

WORKDIR /srv/app

COPY --chown=node:node package.json package-lock.json ./

# Fix global installing packages.
RUN mkdir ~/.npm-global
RUN npm config set prefix '~/.npm-global'
RUN npm install -g @angular/cli
ENV PATH "$PATH:~/.npm-global/bin"

RUN npm install --quiet

EXPOSE 4200
EXPOSE 3500

# STAGE 2 Angular Development
FROM node:17-slim AS production

USER node

WORKDIR /srv/app

COPY --from=development --chown=root:root /srv/app/node_modules ./node_modules

COPY . .

CMD ["npm", "run", "start"]