#!/bin/sh

password=

usage() {
    echo "usage: ghost-ec2-config [[-p password ] | [-h]]"
}

while [ "$1" != "" ]; do
    case $1 in
        -p | --password )       shift
                                password=$1
                                ;;
        -h | --help )           usage
                                exit
                                ;;
        * )                     usage
                                exit 1
    esac
    shift
done

apt-get update

# install node & npm
apt-get install -y python-software-properties python g++ make unzip
FORCE_ADD_APT_REPOSITORY=1 add-apt-repository ppa:chris-lea/node.js
apt-get update
apt-get install -y nodejs

# install nginx
FORCE_ADD_APT_REPOSITORY=1 add-apt-repository ppa:nginx/stable
apt-get update
apt-get install -y nginx

# configure nginx
#update-rc.d nginx defaults # not sure this is required
mkdir /var/www
chown ubuntu:www-data -R /var/www
chmod 0755 -R /var/www
rm -rf /etc/nginx/sites-enabled/default
mv /etc/nginx/sites-available/default /etc/nginx/sites-available/default.old

if [ "$password" = "" ]; then
# No password variable specified
cat <<EOF >> /etc/nginx/sites-available/default
# Basic nginx config for a node.js server
server {
        root /var/www;
        index index.js;

        server_name localhost;

        location / {
                proxy_pass http://127.0.0.1:2368;
                access_log off;
        }
}
EOF
else
# Passed a password parameter
# Create the .htpasswd file
printf "ghost:$(openssl passwd -crypt $password)\n" > /home/ubuntu/.htpasswd
cat <<EOF >> /etc/nginx/sites-available/default
# Basic nginx config for a node.js server
server {
        root /var/www;
        index index.js;

        auth_basic            "Restricted";
        auth_basic_user_file  /home/ubuntu/.htpasswd;

        server_name localhost;

        location / {
                proxy_pass http://127.0.0.1:2368;
                access_log off;
        }
}
EOF
fi

ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default

# restart nginx
service nginx restart

# Install Monit
apt-get install monit

# Setup Ghost Upstart config
touch /etc/init/ghost.conf

cat <<EOF >> /etc/init/ghost.conf
#!upstart
description "Ghost Blog"
author      "Ghost Foundation"

start on runlevel [2345]
stop on runlevel [016]

script
    export HOME="/root"

    echo 1340 > /var/run/ghost.pid
    cd /var/www/
    exec sudo -u ubuntu sh -c "/usr/bin/node index.js"
end script

pre-stop script
    rm /var/run/ghost.pid
end script
EOF

# Add in Monit config to watch new Ghost process
cat <<EOF >> /etc/monit/monitrc

check process nodejs with pidfile "/var/run/ghost.pid"
    start program = "/sbin/start ghost"
    stop program  = "/sbin/stop ghost"
    if failed port 8000 protocol HTTP
        request /
        with timeout 10 seconds
        then restart
EOF

# Init Upstart
start ghost

# Init monit to check every 60 seconds
monit -d 60 -c /etc/monit/monitrc
