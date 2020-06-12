var moment = require('moment');

// Parse
var today = moment('2015-06-15', 'YYYY-MM-DD');
console.log(moment('2015-06-15', 'YYYY-MM-DD').format()); // 2015-06-15T00:00:00+09:00
console.log(moment('07:45', 'hh:mm').format()); // 2015-06-19T07:45:00+09:00 오늘 날짜


// Format
console.log(today.format()); // "2015-06-15T00:00:00+09:00"
console.log(today.format('YYYY-MM-DD')); // "2015-06-15"
console.log(today.format('YYYY')); // "2015"
console.log(today.format('MM')); // "06"
console.log(today.format('DD')); // "15"

// Query
console.log(moment('2010-10-20').isSame('2010-10-21')); // false
console.log(moment('2009-10-20').isSame('2010-10-21', 'year')); // false
console.log(moment('2010-10-20').isSame('2010-10-21', 'month')); // true
console.log(moment('2010-10-20').isSame('2010-10-21', 'date')); // false

// Duration
var t1 = new Date(2016, 5, 18);
var t2 = new Date(2016, 5, 19);
var diff1 = {
  seconds: Math.floor((t2 - t1) / 1000), // 86400
  minutes: Math.floor((t2 - t1) / (1000 * 60)), // 1440
  hours: Math.floor((t2 - t1) / (1000 * 60 * 60)) // 24
};
console.log(diff1);

var diff2 = {
  seconds: moment.duration(t2 - t1).asSeconds(), // 86400
  minutes: moment.duration(t2 - t1).asMinutes(), // 1440
  hours: moment.duration(t2 - t1).asHours() //24
};
console.log(diff2);