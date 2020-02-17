import axios from "axios";

const setAuthToken = token => {
  //if token is found in local storage
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token; //setting global headers if it is token
  } else {
    delete axios.defaults.headers.common["x-auth-token"]; //if not token, then delete from global headers
  }
};

export default setAuthToken;
