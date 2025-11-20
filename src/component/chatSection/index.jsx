import React, { useRef, useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import SendIcon from "@mui/icons-material/Send";
import "./style.css";
import { queryApi } from "../../api";

const ChatSection = () => {
    const [query, setQuery] = useState("");
    const [userMessage, setUserMessage] = useState("");
    const [botChunks, setBotChunks] = useState([]); // array of received chunks
    const [displayedText, setDisplayedText] = useState(""); // typewriter text
    const rawBufferRef = useRef(""); // full raw text

    const handleSend = async () => {
        if (!query.trim()) return;

        setUserMessage(query);
        setBotChunks([]);
        setDisplayedText("");
        rawBufferRef.current = "";

        // Stream chunks from backend
        await queryApi(query, chunk => {
            // Reconstruct words properly
            rawBufferRef.current = rawBufferRef.current + chunk;

            setBotChunks(prev => [...prev, chunk]);
        });

        setQuery("");
    };

    // Typewriter effect
    useEffect(() => {
        if (!botChunks.length) return;

        let i = 0;
        const fullText = rawBufferRef.current;
        setDisplayedText(""); // reset displayed

        const interval = setInterval(() => {
            i++;
            setDisplayedText(fullText.slice(0, i));
            if (i >= fullText.length) clearInterval(interval);
        }, 25); // adjust speed here (ms per character)

        return () => clearInterval(interval);
    }, [botChunks]);

    return (
        <div className="chat-container">
            <div className="chat-messages">
                {userMessage && <div className="chat-bubble right">{userMessage}</div>}

                {/* Typewriter Markdown display */}
                {displayedText && (
                    <div className="chat-bubble left">
                        <ReactMarkdown>{displayedText}</ReactMarkdown>
                    </div>
                )}
            </div>

            <div className="chat-input-container">
                <input
                    type="text"
                    placeholder="Ask something..."
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleSend()}
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
