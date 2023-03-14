import { createContext, ReactNode, useEffect, useState } from "react";
import googleDrivePicker from "react-google-drive-picker";

interface MainData {
  fileId: string;
  handleOpenPicker: () => void;
  handleFileId: (fileId: any) => void;
}

interface MainProps {
  children: ReactNode;
}

export const MainContext = createContext<MainData>({
  fileId: "",
  handleOpenPicker() {},
  handleFileId(fileId) {},
});

export function MainProvider({ children }: MainProps) {
  const [openPicker, data] = googleDrivePicker();
  const [fileId, setFileId] = useState<any>("");

  function handleFileId(fileId: any) {
    setFileId(fileId);
  }

  function handleOpenPicker() {
    openPicker({
      clientId:
        "285393898991-r81lciffuskvkasb7gackrv946pc8dho.apps.googleusercontent.com",
      developerKey: "AIzaSyDqxmzYfCBtHR2EEK45f-sMtzkAa0e6xfY",
      viewId: "DOCS",
      // token: token, // pass oauth token in case you already have one
      token:
        "ya29.a0AVvZVsr6cepF5sid-mwegj95sOxDy7w5ejlmHUy5qrqZyD01eG0Bq2fhlFHjL0ov8qZmwEnr_DpOYRLsYzh2niPYyaoxfUyRxVFFVEdG1CNxxgnljIXjwq_-NZfxhqpueSx5nmo6drfTQc3RQWb3uv_EP3_6aCgYKAdwSARESFQGbdwaIu0uuI2R2dp1fnmigeSs4QQ0163",
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      // customViews: customViewsArray, // custom view
      callbackFunction: (data) => {
        if (data.action === "cancel") {
          console.log("User clicked cancel/close button");
        }
        data?.docs?.map((driveData) => {
          handleFileId(driveData["id"]);
        });
      },
    });
  }

  return (
    <MainContext.Provider
      value={{
        fileId,
        handleOpenPicker,
        handleFileId,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
