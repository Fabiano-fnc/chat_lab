install.api:
    @echo "--> Installing API"
    @cd api && docker-compose build

run.api:
    @echo "--> Running API"
    @cd api && docker-compose up back_chat_lab

install.frontend:
    @echo "--> Installing Frontend"
    @cd frontend && npm install

run.frontend:
    @echo "--> Running Frontend"
    @cd frontend && npm start