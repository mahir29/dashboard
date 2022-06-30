import { contextPath, URL } from "../../utils/config";

const path = contextPath["psp-controller"];
const path2 = contextPath["core-controller"];

const HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const fetchPSPMerchantsApi = () => {
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

export const fetchPSPMerchantsWithIdApi = (merchant) => {
  return new Promise(function (resolve, reject) {
    const url = URL + path2 + `pspMerchantsForNbMerchant/${merchant}`;
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
