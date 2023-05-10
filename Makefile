production-build:
				docker-compose up

deploy-script:
				docker-compose --env-file /home/runner/dotfiles/api.env up -d

dev:
				echo "todo dev config"

test:
				npm run test

.PHONY: test