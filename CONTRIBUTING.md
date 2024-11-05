prepare Pi
- setup image. perpare for your local network. hostname: mybrewery.locl; username: brewmaster; for now: brewmaster
- try to ping with ping mybrewery.local, if successful, access via ssh ssh brewmaster@mybrewery.local
-   trouble shoot: arp - a or brew install nmap (more detailled) -> nmap -sn <your_ip_scheme>
- sudo apt install build-essential python3-dev
- Option Athrough pip
  - first curl -sSL https://get.docker.com | sh; then sudo usermod -aG docker $USER; log out and back in to apply Docker permission
  - Docker Compose may not be pre-installed on the Raspberry Pi, so install it by running:: sudo apt-get update; sudo apt-get install -y libffi-dev libssl-dev; sudo apt-get   install -y python3 python3-pip
  - sudo apt install pipx
  sudo pipx ensurepath
  - pipx install docker-compose
- Option B Socker Standalone Binary
  -   sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  - sudo chmod +x /usr/local/bin/docker-compose
  - check: docker-compose --version


Project Structure
myproject/
├── backend/
│   ├── app.py
│   └── Dockerfile
├── frontend/
  ├── public/               # Public static files
  │   ├── index.html        # Main HTML file for the app
  │   └── favicon.ico       # Favicon or any other public assets
  │
  ├── src/                  # Main source folder for the app
  │   ├── assets/           # Images, icons, and other assets
  │   ├── components/       # Reusable UI components
  │   ├── pages/            # Pages representing each route
  │   ├── services/         # API services and helper functions
  │   ├── styles/           # Global styles (CSS, SCSS)
  │   ├── App.js            # Root app component
  │   ├── index.js          # Entry point for React
  │   └── setupTests.js     # Test setup for Jest/React Testing Library
  │
  ├── .dockerignore         # Files and folders to ignore in Docker builds
  ├── Dockerfile            # Dockerfile for building the app image
  ├── package.json          # Project dependencies and scripts
  └── package-lock.json     # Lockfile for dependencies

└── docker-compose.yml

docker-compose up --build -d
docker-compose down



Contributing to Homebrew Python Project
Thank you for considering contributing to this homebrew project! Contributions are welcome and encouraged, whether they are bug fixes, improvements, or new features.

Getting Started
  1. Fork the Repository
    Start by forking the repository and cloning it to your local machine.
      git clone https://github.com/YOUR_USERNAME/homebrew-python-project.git

  2. Create a New Branch
    Work on a dedicated branch for your changes to keep things organized.
      git checkout -b feature-or-fix-description
  
  3. Set Up the Environment
    Install the necessary dependencies. It's recommended to create a virtual environment.
      python -m venv env
      source env/bin/activate  # On Windows: env\Scripts\activate
      pip install -r requirements.txt

Making Changes
  - Follow the coding style used in the project.
  - Use good documentation for others to follow your code.
  - Write clear commit messages for each change.
  - Test your changes as thoroughly as possible.

Testing Your Changes
  If there are test scripts, run them to make sure everything is working as expected. Add new tests if you’ve added a new feature.
    python -m unittest discover -s tests

Submitting a Pull Request
  Push Your Changes
    Push your branch to your GitHub fork:
      git push origin feature-or-fix-description

  Create a Pull Request
    Go to the main repository on GitHub and create a pull request (PR) from your branch. Please provide a detailed description of the changes.

  Review Process
    Your pull request will be reviewed, and feedback may be provided. Please address any comments and update your PR if necessary.

Code of Conduct
  By contributing, you agree to abide by the project’s Code of Conduct to ensure a positive, inclusive environment for everyone.

Need Help?
If you have any questions, feel free to open an issue, and we'll do our best to help!

Thank you for your contributions!

