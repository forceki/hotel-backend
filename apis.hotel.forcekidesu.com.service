[Unit]
Description=hello_env.js - making your environment variables rad
Documentation=https://example.com
After=network.target

[Service]
Environment=HOST=0.0.0.0
Environment=PORT=8094
Environment=DB_USER=forceki
Environment=DB_HOST=localhost
Environment=DB_PASSWORD=segsprojeck
Environment=DB_PORT=3306
Environment=DB_DATABASE=hotel
Environment=TOKEN_KEY=1b4c259ccd8102daff2aa5c3597c4705
Type=simple
WorkingDirectory=/home/hotel-apis
ExecStart=/usr/bin/node app
Restart=on-failure

[Install]
WantedBy=multi-user.target

