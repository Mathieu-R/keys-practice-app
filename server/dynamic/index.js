const fs = require('fs');
const path = require('path');
const express = require('express');
const adaro = require('adaro');

const app = express();

const production = process.env.NODE_ENV === 'production';
const staticPath = path.join(__dirname, '../../dist');
const templatePath = path.join(__dirname, '../../src/templates');

//const inlineStyle = fs.readFileSync(path.join(staticPath, 'css/critical.css'), 'utf-8');

const options = {
  cache: production ? true : false,
  whitespace: production ? false : true,
  helpers: [
    require('../helpers/add-hash')
  ],
  filters: []
};

// basic view options
const viewOptions = {
  title: 'Keys Practice',
  styles: ['dist/css/keys-practice.css'],
  //inlineStyle,
  scripts: ['dist/bootstrap.js']
}

app.engine('dust', adaro.dust(options));
app.set('view engine', 'dust');
app.set('views', templatePath);

// app
app.get('/', (req, res) => {
  res.status(200).render('sections/home', viewOptions);
});

module.exports = app;
