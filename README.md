# Quesine
Quesine is a hybrid mobile app developed during the 2015 Dutch Open Hackathon, in collaboration with Tim Selier, David Soff and Erik Stammes.
Using Philips' Healthsuite API for managing wearables data, and the Albert Heijn supermarket API for access to their recipe info,
the user is presented with a selection of recipes tailored to his or her daily lifestyle, as analysed from the wearable data.

The entire app was written during the 48 hour lasting hackathon, and code was uploaded to github without further modification or commenting (except for removal of token keys). Keep in mind that this is solely a quick prototype.

![alt tag](https://github.com/Nedervino/Quesine-App/blob/master/screenshots/screenshot4.png)
![alt tag](https://github.com/Nedervino/Quesine-App/blob/master/screenshots/screenshot6.png)


# Goal
The goal of the app was to take away the burden of keeping track what ingredients or recipes are healthy,
whilst still providing tailored healthy recipes to the user in an easy to use interface. It does this by automating the process
of monitoring wearable data (such as calories burned, glucose level, blood pressure, etc.), and comparing this to recipe info
provided by the Allerhande recipe API (containing info such as calories, fat, sodium, and proteins per recipe).


After the user has logged in with his Philips Healthsuite account, a sorted list according to how well the recipes match
their personal needs is presented, which the user can swipe through in a Tinder-like fashion, allowing them to save liked
recipes and order their ingredients directly from the Albert Heijn store.

# Implementation
The backend is running on node.js, whilst the hybrid iphone and android apps were written using the Ionic framework.
API's for Philips' Healthsuite and Albert Heijn's recipe database were provided by both companies for the hackathon 
participants, and only made available for use within the contest. In addition, certain resources were scraped off of the Albert Heijn site, and a part of Philips' data was stored on server to speed up response time.

![alt tag](https://github.com/Nedervino/Quesine-App/blob/master/screenshots/screenshot1.png)
![alt tag](https://github.com/Nedervino/Quesine-App/blob/master/screenshots/screenshot3.png)
