module.exports = function(app) {
  app.dataSources.db.automigrate('Order', function(err) {
    if (err) throw err;

    app.models.Customer.find(function(err, customers) {
      if (err) throw err;

      var orders = [
        {date: '03-23-2015', customerId: customers[0].id},
        {date: '03-23-2015', customerId: customers[0].id},
        {date: '03-23-2015', customerId: customers[1].id},
        {date: '03-23-2015', customerId: customers[2].id},
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
