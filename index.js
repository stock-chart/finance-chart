if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/finance-chart.production.min');
} else {
  module.exports = require('./dist/finance-chart.development');
}
