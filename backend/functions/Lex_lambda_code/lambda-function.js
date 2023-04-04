const axios = require('axios').default;

exports.handler = async (event) => {
    // TODO implement
    
    
    
    console.log("------------------------------------------:  ");
    console.log("event:  ",event);
    console.log("------------------------------------------:  ");
    console.log("----*****************************8:  ");
    console.log("state: ",event.sessionState.intent.slots);
    
    let intent = event.sessionState.intent.name;
    console.log("intent: ----------",intent);
    
    
    if(event.sessionId == "NotLoggedInUser"){
        if(intent == "RoomBooking"){
         let response2 = {
                  "sessionState": {
                    "dialogAction": {
                      "type": "Close",
                    },
                     "intent": {
                        "confirmationState": "Confirmed",
                        "name": intent,
                        "state": "Fulfilled",
                        
                      },
                    "sessionAttributes": {
                      "string": event.sessionAttributes,
                      }, 
                  },
                  "messages": [
                      {
                        "contentType": "PlainText",
                        "content": "Your need to login to book a room.",
                        
                      }
                  ]
                }
         return response2;
        } else if(intent == "OrderFood"){
          let response2 = {
                  "sessionState": {
                    "dialogAction": {
                      "type": "Close",
                    },
                     "intent": {
                        "confirmationState": "Confirmed",
                        "name": intent,
                        "state": "Fulfilled",
                        
                      },
                    "sessionAttributes": {
                      "string": event.sessionAttributes,
                      }, 
                  },
                  "messages": [
                      {
                        "contentType": "PlainText",
                        "content": "Your need to login to order food.",
                        
                      }
                  ]
                }
         return response2;
        }
    }
  
    
    if(intent == "RoomBooking"){
        console.log("Hotel_name", event.sessionState.intent.slots.hotels.value.originalValue)
        
        
  
        
        let endDate = event.sessionState.intent.slots.end_date.value.interpretedValue;
        let startDate = event.sessionState.intent.slots.start_date.value.interpretedValue;
        let roomTypeSelected = event.sessionState.intent.slots.RoomTypes.value.interpretedValue;
        let userInputhotelId = event.sessionState.intent.slots.hotels.value.interpretedValue;
        
        let hotelID = "e3ca46f9-7574-4adc-ab90-b2f1a7a6ed4b";
        
        if(userInputhotelId == '1'){
          hotelID = "e3ca46f9-7574-4adc-ab90-b2f1a7a6ed4b";
        } else if(userInputhotelId == '2'){
           hotelID = "034e820c-f937-499e-a005-7b81485d0e39";
        }else if(userInputhotelId == '3'){
           hotelID = "bc4c5ff5-40e7-4e13-91a0-4295a4ce0a69";
        }else if(userInputhotelId == '4') {
          hotelID = "58a627-3738-4e8b-9a93-c4731bae8744";
        }
        // barrington -  034e820c-f937-499e-a005-7b81485d0e39 
        // Muir Autograph Collection - bc4c5ff5-40e7-4e13-91a0-4295a4ce0a69 
        //  Hampton Hill - 58a627-3738-4e8b-9a93-c4731bae8744 
        let roomSelectedId;
        
        console.log("endDate",endDate);
        console.log("typeof endDate",typeof endDate);
        console.log("startDate",startDate);
        console.log("roomTypeSelected",roomTypeSelected);
        let newEndDate = new Date(endDate);
        let timestampEndDate = newEndDate.getTime();
        let newStartDate = new Date(startDate);
        let timestampStartDate = newStartDate.getTime();
        
        console.log("timestampEndDate: ",timestampEndDate);
        console.log("timestampStartDate: ",timestampStartDate);
        if(roomTypeSelected == "quad"){
          roomSelectedId = "fbf78614-8b50-4422-9d1e-b9d9a60ea46";
        } else if (roomTypeSelected == "double"){
          roomSelectedId = "ada73f9e-9d04-41f3-8379-5ef24b00e22d";
        } else if (roomTypeSelected == "studio"){
           roomSelectedId = "7363523a-dadd-4587-825f-9e49f9464ea4";
        } else if(roomTypeSelected == "single") {
           roomSelectedId = "191516d4-1dcf-4556-b7f7-7dd69702c511";
        }
        
       const response = await handleBookRoom(hotelID,roomSelectedId,timestampStartDate,timestampEndDate);
        console.log("Reponse: ",response);
        
        if(response.status == "200" || response.status == 200){
          let response2 = {
                  "sessionState": {
                    "dialogAction": {
                      "type": "Close",
                    },
                     "intent": {
                        "confirmationState": "Confirmed",
                        "name": intent,
                        "state": "Fulfilled",
                        
                      },
                    "sessionAttributes": {
                      "string": event.sessionAttributes,
                      }, 
                  },
                  "messages": [
                      {
                        "contentType": "PlainText",
                        "content": "Your room was booked successfully.",
                        
                      }
                  ]
                }
           return response2;
        } else {
          let response2 = {
                  "sessionState": {
                    "dialogAction": {
                      "type": "Close",
                    },
                     "intent": {
                        "confirmationState": "Confirmed",
                        "name": intent,
                        "state": "Fulfilled",
                        
                      },
                    "sessionAttributes": {
                      "string": event.sessionAttributes,
                      }, 
                  },
                  "messages": [
                      {
                        "contentType": "PlainText",
                        "content": "An error occurred. Please try later",
                        
                      }
                  ]
                }
           return response2;
        }
        
                
       
    } else if(intent == "OrderFood"){
        let userFoodItem = event.inputTranscript;
        const response = await handleOrderFood(userFoodItem);
        console.log("-------------------------");
        console.log("response: ",response);
        if(response.status == 201){
            let response2 = {
                  "sessionState": {
                    "dialogAction": {
                      "type": "Close",
                    },
                     "intent": {
                        "confirmationState": "Confirmed",
                        "name": intent,
                        "state": "Fulfilled",
                        
                      },
                    "sessionAttributes": {
                      "string": event.sessionAttributes,
                      }, 
                  },
                  "messages": [
                      {
                        "contentType": "PlainText",
                        "content": "Request process successfully. Food is being prepared.",
                        
                      }
                  ]
                }
                
            return response2;
        } else {
          let response2 = {
                  "sessionState": {
                    "dialogAction": {
                      "type": "Close",
                    },
                     "intent": {
                        "confirmationState": "Confirmed",
                        "name": intent,
                        "state": "Failed",
                        
                      },
                    "sessionAttributes": {
                      "string": event.sessionAttributes,
                      }, 
                  },
                  "messages": [
                      {
                        "contentType": "PlainText",
                        "content": "A problem occurred while taking the order. Please try after a while.",
                        
                      }
                  ]
                }
                
            return response2;
        }
    
      
    } else if(intent == "NavigateWebsite"){
       let inputText = event.inputTranscript;
       inputText = inputText.toLowerCase();
       if(inputText.includes("hotel") ||  inputText.includes("room")){
          let response2 = {
                  "returnURL": "true",
                  "sessionState": {
                    "dialogAction": {
                      "type": "Close",
                    },
                     "intent": {
                        "confirmationState": "Confirmed",
                        "name": intent,
                        "state": "Fulfilled",
                        
                      },
                    "sessionAttributes": {
                      "string": event.sessionAttributes,
                      }, 
                  },
                  "messages": [
                      {
                        "contentType": "PlainText",
                        "content": "You will be directed to Hotels",
                        
                      }
                  ]
                }
          return response2;   
       } else if (inputText.includes("kitchen") || inputText.includes("food") ){
          let response2 = {
                  "sessionState": {
                    "returnURL": "true",
                    "dialogAction": {
                      "type": "Close",
                    },
                     "intent": {
                        "confirmationState": "Confirmed",
                        "name": intent,
                        "state": "Fulfilled",
                        
                      },
                    "sessionAttributes": {
                      "string": event.sessionAttributes,
                      }, 
                  },
                  "messages": [
                      {
                        "contentType": "PlainText",
                        "content": "You will be directed to Kitchen",
                        
                      }
                  ]
                }
          return response2; 
       } else if (inputText.includes("tour") ){
          let response2 = {
                  "sessionState": {
                    "returnURL": "true",
                    "dialogAction": {
                      "type": "Close",
                    },
                     "intent": {
                        "confirmationState": "Confirmed",
                        "name": intent,
                        "state": "Fulfilled",
                        
                      },
                    "sessionAttributes": {
                      "string": event.sessionAttributes,
                      }, 
                  },
                  "messages": [
                      {
                        "contentType": "PlainText",
                        "content": "You will be directed to Tour",
                        
                      }
                  ]
                }
          return response2; 
       }
    
    
    } else if(intent == "RoomAvailability"){
      console.log("event: ",event.sessionState.intent);
      console.log("event: slots ============----------- ",event.sessionState.intent.slots);
       
       let userInputhotelId = event.sessionState.intent.slots.hotels.value.interpretedValue;
       let endDate = event.sessionState.intent.slots.end_date.value.interpretedValue;
       let startDate = event.sessionState.intent.slots.start_date.value.interpretedValue;
       
        let hotelID = "e3ca46f9-7574-4adc-ab90-b2f1a7a6ed4b";
        
        if(userInputhotelId == '1'){
          hotelID = "e3ca46f9-7574-4adc-ab90-b2f1a7a6ed4b";
        } else if(userInputhotelId == '2'){
           hotelID = "034e820c-f937-499e-a005-7b81485d0e39 ";
        }else if(userInputhotelId == '3'){
           hotelID = "bc4c5ff5-40e7-4e13-91a0-4295a4ce0a69";
        }else if(userInputhotelId == '4') {
          hotelID = "58a627-3738-4e8b-9a93-c4731bae8744";
        }
        
        
        let newEndDate = new Date(endDate);
        let timestampEndDate = newEndDate.getTime();
        let newStartDate = new Date(startDate);
        let timestampStartDate = newStartDate.getTime();
        
       const response = await handleCheckAvailability(hotelID,timestampStartDate,timestampEndDate);
       console.log("################################################");
       console.log("response",response);
       
       console.log("response data: ",response.data)
       console.log("response data.data: ",response.data.data);
       
       let dataArray = response.data.data;
       let str = "";
       dataArray.map(function(item){
         str = str + item.type + " room available for a price of " + item.price + "." + "\n";
       })
       console.log("str: ==========================",str);
       let response2 = {
                  "sessionState": {
                    "dialogAction": {
                      "type": "Close",
                    },
                     "intent": {
                        "confirmationState": "Confirmed",
                        "name": intent,
                        "state": "Fulfilled",
                        
                      },
                    "sessionAttributes": {
                      "string": event.sessionAttributes,
                      }, 
                  },
                  "messages": [
                      {
                        "contentType": "PlainText",
                        "content": str,
                        
                      }
                  ]
                }
         return response2;
    }
    // response.dialogAction.fulfillmentState = "Fulfilled";
    // response.dialogAction.message.content = "Request processed successfully";
    
    
    // response = {
    //     statusCode: 200,
    //     body: JSON.stringify('Hello from Lambda!'),
    // };
    
    async function handleCheckAvailability(hotelID,startDate,endDate) {
      let urlString = "https://hotel-management-23ybv9oa.uc.gateway.dev/hotel/"+hotelID+"/rooms?end_date="+endDate+"&start_date="+startDate
      const response = axios.get(urlString);
      
      return response;
    }
    
    
   async function handleBookRoom(hotelID,roomSelectedId,startDate,endDate) {
        
        // https://hotel-management-23ybv9oa.uc.gateway.dev/hotel/e3ca46f9-7574-4adc-ab90-b2f1a7a6ed4b/rooms/191516d4-1dcf-4556-b7f7-7dd69702c511/booking
        let urlString = "https://hotel-management-23ybv9oa.uc.gateway.dev/hotel/" + hotelID +"/rooms/" + roomSelectedId + "/booking";
        console.log("url: ",urlString);
        
        const roomBookingDetails = {
          'start_date': startDate,
          'end_date': endDate,
          'user_id': event.sessionId
        }
        const res = await axios.post(urlString, roomBookingDetails, {headers: {'Content-Type':'application/json'}} )
        console.log("res: ",res);
        console.log("=================================");
        return res;
    }
    
    async function handleOrderFood(foodItem) {
       
        let foodItemsArray = [];
        foodItemsArray.push(foodItem);
        const my_order = {
          'dishes': foodItemsArray,
          'user_id': event.sessionId
        }
    

        const res = await axios.post(`https://us-central1-serverless-bnb.cloudfunctions.net/orderFood`, {my_order}, {headers: {'Content-Type':'application/json'}} )
        console.log("res: ",res);
        console.log("=================================");
        return res;

    }
};


