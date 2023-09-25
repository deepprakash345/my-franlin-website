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
    // const payload = github.context.payload.client_payload;
    // console.log('Event payload: ', JSON.stringify(payload));

    // const saEmail = core.getInput('google-sa-email');
    // const saPK = core.getInput('google-sa-pk');
    // const spreadsheetId = core.getInput('google-sheet-id');
    // const columnRange = core.getInput('column-range');
    // const headerNames = core.getInput('headerNames');

    process.argv.forEach(function (val, index, array) {
        console.log(index + ': ' + val);
    });

    const payload = github.context.payload.client_payload;
    console.log('Event payload: ', JSON.stringify(payload));

    const saEmail = "franklinexcelaccount@franklingdriveproject.iam.gserviceaccount.com";
    const saPK = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCcfDuv0NgmA82D\ndavuk1xMvlhlRYI9UiHtq5EmPrzW+F6dLjaDvR17o+0LWHvY1J2PphS6/xXs8US3\nVzT+kH36nw7pBm8jp8fl5vzz+/WhU7FLwUbjqdOQ5KfXfR6VhDuoWCJsDSOw0DfE\nEN5IgisSpSNX+c6dbrx7Wy75HpF3U409FTYIgQu8CN057WiSZSjP15o+XliMdz3x\neic5hs6qlI1F3QFQndsJEZxAb5hcUpZKIcr3idYnqJgi6I4RtGEYZJkKrdtajbG/\njl8JAaYx4TxSQ7Wkw+Bd1OaIIRYZ0kxqTvlNy3prIUuPEESDx8qll/vVM3TYJeal\nuQ13+VQNAgMBAAECggEADhiUydQevGHoT9i4OZ/1lwYocUrvHfX5j26+fvr0yMqL\nv03r5DcTYlFUZ4q7cT9JyChWQrf6siLTpU5KPEooxvwv/CazuTsCYz/I9nNyX2tq\nE6Bf8d8Y6zrlsaAYMrC8LQBvbVtLpUBEXbmFRHPRTHcqtWCPz5eri9Mdapxpzx1I\nD3sKvL/zKtfQw+fxnbzHSG9QpbNtTgo0GRnZnGTW7tVqD8JZG/JoKMd+52QgRatF\nJOmotx05gVh3kRbb7NSEvoUDugmDYM7BF38TBXPgSk5dDqw5resyr4veS00sUSVC\nuA1HaxFSLByzxirY6H3PRy4A8iRxGUulN9vStaWq8wKBgQDN1PC8pAh9dJM/SemR\nDq+pLx1jCo3FBkuSiHgQXDhh4MWYSn20WjtUJsoGf0tS/nvUFqfmK9cEhpLHIcwN\nM6TJYPyex/mt5/VwIEJjrEcXi0SZR9x6/5zOoFad3BNUn9RCphpBZrLt2lzvRXDo\nBS1OdU8XPIpnoraoxXprvyAYUwKBgQDCoEXa59slzWPl5AQJOTxWniooEVC9Fwy5\nKkM2iAhxWxAo0PHEw8GvUBeubvyxsvBqpBnsZO2di8BT8JfD5m7Af6wMbYmCy8Rt\nUoj+ketU0R+q3cTyAQZYt3adhz0w4wRPZUgwravj0SWAQ4ZLJ+i+4hC7Ikf+BWBj\njybomhvWHwKBgQCy6Benn9xRT3Z9WD1P/DfrEiy03YOEcYhWgY/6iG3phXm6eWTx\n0kwnRN/s7dAG/3OaUWb2xbxLDr2doF7AStc8wrRRPvhilG/dWezave+9IywpHzEh\nJ/SgFPW0mImk0Jeqpr3DgwSbgWWuA+mzgmxy+bwZMmIK2n9yCtPxu1qmSQKBgAdk\nQOLsdVU9NLMRctnK07DSdvVomvFjg7cwlLboebGcbMOwE86ORLfcydl1G6HAEwNp\n0hY5SxD1sss9UvY8tS4YazdZnaRbCs3AGbXZYt+oxZQeshEi2tPZu+aFsVw+8vX0\n+cXngqS3V75EUkBedqdxPINu7N8H4z5EvIyO9cmvAoGAG24Te1sVx74ypHEc+jqW\nR0Kb5+DEw8O+HRw9UitUIwrnbuvQZ9L3rocg483FQuUcIOvOkmuQCGqZsSyUTo8a\n1unMprIlOVr+yog2ei/+3g9GzY57L6vmDHBIITJK1K311m9nw4+6Tio3vHgFCCT7\nU8RxylPZViuyRtIQzwy8hjQ=\n-----END PRIVATE KEY-----\n";
    // const saPK = "67d5d643c02afb3336e31b0c50b3fca4d5a78ca5";
    //const spreadsheetId = "1iS0jITNYAb5TYIOJeaTzEnw8L3oa6YvAxrgjFNIdPB4";
    //const columnRange = "A9:I9";
    // const headerNames = [
    //     "firstName",
    //     "lastName",
    //     "email",
    //     "company",
    //     "company-size",
    //     "interest-option",
    //     "phone",
    //     "subscribe",
    //     "agreement"
    // ];

    const spreadsheetId = payload.sourceLocation.replace("gdrive:","");
    const columnRange = payload.range;
    const excelHeaderNames = payload.headerNames;

    const auth = new google.auth.JWT(
        saEmail,
        null,
        saPK,
        ['https://www.googleapis.com/auth/spreadsheets']);

    async function doWork() {
        const statusCol = "";  //remove
        const msgCol = "";//remove
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
