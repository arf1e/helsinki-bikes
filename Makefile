production-build:
				docker-compose up

deploy-script:
				docker-compose --env-file /home/runner/dotfiles/api.env up -d

dev:
				# start the database
				docker-compose -f docker-compose.dev.yml up -d
				# install packages
				npm install
				# generate prisma client
				npx prisma generate
				# sync db schema
				prisma migrate deploy
				# run app in dev mode
				npm run start:dev

seed:
			docker-compose -f docker-compose.dev.yml up -d
			npx prisma db seed

test:
				npm run test

.PHONY: test