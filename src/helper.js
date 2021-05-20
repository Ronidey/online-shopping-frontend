

export const queryToObj = (query) => {
  const queryArr = query.slice(1).split('&');
  const obj = {};

  queryArr.forEach((q) => {
    const [prop, value] = q.split('=');
    obj[prop] = value;
  });

  return obj;
};

export function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}