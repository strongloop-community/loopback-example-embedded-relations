module.exports = function(app) {
  app.dataSources.db.automigrate('Order', function(err) {
    if (err) throw err;

    app.models.Customer.find(function(err, customers) {
      if (err) throw err;

      var orders = [
        {date: '03-23-2015', customerId: 4},
        {date: '03-23-2015', customerId: 4},
        {date: '03-23-2015', customerId: 5},
        {date: '03-23-2015', customerId: 6},
        {date: '03-23-2015'}
      ];

      var count = orders.length;

      orders.forEach(function(order) {
        app.models.Order.create(order, function(err, instance) {
          if (err)
            return console.log(err);

          console.log('Order created:', instance);

          count--;

          if (count === 0)
            console.log('done');
        });
      });
    });
  });
};
