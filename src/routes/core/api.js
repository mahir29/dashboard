import { URL, contextPath } from "../../utils/config";

const path = contextPath["core-controller"];

const HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const fetchMethodsApi = (merchant) => {
  return new Promise(function (resolve, reject) {
    const url = URL + path + `pspMerchantMethodsForNbMerchant/${merchant}`;
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

export const fetchCardNetworkApi = () => {
  return new Promise(function (resolve, reject) {
    const url = URL + path + "cardNetworks/all";
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

export const fetchIssuerBankApi = () => {
  return new Promise(function (resolve, reject) {
    const url = URL + path + "issuerBanks/all";
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
