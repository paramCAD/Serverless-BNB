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
 const COLLECTION_NAME = 'Users';
 
 const firestore = new Firestore({
     projectId: PROJECTID,
     timestampsInSnapshots: true
 });
 
 exports.storeRegistrationData = async (req, res) => {
 
     res.set('Access-Control-Allow-Origin', '*');
     
     if (req.method === 'OPTIONS') {
         // Send response to OPTIONS requests
         res.set('Access-Control-Allow-Methods', '*');
         res.set('Access-Control-Allow-Headers', '*');
         res.status(204).send('');
     }
     console.log(req.body)
     
     // const loginTime = (new Date()).toString();
     const email =  req.body.email
     const ans1 =  req.body.ans1
     const ans2 =  req.body.ans2
     const key =  req.body.key
     const firstname =  req.body.firstname
     const lastname =  req.body.lastname
     // .add() will automatically assign an ID
 
     const usersRef = firestore.collection(COLLECTION_NAME);
     // Create a query against the collection
     const queryRef = await usersRef.get();
 
     queryRef.forEach(doc => {
         if (doc.data().key === req.body.key) {
             res.status(400).send("fail");
             return;
         }
     });
 
     return firestore.collection(COLLECTION_NAME).add({
       email,
       ans1,
       ans2,
       key,
       firstname,
       lastname
     }).then(doc => {
       console.info('stored new doc id#', doc.id);
       return res.status(200).send(doc);
     }).catch(err => {
       console.error(err);
       return res.status(404).send({
         error: 'unable to store',
         err
       });
     });
 
 };
 