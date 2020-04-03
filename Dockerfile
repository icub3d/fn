FROM rustlang/rust:nightly AS rust

RUN apt-get update -y && apt-get install musl musl-dev musl-tools

COPY ./Cargo.toml ./words.txt /src/
COPY ./src/ /src/src

WORKDIR /src

RUN rustup target add x86_64-unknown-linux-musl
RUN rustup default nightly
RUN cargo build --target x86_64-unknown-linux-musl --release

FROM node:alpine AS ui

COPY ./fn /src

WORKDIR /src

RUN npm install --silent yarn
RUN yarn install --silent
RUN yarn build

FROM scratch

COPY --from=ui /src/build/ /ui/
COPY --from=rust /src/words.txt /words.txt
COPY --from=rust /src/target/x86_64-unknown-linux-musl/release/icub3d_fn /

EXPOSE 8080

WORKDIR /

ENV ROCKET_ENV=prod
ENV ROCKET_HOST=0.0.0.0
ENV ROCKET_PORT=8080

CMD ["/icub3d_fn"]
