import axios from "axios";

const pinataApiKey = process.env.PINATA_API_KEY;
const pinataSecretKey = process.env.PINATA_SECRET_KEY;

export const pinJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  const response = await axios.post(url, JSONBody, {
    headers: {
      "Content-Type": "application/json",
      pinata_api_key: pinataApiKey,
      pinata_secret_api_key: pinataSecretKey,
    },
  });
  return response.data.IpfsHash;
};

export const retrieveFromIPFS = async (hash) => {
  const url = `https://gateway.pinata.cloud/ipfs/${hash}`;
  const response = await axios.get(url);
  return response.data;
};
