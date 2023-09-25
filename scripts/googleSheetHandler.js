const googleapis=require("./../node_modules/googleapis");
const core=require("./../node_modules/@actions/core");
const github=require("./../node_modules/@actions/github");
const google=googleapis.google;

const sheets = google.sheets('v4');

async function getSubmittedData(auth, spreadsheetId, range) {
    const getResult = await sheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: 'incoming!'.concat(range)
    });
    return getResult.data.values[0];

}

try {
    const payload = github.context.payload.client_payload;
    console.log('Event payload: ', JSON.stringify(payload));

    const spreadsheetId = payload.sourceLocation.replace("gdrive:","");
    const columnRange = payload.range;
    const excelHeaderNames = payload.headerNames;

    const serviceAccountEmail = process.env.GOOGLE_SERVICEACCOUNT_EMAIL;
    const serviceAccountPrimaryKey = process.env.GOOGLE_SERVICEACCOUNT_PRIMARYKEY;

    const auth = new google.auth.JWT(
        serviceAccountEmail,
        null,
        serviceAccountPrimaryKey,
        ['https://www.googleapis.com/auth/spreadsheets']);

    async function doWork() {
        const submittedData = await getSubmittedData(auth, spreadsheetId, columnRange);
        const submittedDataObj = {};
        for (let i = 0; i < excelHeaderNames.length; i++) {
            submittedDataObj[excelHeaderNames[i]] = submittedData[i];
        }
        return submittedDataObj;
    }

    doWork()
        .then(result => {
            console.log('Invocation result: ', JSON.stringify({result}));
            core.setOutput("processing-result", JSON.stringify({result}));
        })
        .catch(err => {
            core.setFailed(err.message);
        })
} catch (error) {
    core.setFailed(error.message);
}
