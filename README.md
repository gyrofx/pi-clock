# PiClock

A Raspberry Pi touchscreen alarm clock based on mopidy music server.

The project is strongly inspired by the project https://github.com/ct-Open-Source/ct-Raspi-Radiowecker, which was published in the c't 18/2019 (germany's leading it magazin).

## Overview

The alarm clock runs on a raspberry pi with the original 7'' touch screen. I use a HiFiBerry-DAC and a single speaker to make the sound. The raspberry pi runs on the Raspian Buster Lite distribution with a installed mopidy server. The alarm clock application itself is a Electronjs Application with a user interface written in Typescript and Angular. Okay, the use of the angular might be a little overkill, but I'm familiar with it...

## Features

- Five individually configurable alarms
- Sleep timer
- The full mopidy music server functionality is accessible via the mopidy UI

# Installation

## Mopidy Server

```
wget -q -O - https://apt.mopidy.com/mopidy.gpg | sudo apt-key add -

sudo wget -q -O /etc/apt/sources.list.d/mopidy.list https://apt.mopidy.com/buster.list

sudo apt update && sudo apt upgrade

sudo apt install --no-install-recommends xserver-xorg xinit xterm xserver-xorg-input-evdev xserver-xorg-video-fbturbo lightdm gstreamer1.0-alsa python3-pip python3-pygame python3-venv python3-wheel python-pip python-setuptools python-wheel python-alsaaudio mopidy mopidy-tunein mopidy-podcast-itunes

sudo pip install Mopidy-Iris Mopidy-ALSAMixer
sudo apt install x11-xserver-utils
```

## pi-clock

Download and unzip

```
unzip pi-clock-linux-armv7l.zip
```

or build

```
npm install
npm run pack:raspi:prod
```

## Start script

This script is used to start the alram clock application after booting.

Edit `~/.xsessionrc`

```
xterm -e ~/pi-clock-linux-armv7l/pi-clock
```

## Configure backlight auto on/off

Edit `~/.xsessionrc`

```
sudo xset +dpms
sudo xset dpms 30 30 30
sudo xset q

xterm -e ~/pi-clock-linux-armv7l/pi-clock
```
