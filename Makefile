production:
				npm install
				npm run build
				npm run start

deploy-script:
				npm install
				npm run build
				pm2 restart frontend

dev:
				npm install
				npm run dev