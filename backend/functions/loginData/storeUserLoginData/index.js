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
 
 exports.storeUserData = async (req, res) => {
 
     res.set('Access-Control-Allow-Origin', '*');
     
     if (req.method === 'OPTIONS') {
         // Send response to OPTIONS requests
         res.set('Access-Control-Allow-Methods', '*');
         res.set('Access-Control-Allow-Headers', '*');
         res.status(204).send('');
     }
     console.log(req.body)
     
     const loginTime = (new Date()).toString();
     const email =  req.body.email
 
     // .add() will automatically assign an ID
     return firestore.collection(COLLECTION_NAME).add({
       loginTime,
       email
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
 