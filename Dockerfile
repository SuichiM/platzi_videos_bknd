FROM node:lts-slim

WORKDIR '/home/app'

ARG COMMAND
ENV COMMAND $COMMAND

# COPY src/package.json package.json

# RUN npm install

# CMD npm run $COMMAND
# RUN npm run $COMMAND

RUN npm i -g vercel

ENTRYPOINT ["tail", "-f", "/dev/null"]
