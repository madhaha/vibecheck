import vrchat from 'vrchat';
import totp from 'totp-generator';
import axios from 'axios';

import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';

// username, password and hardcoded API key
const configuration = new vrchat.Configuration({
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    apiKey: 'JlE5Jldo5Jibnk5O5hTx6XVqsJu4WJ26'
});

// create a cookie jar to persist the auth headers, add the mandatory user-agent
const jar = new CookieJar();
const instance = wrapper(axios.create(
    {
        headers: {
            'User-Agent': 'vibecheck/v0.01 - https://madhaha.github.io/vibecheck/'
        },
        jar
    })
);

// add the API base URL
const AuthenticationApi = new vrchat.AuthenticationApi(configuration, 'https://api.vrchat.cloud/api/1', instance);

// start the login sequence with basic auth. this will return an auth cookie
await AuthenticationApi.getCurrentUser({
    auth: {
        username: configuration.username,
        password: configuration.password
    }
});

// send the auth cookie back with 2fa token
const token = totp(process.env.TOTP);
await AuthenticationApi.verify2FA({code: token});

const GroupsApi = new vrchat.GroupsApi(configuration);
const vibe = await GroupsApi.getGroupMembers(process.env.GRP_ID)
   
console.log('Document updated:', (new Date).toISOString(), vibe.data);

