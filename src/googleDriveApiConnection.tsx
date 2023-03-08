import { gapi } from "gapi-script";
import { useState } from "react";

export function GoogleDriveAPIConnection() {
  const [documents, setDocuments] = useState();
  const [signedInUser, setSignedInUser] = useState();
  const [isLoadingGoogleDriveApi, setIsLoadingGoogleDriveApi] =
    useState<boolean>();
  const [isFetchingGoogleDriveFiles, setIsFetchingGoogleDriveFiles] =
    useState<boolean>();

  const [listDocumentsVisibility, setListDocumentsVisibility] =
    useState<boolean>();

  const API_KEY = "AIzaSyDqxmzYfCBtHR2EEK45f-sMtzkAa0e6xfY";
  const CLIENT_ID =
    "285393898991-r81lciffuskvkasb7gackrv946pc8dho.apps.googleusercontent.com";
  const DISCOVERY_DOC =
    "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest";
  const SCOPES = "https://www.googleapis.com/auth/drive.metadata.readonly";

  function gapiLoaded() {
    gapi.load("client", initializeGapiClient);
  }

  async function initializeGapiClient() {
    await gapi.client
      .init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
      })
      .then(
        function () {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        },
        function (error: any) {}
      );
  }
  const updateSigninStatus = (isSignedIn: any) => {
    if (isSignedIn) {
      // Set the signed in user
      setSignedInUser(gapi.auth2.getAuthInstance().currentUser.je.Qt);
      setIsLoadingGoogleDriveApi(false);
      // list files if user is authenticated
      listFiles();
    } else {
      // prompt user to sign in
      handleAuthClick();
    }
  };

  function handleAuthClick() {
    gapi.auth2.getAuthInstance().signIn();
  }

  async function listFiles(searchTerm?: any) {
    setIsFetchingGoogleDriveFiles(true);
    gapi.client.drive.files
      .list({
        pageSize: 10,
        fields: "nextPageToken, files(id, name, mimeType, modifiedTime)",
        q: searchTerm,
      })
      .then(function (response: any) {
        setIsFetchingGoogleDriveFiles(false);
        setListDocumentsVisibility(true);
        const res = JSON.parse(response.body);
        setDocuments(res.files);
      });
  }
}
