import axios from 'axios';

export default async function handler(req, res) {
  let response = await axios.get("https://api.f2pool.com/bitcoin/alcotecmain", {
    headers: {
      'Content-Type': 'application/json',
      'F2P-API-SECRET': '9mqs6m2f5wya00su1735kxhwhyqy6p7kbn49qlr3fiw3xs5jqn7miabw5ra7vujq'
    }
  });
  let content = response.data;
  res.json(content);
}
