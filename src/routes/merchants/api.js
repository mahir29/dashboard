import { contextPath, URL } from "../../utils/config";

const path = contextPath["merchant-controller"];

const HEADERS = {
  Accept: "application/json",
};

export const fetchMerchantsApi = () => {
  return new Promise(function (resolve, reject) {
    const url = URL + path + "all";
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
