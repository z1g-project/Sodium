<div>
  <p align="center">
    <img src="./sodium-static/public/sodium.png">
  </p>
  <h1 align="center">Static Hosting</h1>
</div>

Learn how to setup Sodium on a Static Host such as Cloudflare Pages

## Setup & installation

- First you need to fork this repository.
- In your forked repository navigate to `sodium-static\public\ultra\ultra.config.js` and set the bare to a public bare server like `https://tomp.app` if you are confused what to put just Comment out the bare array then uncomment out the public bare it will tell you in the config what to do. Also you must repeat this step for `sodium-static\public\dyn\dyn.config.js` except it will be easier since its not in a array.
- Next you need go to whichever host you will be using.
- Step 4 is to Select the repository that you are gonna be hosting (Hopefully its sodium!)
- Next if your Host supports this Set the output directory to `sodium-static\public\` and **DO NOT MAKE IT RUN `npm install` or `npm start` AS THIS WILL START AN HTTP SERVER WHICH IS NOT SUPPORTED BY STATIC HOSTS**
- Step 6 is to then run and enjoy your experience with Sodium!

(C) Copyright 2021-2024 z1g Project All Rights Reserved
Licenced Under the [MIT License](https://github.com/z1g-project/sodium/blob/master/LICENSE.txt)
