 /* Existing imports... */
import VznChat from "../../../components/VznChat";
// ...rest as before

const VZN_API_TEXT = "https://YOUR_TEXT_API_ENDPOINT";
const VZN_API_IMAGE = "https://YOUR_IMAGE_API_ENDPOINT";

// ...other form code...

function handleSend(e) {
  e.preventDefault();
  // If input includes @vzn, show AI modal or send as AI
  if (inputValue.includes("@vzn")) {
    // Example: show modal, or inject reply directly
    // For modal, you might use useState and conditionally render <VznChat isGroup apiText=... apiImage=... />
    // For inline, call AI API and add AI message to chat directly:
    getVznTextReply(inputValue, VZN_API_TEXT).then(aiReply => {
      addMessage({ sender: "vzn", text: aiReply });
    });
    // For images:
    if (inputValue.toLowerCase().includes("generate image")) {
      getVznImageReply(inputValue, VZN_API_IMAGE).then(aiImage => {
        addMessage({ sender: "vzn", text: "Generated image:", image: aiImage });
      });
    }
  } else {
    /* Existing message send logic */
  }
  setInputValue("");
}
