# Root Readme


on pi:

sudo apt update && sudo apt upgrade -y

sudo apt install -y ca-certificates curl gnupg

add docker
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo tee /etc/apt/keyrings/docker.asc > /dev/null
sudo chmod a+r /etc/apt/keyrings/docker.asc

add dockers repo
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

run again
sudo apt update


install docker & docker compose
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin


enable dokcer on startup

sudo systemctl enable docker
sudo systemctl start docker

check if docker is running 
sudo docker version


Allow docker to run without sudo
sudo usermod -aG docker $USER
newgrp docker

TROUBLESHOOT at compose up
 FYI 19 does not yet support json viewer(?)
cd protected
npm uninstall react-json-view flux
npm uninstall react react-dom
npm install react@18 react-dom@18
npm install
cd.. 
compose up


install npm
sudo apt install -y nodejs npm


check node and npm version
````
node -v
npm -v
````




# FYI
this one still broken
cd backend && npm install && cd ../frontend && npm install && cd ..
still thowing errors - t be fixed



3. If Files Are Missing, Initialize npm
If the package.json and package-lock.json are missing, you need to generate them:

bash
Kopieren
Bearbeiten
cd protected_frontend
npm init -y
npm install
Then repeat the same for public_frontend:

bash
Kopieren
Bearbeiten
cd ../public_frontend
npm init -y
npm install

npm cache clean --force
npm install --legacy-peer-deps
