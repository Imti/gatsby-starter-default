const axios = require('axios');

module.exports.handler = async function(event, context, callback) {
    try {
        const { space_id } = event.queryStringParameters;

        const { CLICKUP_API_KEY = 'pk_4394648_9EBAP29G3RUJGZ4XFY7HYFFNHTYUHQ9G' } = process.env;
        const config = {
          headers: { "Authorization": CLICKUP_API_KEY }
        };
        const url = `https://api.clickup.com/api/v2/space/${space_id}/list?archived=false&include_closed=true`;
        const { data } = await axios.get(url, config);

        // console.log('get lists data', data);

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error })
          }
    }
};