import {Text, AppRegistry} from 'react-native';
import Pusher from "pusher-js/react-native";
//import Pusher from 'pusher-js' no es compatible con react native  ya que react native no tiene elementos html DOM
import Echo from 'laravel-echo'

const connectToWebSocket = async () => {
    
      try {
        const ws = new Echo({
          broadcaster: "pusher",
          Pusher, // sets the instance imported above

          // Tweak the options according to your settings
          key: "app-key", // set the key defined in your .env
          wsHost: "192.168.1.4", // the host defined in your .env
          wssHost: "192.168.1.4", // the host defined in your .env
          wsPort: 6001, // or the port defined in your .env
          wssPort: 6001, // or the port defined in your .env
          forceTLS: false,
          encrypted: false,
          cluster: "mt1",
          enabledTransports: ["ws", "wss"],
        });

        console.log(ws);
        const channel = ws.channel('test-event');
        channel.subscribed( () => {
          console.log('subscribed');
      
      }).listen('.test-event', (e) => {
         console.log("Escuchando Evento :",e);
      });
      } catch (error) {
        console.log("error", error);
      }
    };

    // Llama a la función para conectarte al servidor WebSocket local
    connectToWebSocket();
