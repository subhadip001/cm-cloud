import useSWR from "swr";
import axiosClient from "@/utils/axiosConfig";
import axiosGoogleClient from "@/utils/axiosGoogle";

const useApiData = (url, requestType, clientType, body) => {
  const { data, error, isLoading } = useSWR(url, async (url) => {
    if (requestType === "get" && clientType === "userdb") {
      const response = await axiosClient.get(url);
      return response.data;
    } else if (requestType === "post" && clientType === "userdb") {
      const response = await axiosClient.post(url, body);
      return response.data;
    } else if (requestType === "get" && clientType === "google") {
      const response = await axiosGoogleClient.post(url, body);
      return response.data;
    } else if (requestType === "post" && clientType === "google") {
      const response = await axiosGoogleClient.post(url, body);
      return response.data;
    }
  });
  return { data, error, isLoading };
};

export default useApiData;
