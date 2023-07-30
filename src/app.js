const vrchat = require('vrchat');
const totp = require('totp-generator');

const configuration = new vrchat.Configuration({
    username: process.env.USERNAME,
    password: process.env.PASSWORD
});

const AuthenticationApi = new vrchat.AuthenticationApi(configuration);

AuthenticationApi.getCurrentUser().then(resp => {
    const currentUser = resp.data;
    console.log('Document updated:', (new Date).toISOString(), currentUser);
})

// const token = totp(process.env.TOTP);

// AuthenticationApi.verify2FA({code: token}).then(() => {
//     const GroupsApi = new vrchat.GroupsApi(configuration);
//     GroupsApi.getGroupMembers(process.env.GRP_ID).then(res => {
//         console.log('Document updated:', (new Date).toISOString(), res);
//     })
// });