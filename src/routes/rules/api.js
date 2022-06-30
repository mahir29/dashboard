import { contextPath, URL } from "../../utils/config";

const path = contextPath["rule-controller"];

const HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const fetchRulesApi = () => {
  return new Promise(function (resolve, reject) {
    console.log("inside fetch api");
    const url = URL + path + "rule/all";
    const options = {
      method: "GET",
      headers: HEADERS,
    };
    fetch(url, options)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => console.log(error));
  });
};

export const updateRuleApi = ({ id, data }) => {
  return new Promise(function (resolve, reject) {
    console.log("inside update api");
    const url = URL + path + `${id}`;
    const options = {
      method: "PUT",
      headers: HEADERS,
      body: JSON.stringify(data),
    };
    fetch(url, options)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => console.log(error));
  });
};

export const addRuleApi = (data) => {
  return new Promise(function (resolve, reject) {
    console.log("inside add api");
    const url = URL + path;
    const options = {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(data),
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

export const searchRulesApi = ({ merchant, method }) => {
  return new Promise(function (resolve, reject) {
    console.log("inside search api");
    const url = URL + path + `category?merchant=${merchant}&method=${method}`;
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

export const deleteRuleApi = (id) => {
  return new Promise(function (resolve, reject) {
    console.log("inside delete api");
    const url = URL + path + `${id}`;
    const options = {
      method: "DELETE",
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

export const changeOrderApi = (data) => {
  return new Promise(function (resolve, reject) {
    console.log("inside update api");
    const url = URL + path + "priority";
    const options = {
      method: "PUT",
      headers: HEADERS,
      body: JSON.stringify(data),
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

export const changeActivityApi = ({ id, activity }) => {
  return new Promise(function (resolve, reject) {
    console.log("inside activityapi");
    const url = URL + path + `activity/${id}?activity=${activity}`;
    const options = {
      method: "PUT",
      headers: HEADERS,
    };
    fetch(url, options)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => console.log(error));
  });
};

export const inactiveRulesApi = ({ merchant, method }) => {
  return new Promise(function (resolve, reject) {
    console.log("inside inactive api");
    const url = URL + path + `inactive?merchant=${merchant}&method=${method}`;
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
