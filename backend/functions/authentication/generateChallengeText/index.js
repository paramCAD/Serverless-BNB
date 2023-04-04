/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

 const Firestore = require('@google-cloud/firestore');

 const PROJECTID = 'serverlessproj';
 const COLLECTION_NAME = 'Users';
 
 const firestore = new Firestore({
     projectId: PROJECTID,
     timestampsInSnapshots: true
 });
 
 exports.getChallengeStringAndUserUniqueKey = async (req, res) => {
 
     res.set('Access-Control-Allow-Origin', '*');
 
     if (req.method === 'OPTIONS') {
         // Send response to OPTIONS requests
         res.set('Access-Control-Allow-Methods', '*');
         res.set('Access-Control-Allow-Headers', '*');
         res.status(204).send('');
     }
 
     const chars =
         "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
     const randomArray = Array.from(
         { length: 4 },
         (v, k) => chars[Math.floor(Math.random() * chars.length)]
     );
 
     const randomString = randomArray.join("");
     console.log(randomString);
 
     // Create a reference to the Users collection
     const usersRef = firestore.collection(COLLECTION_NAME);
 
     // Create a query against the collection
     const queryRef = await usersRef.where('email', '==', req.body.email).get();
 
     if (queryRef.empty) {
         res.status(400).send("fail");
         return;
     }
 
     queryRef.forEach(doc => {
         if (doc.data().email === req.body.email) {
             var data = {
                 word: randomString,
                 key: (doc.data().key),
                 firstname: (doc.data().firstname),
                 lastname: (doc.data().lastname)
             }
 
             res.status(200).send(JSON.stringify(data));
             console.log(doc.id, '=>', doc.data());
             return;
         }
     });
 
     res.status(400).send("fail");
     return;
 
 };
 