<div>
  <p align="center">
    <img src="./sodium-static/public/sodium.png">
  </p>
  <h1 align="center">Static Hosting</h1>
</div>

Learn how to setup Sodium on a Static Host such as Cloudflare Pages

## Setup & installation

- First you need to fork this repository.
- In your forked repository navigate to register-sw.js and edit the wisp server to something thats unblocked
- Next you need go to whichever host you will be using.
- Step 4 is to Select the repository that you are gonna be hosting (Hopefully its sodium!)
- Next if your Host supports this Set the output directory to `sodium-static\public\` and **DO NOT MAKE IT RUN `npm install` or `npm start` AS THIS WILL START AN HTTP SERVER WHICH IS NOT SUPPORTED BY STATIC HOSTS**
- Step 6 is to then run and enjoy your experience with Sodium!

(C) Copyright 2021-2025 z1g Project All Rights Reserved
Licenced Under the [MIT License](https://github.com/z1g-project/sodium/blob/master/LICENSE.txt)
