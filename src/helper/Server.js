import axios from "axios";
const SERVER_URL = "http://localhost:5000/api/recommendation";

export const request = async (prompt) => {
  const result = await axios.post(SERVER_URL, {
    prompt,
  });

  return result.data;
};

export const post = (product_name) => {
  return axios.post(SERVER_URL, {
    product_name,
  });
};

const main = async () => {
  const result = await request(
    "My wife left me, recommend me some verizon plans"
  );
  console.log(result);
};

main();
