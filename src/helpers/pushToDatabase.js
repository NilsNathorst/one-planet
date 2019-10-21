import { database } from "../database/firebase.js";

const pushToDatabase = (payload, endpoint) => {
  database
    .ref()
    .child(endpoint)
    .set(payload);
};

export default pushToDatabase;
