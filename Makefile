DYNAMO-LOCAL := templates/docker/dynamo-local.yml

dynamo-up:
	docker-compose -f $(DYNAMO-LOCAL) up -d
dynamo-stop:
	docker-compose -f $(DYNAMO-LOCAL) stop
dynamo-start:
	docker-compose -f $(DYNAMO-LOCAL) start
dynamo-destroy:
	docker-compose -f $(DYNAMO-LOCAL) down -v
	docker rmi $(shell docker images amazon/dynamodb-local -q)