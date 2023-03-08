
export function GoogleDriveAPIConnection() {
    const CLIENT_ID = 'AIzaSyDqxmzYfCBtHR2EEK45f-sMtzkAa0e6xfY';
    const API_KEY = '285393898991-r81lciffuskvkasb7gackrv946pc8dho.apps.googleusercontent.com';

    const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'

    const SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly'

    let tokenClient;
    let gapiInited = false;
    let gisInited = false;

    function gapiLoaded() {
        gapi.load('client', initializeGapClient);
    }

    async function initializeGapClient() {
        await gapi.client.init({
            apiKey: API_KEY,
            discoveryDocs: [DISCOVERY_DOC],
        });
        gapiInited = true
    }

    function gisLoaded() {
        tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: CLIENT_ID,
            scope: SCOPES,
            callback: '',
        })
        gisInited = true;
    }

    function handleAuth() {
        tokenClient.callback = async (resp) => {
            if (resp.error !== undefined) {
                throw (resp)
            }
            await listFiles();
        }

        if (gapi.client.getToken() === null) {
            tokenClient.requestAccessToken({ prompt: 'consent' })
        } else {
            tokenClient.requestAccessToken({ prompt: '' })
        }
    }

    async function listFiles() {
        let response;
        try {
            response = await gapi.client.drive.files.list({
                'pageSize': 10,
                'fields': 'files(id, name)',
            });
        } catch (err) {
            console.log('error', err);
            return;
        }

        const files = response.result.files;
        if (!files || files.length == 0) {
            console.log('no files found');
            return
        }

        const output = files.reduce(
            (str, file) => `${str}${file.name} (${file.id})\n`, 'Files:\n'
        )
        console.log(output);
    }

    handleAuth()

}