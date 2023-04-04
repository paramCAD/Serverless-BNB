//Reference : https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/ses-examples-sending-email.html

var aws = require("aws-sdk");
var ses = new aws.SES({ region: "us-east-1" });
exports.handler = async function (event) {
  
  console.log(event);
  console.log(event.body)
  const obj = JSON.parse(event.body);
  console.log("obj: ", obj);
  console.log("obj email: ", obj.email);
  console.log("obj title: ", obj.title);
  console.log("obj subject: ", obj.subject);
  obj.title = obj.title + "\n\nRegards, \nServerless BnB Team"
  var params = {
    Destination: {
      ToAddresses: [obj.email],
    },
    Message: {
      Body: {
        Text: { Data: obj.title},
      },

      Subject: { Data: obj.subject},
    },
    Source: "serverless.bnb.team@gmail.com",
  };
 
  return ses.sendEmail(params).promise()
};