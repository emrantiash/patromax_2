import axios from "axios";
import Network from "../network/Network";
import { useSelector } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function getHeaderFunction() {
  try {
    const encryptedToken = AsyncStorage.getItem("SECRET_KEY");
    if (!encryptedToken) {
      throw new Error("No token found in localStorage");
    }

    const headers = {
      Authorization: "token " + encryptedToken, //decryptedToken,
    };

    return headers;
  } catch (error) {
    console.error("Error getting headers:", error);
    return {}; // Return an empty object on error
  }
}

// Function for form data headers
export function getHeaderFunctionFormData() {
  // const SECRET_KEY = import.meta.env.VITE_SERVER_TOKEN_KEY;
  try {
    const encryptedToken = localStorage.getItem(SECRET_KEY);
    if (!encryptedToken) {
      throw new Error("No token found in localStorage");
    }

  } catch (error) {
    console.error("Error getting headers for form data:", error);
    return {}; // Return an empty object on error
  }
}

export function get(end) {
  const headers = getHeaderFunction();
  return axios.get(Network.network + end, { headers });
}

// custom-get

export function customget(end, data) {
  const headers = getHeaderFunction();
  Network.network + end + data, { headers };
  return axios.get(Network.network + end + data, { headers });
}

// custom-get v2
export function customgetv2(end, data) {
  const headers = getHeaderFunction();

  return axios.get(Network.network + end, { headers, params: data }); // Pass `data` as params
}

// post

export function noHeaderpost(end, data) {
  // const con = useConfig()
  // const headers = getHeaderFunction();
  console.log(Network.network + end, data);
  return axios.post(Network.network + end, data);
}

export function post(end, data) {
  const headers = getHeaderFunction();
  console.log(Network.network + end, data, { headers })
  return axios.post(Network.network + end, data, { headers });
}

export function customPost(end, data) {
  const headers = getHeaderFunctionFormData();
  return axios.post(Network.network + end, data, { headers });
}

export function tokenpost(data) {
  const headers = getHeaderFunction();
  // (Network.authToken, data);
  return axios.post(Network.authToken, data);
}

export function postDownload(end, data) {
  const headers = getHeaderFunction();
  return axios.post(Network.network + end, data, {
    headers,
    responseType: "blob",
  });
}

// custom put

export function customput(end, data) {
  const headers = getHeaderFunction();
  // (Network.network + end , data , { headers })
  return axios.put(Network.network + end, data, { headers });
}

// put

export function put(end, data) {
  const headers = getHeaderFunction();
  Network.network + end + data[0], data[1], { headers };
  return axios.put(Network.network + end + data[0], data[1], { headers });
}

// delete
export function deleteMethod(end, data) {
  const headers = getHeaderFunction();
  // (Network.network + end + data, { headers });
  return axios.delete(Network.network + end + data, { headers });
}
