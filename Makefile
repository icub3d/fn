build:
	docker build -t icub3d/fn .

push: 
	docker push icub3d/fn

run: 
	docker run --rm -p8080:8080 --name fn icub3d/fn