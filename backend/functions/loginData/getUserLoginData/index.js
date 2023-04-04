/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

/**
 * Reference: https://cloud.google.com/community/tutorials/cloud-functions-firestore
 */
 const Firestore = require('@google-cloud/firestore');

 const PROJECTID = 'serverlessproj';
 const COLLECTION_NAME = 'loginData';
 
 const firestore = new Firestore({
     projectId: PROJECTID,
     timestampsInSnapshots: true
 });
 
 exports.getUserData = async (req, res) => {
 
     res.set('Access-Control-Allow-Origin', '*');
     
     if (req.method === 'OPTIONS') {
         // Send response to OPTIONS requests
         res.set('Access-Control-Allow-Methods', '*');
         res.set('Access-Control-Allow-Headers', '*');
         res.status(204).send('');
     }
     console.log(req.body)
     
     // Create a reference to the Users collection
     const usersRef = firestore.collection(COLLECTION_NAME);
     // Create a query against the collection
     const queryRef = await usersRef.where('email', '==', req.body.email).get();
 
     if (queryRef.empty) {
         res.status(400).send("fail");
         return;
     }
 
     var loginArr = [];
 
     queryRef.forEach(doc => {
             loginArr.push(doc.data().loginTime)
             console.log(doc.id, '=>', doc.data());
     });
 
     res.status(200).send(loginArr);
     return;
 };
 