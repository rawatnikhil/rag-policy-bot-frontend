import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import "./style.css";
import { queryApi } from "../../api";

const ChatSection = () => {
    const [query, setQuery] = useState("");
    const [userMessage, setUserMessage] = useState();
    const [botResponse, setBotResponse] = useState();

    const handleSend = async () => {
        setBotResponse("");
        setUserMessage(query);
        await queryApi(query, chunk => {
            setBotResponse(prev => {
                if (!prev) return chunk; // first chunk => no space
                if (prev.endsWith(" ") || chunk.startsWith(" ")) return prev + chunk;
                return prev + " " + chunk; // add space only when needed
            });
        });

        console.log(botResponse);
        setQuery("");
    };

    return (
        <div className="chat-container">
            {/* Messages */}
            <div className="chat-messages">
                {userMessage && <div className={`chat-bubble right`}>{userMessage}</div>}
                {botResponse && <div className="chat-bubble left">{botResponse}</div>}
            </div>

            {/* Input Area */}
            <div className="chat-input-container">
                <input
                    type="text"
                    placeholder="Ask something..."
                    value={query}
                    onKeyDown={e => {
                        if (e.key === "Enter") handleSend();
                    }}
                    onChange={e => setQuery(e.target.value)}
                    className="chat-input"
                />

                <button className="send-btn" onClick={handleSend}>
                    <SendIcon />
                </button>
            </div>
        </div>
    );
};

export default ChatSection;
