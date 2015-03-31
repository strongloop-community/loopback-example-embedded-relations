var async = require('async');

module.exports = function(app) {
  var Customer = app.models.Customer;
  var emails = [
    {
      label: 'work',
      address: 'larry@xyz.com'
    },
    {
      name: 'home',
      address: 'larry@gmail.com'
    }
  ];
  Customer.create({ name: 'Larry Smith' }, function(err, customer) {
    console.log('Customer:', customer);
    async.each(emails, function(email, done) {
      customer.emails.create(email, done);
    }, function(err) {
      console.log('Customer with emails:', customer);
    });
  });
};
