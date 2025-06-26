window.onload = () => {
  /* ------------------------------------------------ get URL params */
  function getUrlParams(url) {
    const query = url.split("?")[1] || "";
    return Object.fromEntries(new URLSearchParams(query).entries());
  }

  /* ------------------------------------------------ IDs & token */
  const roomID = getUrlParams(location.href).roomID || String(Math.floor(Math.random() * 10000));
  const userID = String(Math.floor(Math.random() * 10000));
  const userName = "userName" + userID;

  // Your ZEGOCLOUD credentials
  const appID = 1478875580;
  const serverSecret = "754505cca14815300840d1fd108b7e72";

  /* ------------------------------------------------ Build personal link & show it */
  const personalLink = `${location.protocol}//${location.host}${location.pathname}?roomID=${roomID}`;
  const linkBox = document.getElementById("personal-link");
  if (linkBox) {
    linkBox.innerHTML = `Invite Link:&nbsp;<a href="${personalLink}" target="_blank">${personalLink}</a>`;
  }

  /* ------------------------------------------------ Create & join room */
  const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
    appID,
    serverSecret,
    roomID,
    userID,
    userName
  );

  const zp = ZegoUIKitPrebuilt.create(kitToken);
  zp.joinRoom({
    container: document.getElementById("root"),
    sharedLinks: [{ name: "Personal link", url: personalLink }],
    scenario: { mode: ZegoUIKitPrebuilt.VideoConference },

    /* UI / behaviour options */
    turnOnMicrophoneWhenJoining: true,
    turnOnCameraWhenJoining: true,
    showMyCameraToggleButton: true,
    showMyMicrophoneToggleButton: true,
    showAudioVideoSettingsButton: true,
    showScreenSharingButton: true,
    showTextChat: true,
    showUserList: true,
    maxUsers: 50,
    layout: "Auto",
    showLayoutButton: true,
  });
};
