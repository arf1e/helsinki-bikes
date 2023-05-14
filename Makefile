generate-frontend-env:
				grep 'GOOGLE_MAPS_KEY' .env | sed 's/GOOGLE_MAPS_KEY/NEXT_PUBLIC_GOOGLE_MAPS_KEY/' > frontend/.env.local

generate-backend-env:
				# delete last backend .env if it exists
				-rm backend/.env
				# pass the given env variables
				grep 'DB_PASSWORD' .env >> backend/.env
				grep 'GOOGLE_MAPS_KEY' .env >> backend/.env
				# copy url from example env file so prisma would be happy
				grep 'DATABASE_URL' backend/.env.example >> backend/.env

production:
				make generate-frontend-env
				docker-compose up

clean:
				docker-compose down

production-frontend:
				make generate-frontend-env
				cd frontend && make production

dev-frontend:
				make generate-frontend-env
				cd frontend && make dev

dev-backend:
				make generate-backend-env
				cd backend && make dev

dev-seed:
				make generate-backend-env
				cd backend && make seed

test-frontend:
				make generate-frontend-env
				cd frontend && npm install
				cd frontend && npm run cypress

test-backend:
				make generate-backend-env
				cd backend && npm install
				cd backend && make test
