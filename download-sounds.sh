#!/bin/bash

# Create sounds directory if it doesn't exist
mkdir -p public/sounds

# Download sound files from more reliable sources
curl -L -o public/sounds/coin.mp3 https://freesound.org/data/previews/270/270304_5123851-lq.mp3
curl -L -o public/sounds/select.mp3 https://freesound.org/data/previews/270/270315_5123851-lq.mp3
curl -L -o public/sounds/start.mp3 https://freesound.org/data/previews/270/270325_5123851-lq.mp3
curl -L -o public/sounds/arcade-background.mp3 https://freesound.org/data/previews/270/270335_5123851-lq.mp3

echo "Sound files downloaded successfully!" 