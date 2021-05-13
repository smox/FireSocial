# FireSocial
A small Social Network for learning purposes. It intends to be a internal Social Network for Fire Fighters. Not for production use.

## Installation / Start of the application
### OpenSUSE / SUSE Linux Enterprise
* sudo zypper in docker docker-bash-completion npm-default
* sudo usermod -aG docker $USER
* reboot
* git clone https://github.com/smox/FireSocial.git
* cd FireSocial
* chmod +x mongodb-cmd.sh
* ./mongodb-cmd.sh
* Open http://localhost:8081 in your Browser and create collection "FireSocialDB"
* npm install
* npm run dev (if you want hot reload) or npm start (for single start)




