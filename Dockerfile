FROM rustlang/rust:nightly AS build

COPY . /src

WORKDIR src

RUN rustup default nightly
RUN cargo build --release

FROM ubuntu

RUN apt-get update -y && apt-get install -y wamerican

COPY --from=build /src/ui/ /ui/
COPY --from=build /src/target/release/icub3d_fn /

EXPOSE 8000

WORKDIR /

CMD ["/bin/bash", "-c", "ROCKET_ENV=dev ROCKET_ADDRESS=0.0.0.0 /icub3d_fn"]
