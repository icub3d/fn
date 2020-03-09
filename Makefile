build:
	docker build -t docker.themarshians.com/icub3d/fn .

push: 
	docker push docker.themarshians.com/icub3d/fn
