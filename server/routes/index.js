module.exports = function(app, db) {
  app.post('/api/savePortfolio', (req, res) => {
    db.insert(req.body, (err, doc) => {
      res.send({ portfolioId: doc._id });
    });
  });

  app.get('/api/getPortfolio/:portfolioId', (req, res) => {
    db.findOne({ _id: req.params.portfolioId }, (err, doc) => {
      if (!doc) {
				return res.status(403).send({ success: false, msg: 'No portfolio found.' });
			}
      res.status(201).send({ portfolio: doc });
      if (err) console.log(err);
    });
  });

  app.patch('/api/updatePortfolio/:portfolioId', (req, res) => {
    delete req.body._id;
    db.update({ _id: req.params.portfolioId }, req.body, (err, doc) => {
      res.status(201).send({ success: true });
    });
  });
};
