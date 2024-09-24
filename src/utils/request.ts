import axios from "axios";

// Setting a base URL for all requests
axios.defaults.baseURL = import.meta.env.VITE_API_BACKEND_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";

interface RequestProps {
  method: "GET" | "POST" | "PATCH" | "DELETE";
  url: string;
  data?: object;
  auth?: boolean;
  responseType?: "blob" | "json"; // Allow specifying responseType
}

const request = async ({
  method,
  url,
  data,
  auth,
  responseType = "json",
}: RequestProps) => {
  try {
    // Prepare the headers based on whether auth is true
    const headers = auth
      ? {
          Authorization: "Bearer " + localStorage.getItem("axios_token"),
        }
      : {};

    // Make the request with the appropriate headers and response type
    const response = await axios({
      method: method,
      url: url,
      headers: headers,
      data: data,
      responseType: responseType,
    });

    return response;
  } catch (error) {
    // Handle the error based on your application's requirements
    console.error("Request failed:", error);
    throw error;
  }
};

export default request;
