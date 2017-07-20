# Steps "Financial Health Score" Guide

The Steps "Financial Health Score" Guide is an open sourced resource for anyone to use. This resource provides a personalized experience for low-income people to explore actions they can take to improve their overall financial health. The guide can be viewed at https://steps.ideo.org/financial-health-score-guide.

## Getting Started

#### Including the guide into your own website
1. Go to the [/dist](/dist) folder. You should see three files with the extension .html, .js, .css.
2. If you'd like this guide on a separate page by itself, simply copy the three files into the same folder. Then open the index.html page with your favorite browser.
3. If you'd like this guide embedded inside of your own website template, include the following snippet of code into the section of the html file where you wish to display the guide: `<div id="steps-guide-healthscore"></div>`
4. Then right before the end `</body>` tag (after all other code), insert this `<script type="text/javascript" src="main.js"></script>`
5. Right before the end `</head>` tag (after all other stylesheets), insert this `<link href="main.css" rel="stylesheet">`

#### Running the code on your own local environment
1. `git clone https://github.com/IDEOorg/steps-guide-healthscore`
2. `cd steps-guide-healthscore`
3. `npm install`
4. Running the code on your server:
  * **To run the development build:**
  `npm run start` then go to http://localhost:3000
  * **To run the production build**
  `npm run build` then go to http://localhost:4000. The production files will be in the [/dist](/dist) folder.

## Contribution and Submitting Bugs

We welcome all contributions to this code base, as well as bug reports. To suggest a contribution please open a pull request against this repository. It is likely a good idea to get in touch before doing any work so we can coordinate.

Please submit any bug reports via GitHub issues. Click on the Issues tab at the top of this page.

## License

This project is licensed under the MIT license. The license can be read [here](LICENSE).

## Other Open Source Licenses

Much of the project directory structure and build scripts are adapted from [react-slingshot](https://github.com/coryhouse/react-slingshot). Its license can be read [here](PARTNER-LICENSES)
