/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.verifyCipher = (req, res) => {

    res.set('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', '*');
        res.set('Access-Control-Allow-Headers', '*');
        res.status(204).send('');
    }

    const text = req.body.text;
    const key = req.body.key;
    const answer = req.body.answer;

    //Reference : https://gist.github.com/EvanHahn/2587465

    // Make an output variable
    var output = "";

    // Go through each character
    for (var i = 0; i < text.length; i++) {
        // Get the character we'll be appending
        var c = text[i];

        // If it's a letter...
        if (c.match(/[a-z]/i)) {
            // Get its code
            var code = text.charCodeAt(i);

            // Uppercase letters
            if (code >= 65 && code <= 90) {
                c = String.fromCharCode(((code - 65 + key) % 26) + 65);
            }

            // Lowercase letters
            else if (code >= 97 && code <= 122) {
                c = String.fromCharCode(((code - 97 + key) % 26) + 97);
            }
        }

        // Append
        output += c;
    }

    if (output == answer)
        return res.status(200).send("success");

    return res.status(400).send("fail");

};
