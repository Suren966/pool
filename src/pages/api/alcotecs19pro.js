import axios from 'axios';

export default async function handler(req, res) {
  let response = await axios.get("https://api.f2pool.com/bitcoin/alcotecs19pro", {
    headers: {
      'Content-Type': 'application/json',
      'F2P-API-SECRET': 'x2ed1b9nyamuix4rwfxfz10raed1h7u6ysvp3ygw1pg1n6ps4ia6h0v4ep8ehw6h'
    }
  });
  let content = response.data;
  res.json(content);
}
