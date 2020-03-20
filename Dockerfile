FROM rustlang/rust:nightly AS build

RUN apt-get update -y && apt-get install musl musl-dev musl-tools

COPY . /src

WORKDIR /src

RUN rustup target add x86_64-unknown-linux-musl
RUN rustup default nightly
RUN cargo build --target x86_64-unknown-linux-musl --release

FROM scratch

COPY --from=build /src/words.txt /words.txt
COPY --from=build /src/ui/ /ui/
COPY --from=build /src/target/x86_64-unknown-linux-musl/release/icub3d_fn /

EXPOSE 8080

WORKDIR /

ENV ROCKET_ENV=prod
ENV ROCKET_HOST=0.0.0.0
ENV ROCKET_PORT=8080

CMD ["/icub3d_fn"]
