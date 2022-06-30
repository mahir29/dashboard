import { contextPath, URL } from "../../utils/config";

const path = contextPath["psp-controller"];

const HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const fetchPSPMerchantMethodsApi = () => {
  return new Promise(function (resolve, reject) {
    const url = URL + path + "methods/all";
    const options = {
      method: "GET",
      headers: HEADERS,
    };
    fetch(url, options)
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => console.log(error));
  });
};
