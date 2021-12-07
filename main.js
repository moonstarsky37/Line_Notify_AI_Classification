message = '';
const imageModelURL = 'https://teachablemachine.withgoogle.com/models/YOUR_MODEL_ID/';
async function start() {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
  });

  const video = document.getElementById('webcam');
  
  video.srcObject = stream;
  classifier = ml5.imageClassifier(imageModelURL + 'model.json', video, () => {
    console.log('Model loded');
  });
function loop() {
  
  classifier.classify(async (err, results) => {
    if (results[0]) {
      const myHand = results[0].label;
      console.log(results[0]);
await axios.post('https://XXXXXXXXXXXXXXXX.ap.ngrok.io/receiver', results[0]);// ngrok http 1880 -region ap
      const message = `「${myHand}」`;
      alert(message['label']);
      //document.getElementById("result").textContent = message;
    }
    setTimeout(loop, 1000);
  });
}
  loop();
}
