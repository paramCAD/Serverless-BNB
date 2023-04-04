import React, { useEffect } from "react";
import LexChat from "react-lex-plus";
import AWS from 'aws-sdk';
import * as AWSLEX from "@aws-sdk/client-lex-runtime-v2";
import production from '../../constants/production.js';
import { TextField } from '@mui/material';
// const client = new AWS.LexRuntimeV2({ region: "us-east-1" });
// const lexRuntime = new AWS.LexRuntime({ region: 'us-east-1' });
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { getCurrentUser } from "../UserAuthentication/service";
const IntegrateLex = () => {
    // console.log("production.accessKeyId: ",production.accessKeyId);
    const user = getCurrentUser();
    const [reviewDescription, setReviewDescription] = React.useState('');
    const [chatButtonDisabled, setChatButtonDisabled] = React.useState(false);
    const [chathistory,setChatHistory] = React.useState([]);
    const [formValues, setFormValues] = React.useState({
        botText: "",
    });
    
    const callLex = async () => {
        let lexAccessKeyId = process.env[`REACT_APP_SERVER_LEX_ACCESS_KEY_ID`];
        let lexSecretAccessKey = process.env['REACT_APP_SERVER_LEX_SECRET_ACCESS_KEY'];
        let lexSessionToken = process.env['REACT_APP_SERVER_LEX_SESSION_TOKEN'];
        console.log("user && user.username",user && user.username);
        console.log("lexAccessKeyId: ",lexAccessKeyId);
        // console.log("lexSecretAccessKey: ",lexSecretAccessKey);
        // console.log("lexSessionToken: ",lexSessionToken);
        // console.log("process.env['LEX_ACCESS_KEY_ID']",process.env['LEX_ACCESS_KEY_ID']);
        let chathistoryRef = chathistory
        let userTextObj = {
            "type": "userText",
            "text": formValues.botText
        }
        chathistoryRef.push(userTextObj);
        setChatHistory()
        setChatButtonDisabled(true);
        // console.log("LEX");
        AWS.config.update({
            region: 'us-east-1',
            accessKeyId : lexAccessKeyId,
            secretAccessKey : lexSecretAccessKey,
            sessionToken : lexSessionToken,
        })

        const client = new AWS.LexRuntimeV2({ region: "us-east-1" });
        
        const botParams = {
            botId: "8CJGZHLZCS",
            botAliasId: "TSTALIASID",
            localeId: "en_US",
            text: formValues.botText,
            sessionId: user && user.username || "NotLoggedInUser",
        }

        try{
            const data = await client.recognizeText(botParams).promise();
            // console.log("Data",data);
            // console.log("Navigeate: ",data.sessionState.intent.name);
            let intentName = data.sessionState.intent.name
            
            let message = data && data.messages[0] && data.messages[0].content;
            
            let chatBotTextObj = {
                "type": "chatbot",
                "text": message,
            }
            chathistoryRef.push(chatBotTextObj);
            if(intentName == "NavigateWebsite"){
                let messageLowerCase = message.toLowerCase();
                if(messageLowerCase.includes("kitchen")){
                    window.location.href = "/food";
                    // window.location.href("/kitchen");
                } else if (messageLowerCase.includes("hotel") || messageLowerCase.includes("room")){
                    // window.location.href("/hotel");
                    window.location.href = "/hotel";
                } else if(messageLowerCase.includes("tour")){
                    // window.location.href("/tour");
                    // window.location.href = "/tour";
                }
            }
            setChatHistory(chathistoryRef);
            setFormValues({botText: ""});
            setChatButtonDisabled(false);
        } catch(e){
            console.log("Line 31--",e);
            setChatButtonDisabled(false);
        }
        
    }
    // userId & userName will be coming from cookie
    //  Inputstream will be what user typed.

   


    const handleInputChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    };
  return (
   <div>
    <Card variant="outlined" className="chatbot-width chatbot-position">
      <CardContent>
      <h5>Chat with us</h5>
      {chathistory && chathistory.map(function(item, index){
       
        return(
            <div>
                {item.type == "userText" ? (
                <div className="w-230 align-right" key={`key-${index}`}  sx={{ flexDirection: 'row-reverse' }} >
                    <div className="user-text-bg">
                        {item.text}
                    </div>
                </div>
                ) : (
                    <div className="w-230 " key={`key-${index}`} >
                        <div className="chatbot-text-bg">
                            {item.text}
                        </div>
                    </div>
                )}
            </div>
        )
    })}

    
        <div>
            <TextField
                name="botText"
                label="chat with us"
                className="w-100"
                margin="normal"
                value={formValues.botText}
                onChange={handleInputChange}
                inputProps={{
                    maxLength: 100,
                }}
            />
                <button onClick={callLex} disabled={false} className="margin-top-30">
                    SUBMIT
                </button>
            
        </div>
      </CardContent>
    </Card>
    
    
   </div>
  );
};

export default IntegrateLex;


// AWS.config.update({
    //     region: 'us-east-1',
    //     accessKeyId : "ASIAS3TXGX5XMPZI6TFU",
    //     secretAccessKey : "NxNrASkBTkn6OPcHxdxjSe0tO/eOkceFfcv8qeRI",
    //     sessionToken : "FwoGZXIvYXdzEID//////////wEaDEk9YhnD7h+A7SGy5CLAAR+HF91XVyu/p0DhKDSlUOMcY0UwGttZu5n95iUDXRUnUMpqLgh3OZPjVDArjFaPy50aVdZp2VlQFK/QWv8FMZ4io5BujwBg8VEsK5cjUsQjynArUZh3wS/+HXpTYlAHdAppF9TzKT0Bv8i1oLU8OxRCpxm0wZ34ZDvroJ0gyrIqCLHw1+gCjRmS1N6aM60gsocWWHaf3AKYVUBu2IomNBy8NX9vyU+CaEtl9rOyZM92nOwR7G1KUt/KSGla+Wr0RyjQ7sWWBjItZT/u6BV1V3bfyeXinfqj5Id1nBzovI9Jt+BsZjPIEsvyR4AEeJnAeziuZYzc"
    // })

    // AWS.config.loadFromPath('../../constants/credentials.json');
   

    // botAlias: "TestBotAlias",
    // botName: "serverless-project",
    // contentType: 'text/plain; charset=utf-8',
    // inputStream: "Hi",
    // userId: "1",
    // sessionAttributes: {
    //     userName: "1"
    // }
