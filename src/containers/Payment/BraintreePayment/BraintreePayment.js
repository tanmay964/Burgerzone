var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "p7jg662zzz24gcdn",
  publicKey: "v3qq3mr8tfk7hntj",
  privateKey: "554ee4453dd6749982a474d3444e0450"
});

exports.getToken = (req, res) => {
    gateway.clientToken.generate({}, function (err, response) {
        if(err) {
            res.status(500).send(err)
        } else {
            res.send(response)
        }
      });
}

exports.processPayment = (req, res) => {
    
    let nonceFromTheClient = req.body.paymentMethodNonce

    let amountFromTheClient = req.body.amount
    
    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        //deviceData: deviceDataFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, function (err, result) {
          if(err) {
              res.status(500).json(err)
          } else {
              res.json(result)
          }
      });
}