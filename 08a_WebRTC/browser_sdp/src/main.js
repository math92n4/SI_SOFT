import './style.css'

let localStream;
let remoteStream;
let peerConnection;

const servers = {
    iceServers: [
        {
            urls: ['stun:stun1.l.google.com:19302'],
        }
    ]
};

// init function to get local media stream
async function init() {
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    document.getElementById("localVideo").srcObject = localStream;
}

// setup peer connection and handle SDP offer/answer
async function createPeerConnection(sdpOfferTextAreaId) {
    peerConnection = new RTCPeerConnection(servers);

    // MediaStream for the remote video
    remoteStream = new MediaStream();
    document.getElementById("remoteVideo").srcObject = remoteStream;

    // add the local stream to the peer connection
    localStream.getTracks().forEach((track) => peerConnection.addTrack(track, localStream));

    // handle incoming tracks
    peerConnection.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => remoteStream.addTrack(track));
    };

    // create an SDP offer when ice candidate is found
    peerConnection.onicecandidate = (event) => {
        if(event.candidate) {
            document.getElementById(sdpOfferTextAreaId).textContent = JSON.stringify(peerConnection.localDescription);
        }
    };
}

// start the connection from caller side
async function createOffer() {
    if(!localStream) {
        return alert("Local stream is not ready");
    }

    const offer = await createPeerConnection("sdpOfferTextArea");
    await peerConnection.setLocalDescription(offer);
}

async function createAnswer() {
    await createPeerConnection("sdpAnswerTextArea");

    let offer = document.getElementById("sdpOfferTextArea").value;
    if(!offer) return alert("Offer is required");
    offer = JSON.parse(offer);

    await peerConnection.setRemoteDescription(offer);

    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    document.getElementById("sdpAnswerTextArea").textContent = JSON.stringify(answer);
}

async function addAnswer() {
    let answer = document.getElementById("sdpAnswerTextArea").value;

    if(!answer) return alert("No answer");
    answer = JSON.parse(answer);

    if(!peerConnection.currentRemoteDescription) {
        peerConnection.setRemoteDescription(answer);
    }
}

init();
document.getElementById("createOfferButton").addEventListener("click", createOffer);
document.getElementById("createAnswerButton").addEventListener("click", createAnswer);
document.getElementById("addAnswerButton").addEventListener("click", addAnswer);


// BROWSER A -> CREATE OFFER
// BROWSER B -> KOPIERER BROWSER As OFFER
// BROWSER B -> CREATE ANSWER
// BROWSER A -> KOPIERER BROWSER Bs ANSWER
// BROWSER A -> ADD ANSWER
