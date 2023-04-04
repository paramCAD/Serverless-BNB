const { default: axios } = require("axios")

exports.handler = async (event) => {
    
    let pass = true;
    // Test QnA Cloud Function
    try {
        const url = "https://us-central1-serverlessproj.cloudfunctions.net/CheckQnA";
        const email = "parampal1196@gmail.com";
        const response = await axios.post(url, { email: email, ans1: "ronaldo", ans2: "pasta" });
        if (response.data === 'success') {
            console.log("Test QnA function passed");
        }
        else {
            pass = false;
            console.log("Test QnA function failed");
        }
    }
    catch (err) {
        pass = false;
        console.log("Test QnA function failed");
    }

    // Test Caesar Cipher Challenge Text Creation Cloud Function.
    try {
        const url = "https://us-central1-serverlessproj.cloudfunctions.net/getRandomStringAndUserKey";
        const email = "parampal1196@gmail.com";
        const response = await axios.post(url, { email: email });
        if(response.data === "fail")
        {
            pass = false;
            console.log("Test Caesar Cipher Challenge Text Creation function failed");
        }
        else
        {
            console.log("Test Caesar Cipher Challenge Text Creation function passed. Challenge word:" + response.data.word);
        }
    }
    catch (err) {
        pass = false;
        console.log("Test Caesar Cipher Challenge Text Creation function failed");
    }

    // Test Caesar Cipher Challenge Text Answer Checker Cloud Function.
    try {
        const url = "https://us-central1-serverlessproj.cloudfunctions.net/VerifyCipher";
        const response = await axios.post(url, { text: "abcd", key: 7, answer: "hijk" });
        if (response.data === 'success') {
            console.log("Test Caesar Cipher Challenge Text Answer Checker Cloud Function passed");
        }
        else {
            pass = false;
            console.log("Test Caesar Cipher Challenge Text Answer Checker Cloud Function failed");
        }
    }
    catch (err) {
        pass = false;
        console.log("Test Caesar Cipher Challenge Text Answer Checker Cloud Function failed");
    }
    
    return pass;
}