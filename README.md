<!-- Category: Epicodus;React;HTML/CSS/JS -->
## Food Nutrient Balancer

An application to analyze meals based on USDA food data and RDA recommendations.
Use this program at your own risk.
This program is a student demo only and is not certified to produce accurate results.
Consult with a dietician prior to making any dietary changes based on this program.

https://github.com/kentpmckinney/epi-capstone

## Use Case

Users include anyone wanting or needing to balance their diet according to scientific data and recommendations.
It allows the user to create, organize, and track the foods they consume or plan to consume.
The app shows the total nutrient composition and compares it to RDA recommendations.

## Minimum Viable Product

* Mobile app layout
* Pre-process USDA data with Python to cross-tabulate data into a single file
* Import the data and populate the food list
* Data includes only the core food list
* Retains user data in localStorage
* User can add from among 8000 foods to a list
* Adding foods to the list updates the Totals display
* Display daily totals for the more common macro-nutrients, vitamins, and minerals

## Tools for Minimum Viable Product

Visual Studio Code, Git, Node.js, React.js, HTML, SCSS, JavaScript, Python, Figma

## Additional Features

* Tablet app layout
* Desktop app layout
* Display totals for an extended set of nutrients and other useful attributes
* Add additional foods
* Allow user to specify foods they consumed on a given day
* Keep a history of consumed foods
* Allow user to group foods into a recipe
* Allow user to add a recipe to the food list
* Allow user to plan meals based on day of week
* Totals component can display totals by day or week
* Split the data into two files: an index file and main file
* Use profiling tools to assess app performance and resource usage
* Identify ways to improve app efficiency
* Enhance the pre-processing of data to prune unused data to reduce data footprint
* Compress/decompress data to improve speed and/or reduce footprint
* Tests to validate data against the USDA API

## Tools for Additional Features

Visual Studio Code Profiler

## Wireframe and Component Diagram

https://github.com/kentpmckinney/epi-capstone/blob/master/img/wireframe.png


## Previewing this Project

This project is hosted at: https://kentpmckinney.github.io/epi-capstone

## Working with the Source Code

The following instructions explain how to set up a development environment for this project on MacOS. Steps will differ depending on the operating system.

### Prerequisites

The following software must be installed and properly configured on the target machine. 

```
An updated web browser (Internet Explorer is not compatible)
```
```
Node.js
```
```
Git (optional but recommended)
```

### Setting up a Development Environment

1. Download a copy of the source code from: https://github.com/kentpmckinney/epi-capstone
   or clone using the repository link: https://github.com/kentpmckinney/epi-capstone.git
2. Navigate to the folder location of the source files in Finder or in the Terminal
3. Run the command `npm install` to download a local cache of the npm packages used by this application
4. Build the application with the command `npm run build`
5. Start the application with the command `npm run start`

## Deployment

Run the command 'npm run build' to create a production release of the application under ./build

## Technologies Used

* JavaScript
* HTML
* CSS
* React
* Webpack
* Babel
* Python

## Authors

Kent McKinney - [GitHub](https://github.com/kentpmckinney) - [LinkedIn](https://www.linkedin.com/in/kentpmckinney/)

### Copyright &copy; 2020 Kent P. McKinney

## Acknowledgments

https://www.learnhowtoprogram.com/react-part-time-react-track/react-with-nosql-part-2/react-with-nosql-independent-project