const noop = () => {};

export default class WebSpeech {
  constructor({
    handleOnStart = noop,
    handleOnEnd = noop,
    handleOnResult = noop,
    handleOnError = noop,
    stopModelSpeak = noop,
    startModelSpeak = noop,
  }) {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition)
      throw Error("This browser doesn't support the WebSpeech API");
    this.recognition = new SpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = "en-US";

    this.startModelSpeak = startModelSpeak;
    this.stopModelSpeak = stopModelSpeak;
    this.audio = document.createElement("audio");

    this.registerEventHandlers({
      handleOnStart,
      handleOnEnd,
      handleOnResult,
      handleOnError,
    });
  }

  startRecognition() {
    console.log("Recognition started");
    this.recognition.start();
  }

  stopRecognition() {
    this.recognition.stop();
    console.log("Recognition stopped");
  }

  registerEventHandlers({
    handleOnStart,
    handleOnEnd,
    handleOnResult,
    handleOnError,
  }) {
    if (!this.recognition) return False;

    const api = this;
    this.recognition.onstart = handleOnStart;
    this.recognition.onend = handleOnEnd;
    this.recognition.onerror = handleOnError;

    this.recognition.onresult = (event) => {
      const result = event.results[event.results.length - 1][0].transcript;
      if (event.results[event.results.length - 1].isFinal) {
        api.stopModelSpeak();
        api.audio.pause();
        api.stopRecognition();
        handleOnResult(result);
      }
    };

    this.audio.addEventListener("play", api.startModelSpeak);
    this.audio.addEventListener("pause", api.stopModelSpeak);
  }

  speak(text) {
    this.stopRecognition();
    function limitStringTo300Chars(inputString) {
      if (inputString.length <= 300) {
        // No need to truncate; the string is already within the limit.
        return inputString;
      }

      // Find the last period (.) within the first 300 characters.
      const truncatedString = inputString.substring(0, 300);
      const lastPeriodIndex = truncatedString.lastIndexOf(".");

      if (lastPeriodIndex >= 0) {
        // Truncate at the last period to end at a complete sentence.
        return truncatedString.substring(0, lastPeriodIndex + 1);
      } else {
        // If no period found within the character limit, truncate at 300 characters.
        return truncatedString;
      }
    }

    this.recognition.stop();
    const ENDPOINT = "https://tiktok-tts.weilnet.workers.dev";
    const api = this;

    const setAudio = (base64) => {
      api.audio.src = `data:audio/mpeg;base64,${base64}`;
      api.audio.play();
    };

    const req = new XMLHttpRequest();
    req.open("POST", `${ENDPOINT}/api/generation`, false);
    req.setRequestHeader("Content-Type", "application/json");
    req.send(
      JSON.stringify({
        text: limitStringTo300Chars(text),
        voice: "en_us_001",
      })
    );

    let resp = JSON.parse(req.responseText);
    if (resp.data === null) throw Error("TTS failed.");
    setAudio(resp.data, text);
  }
}
