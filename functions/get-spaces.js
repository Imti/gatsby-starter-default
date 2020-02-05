const axios = require('axios');

module.exports.handler = async function(event, context, callback) {
  try {
    const { CLICKUP_API_KEY = 'pk_4394648_9EBAP29G3RUJGZ4XFY7HYFFNHTYUHQ9G' } = process.env;

    const config = {
      headers: { "Authorization": CLICKUP_API_KEY }
    }
    const teamId = '2303362';
    const url = `https://api.clickup.com/api/v2/team/${teamId}/space?archived=false`
    const { data } = await axios.get(url, config);

    console.log('data', data);

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: error.response.status,
      body: JSON.stringify({ error })
    }
  }
}