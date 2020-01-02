# PiClock

A Raspberry Pi touchscreen alarm clock based on mopidy music server. 

The project is strongly  inspred by the project https://github.com/ct-Open-Source/ct-Raspi-Radiowecker, which was published in the c't 18/2019 (germany's  leading it magazin).

## Motivation

I was looking for a easy to use alarm clock with multiple alarm times to configure and different media sources. I was a little bit disappointed about commercial alarm clocks. Most of them haven't multiple alarm times or it's too complicated to configure them. Therefore I decided to build an own alarm clock by using a raspberry pi and a touch display. Because I didn't want a new time consuming project, I started with the Kodi media center and some plugins. It was ok. Then I read about the ct-Raspi-Radiowecker project which has a very nice approach: Using the mopidy music server and a simple user interface on to of it. A limitation of the project is that it is not possible to use the Mopidy UI as well. Therefore I decided to start my own project where it is possible to integrate the Mopidy UI.

## Technical 

The alarm clock runs on a raspberry pi with the original 7'' touch screen. I use a HiFiBerry-DAC and a single speaker to make the sound. The raspberry runs on the Raspin Buster Lite distribution with a installed mopidy server. The Alaram CLock application itself is a Electronjs Application with User interface written in Typescript and Angular. Okay, the use of the angulator might be a little overkill, but I'm familier with it and could build the alarm clock UI on a rainy day...

## Features

* FFive individually configurable alarms
* Sleep timer
* The full mopidy music server functionality is accessible via a UI


# Installation


```
wget -q -O - https://apt.mopidy.com/mopidy.gpg | sudo apt-key add -

sudo wget -q -O /etc/apt/sources.list.d/mopidy.list https://apt.mopidy.com/buster.list

sudo apt update && sudo apt upgrade

sudo apt install --no-install-recommends xserver-xorg xinit xterm xserver-xorg-input-evdev xserver-xorg-video-fbturbo lightdm gstreamer1.0-alsa python3-pip python3-pygame python3-venv python3-wheel python-pip python-setuptools python-wheel python-alsaaudio mopidy mopidy-tunein mopidy-podcast-itunes 

sudo pip install Mopidy-Iris Mopidy-ALSAMixer 
sudo apt install x11-xserver-utils
```

```
~/.xsessionrc

xterm -e ~/pi-clock/run.sh
```
