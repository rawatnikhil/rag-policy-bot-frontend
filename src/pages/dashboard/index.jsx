import React from "react";
import "./style.css";
import { DragDrop } from "../../component";
import ChatSection from "../../component/chatSection";

export default function Dashboard() {
    return (
        <div className="page-container">
            <div className="chat-section">
                <ChatSection />
            </div>
            <div className="upload-section">
                <DragDrop />
            </div>
        </div>
    );
}
