// const BaseUrl = "http://10.16.98.192:9090";
const BaseUrl = "http://localhost:8080";
const UrlMap = [
  {
    description: "用户登录", // 用到，成功
    method: "login",
    url: "/user/login",
    type: "POST",
  },
];
const API = {};
UrlMap.forEach((item) => {
  if (API[item.method]) {
    console.log(`存在相同方法：${item.method}`);
  }
  API[item.method] = function (data) {
    // data是请求参数
    let url = BaseUrl + item.url;
    let option = {
      method: item.type, // 请求方式
      headers: {
        "Content-Type": "application/json",
        "withCredentials": true,
      },
      mode:"cors"
    };
    option.headers = {
        "Content-Type": "application/json",
        "withCredentials": true,
      };
    if (item.type !== "POST") {
      let body = Object.keys(data || {})
        .map((key) => key + "=" + data[key])
        .join("&");
      // 如果不是POST请求，则将参数拼接在url中，以?连接。
      url = `${url}?${body}`;
    } else {
      option.body = JSON.stringify(data);
    }
    console.log(option);
    console.log(typeof(option.body));
    return fetch(url, option).then((res) => res.json());
  };
});
export default API;
