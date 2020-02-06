const axios = require('axios');

module.exports.handler = async function(event, context, callback) {
  const { user } = context.clientContext;

  try {
    const company = user.email.split('@')[1];

    const companyToTeamId = {
      'scopeinc.com': '2303362'
    };

    const { CLICKUP_API_KEY = 'pk_4394648_9EBAP29G3RUJGZ4XFY7HYFFNHTYUHQ9G' } = process.env;

    const config = {
      headers: { "Authorization": CLICKUP_API_KEY }
    };
    const teamId = companyToTeamId[company];
    const url = `https://api.clickup.com/api/v2/team/${teamId}/space?archived=false`
    const { data } = await axios.get(url, config);

    // console.log('get spaces data', data);

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error })
    }
  }
}