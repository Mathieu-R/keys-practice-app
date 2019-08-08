const fs = require('fs');
const path = require('path');
const express = require('express');
const adaro = require('adaro');

const app = express();

const production = process.env.NODE_ENV === 'production';
const templatePath = path.join(__dirname, '../../src/templates');

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
  styles: ['/static/css/keys-practice.css'],
  scripts: ['/static/bootstrap.js']
}

app.engine('dust', adaro.dust(options));
app.set('view engine', 'dust');
app.set('views', templatePath);

// app
app.get('/', (req, res) => {
  res.status(200).render('sections/home', {
    ...viewOptions,
    keys: ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']
  });
});

module.exports = app;
