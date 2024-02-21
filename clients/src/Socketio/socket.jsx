// dependencies
import { io } from "socket.io-client";
// variables
// export const socket = io("https://a62cd8cb-6249-47ab-8ce2-89e6d92956a3-00-2so2id1sckb1k.picard.replit.dev", {

// });
export const socket = io("https://things-we-like-api.vercel.app", {
  transports: [ "websocket" ],
  withCredentials: true
});
