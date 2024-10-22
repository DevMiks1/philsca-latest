/** @format */

import axios from "axios";

const globalUrl = process.env.REACT_APP_GLOBAL_URL;
const authToken = process.env.REACT_APP_X_AUTH_TOKEN;

console.log("Global URL:", globalUrl); // Log the global URL
console.log("Auth Token:", authToken);

const headers = {
  "Content-Type": "application/json",
  "x-auth-token": authToken,
};

export const auth = async () => {
  try {
    const response = await axios.get(
      `${globalUrl}/philsca/auth`,

      { headers, withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error authentication:", error);
    throw error;
  }
};
