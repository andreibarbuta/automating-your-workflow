// main.js

$(document).ready(function() {
  'use strict';

  if ('testing' === 'testing') {
    // Note: Cannot have console log in tests
    // or Karma will return an error
    // console.log('testing'));
  }
});

function add(num1, num2) {
  'use strict';
  return num1 + num2;
}
