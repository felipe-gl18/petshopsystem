import useDrivePicker from "react-google-drive-picker";

const [openPicker, data] = useDrivePicker();
export let fileId: any;

export default function handleOpenPicker() {
  openPicker({
    clientId:
      "285393898991-r81lciffuskvkasb7gackrv946pc8dho.apps.googleusercontent.com",
    developerKey: "AIzaSyDqxmzYfCBtHR2EEK45f-sMtzkAa0e6xfY",
    viewId: "DOCS",
    showUploadView: true,
    token:
      "ya29.a0AVvZVsqx3B7--X7XSLZ-z8-_OY-Vq3CMltydNaeH3yB-h5ukGgECCN-lIqb-0kTbirXvbmWAm5bkfCdlVEKg6xLCkKWR7ZZneqjNaZO7dV97yVyB3Ovroj5sJs1oJ-Gdl2CmSHc5Rm9x1M1FeIQqfoldKPEQaCgYKAVkSARESFQGbdwaIz26Uo7L6NJxXS3k5JZ9gbQ0163",
    showUploadFolders: true,
    supportDrives: true,
    multiselect: true,
    callbackFunction: (data) => {
      if (data.action === "cancel") {
        console.log("User clicked cancel/close button");
      }
      data.docs?.map((dataItem) => {
        console.log(dataItem);
        let imgId = dataItem["id"];
        fileId = imgId;
      });
    },
  });
}
