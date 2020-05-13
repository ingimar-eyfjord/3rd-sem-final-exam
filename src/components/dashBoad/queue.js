import React, { useState, useEffect } from "react"
import QueueItem from "./QueueItem"
export default function Queue({ queue, serving }) {
    const mapped = queue.map((queue, index) => <QueueItem key={queue.id + "queue"} serving={serving} id={queue.id} starttime={queue.startTime} {...queue} style={{ "--animation-order": index }} className="Rows"></QueueItem>)
    return (
        <div className="queue">
            <h2 className="QueueHeader">QUEUE</h2>
            <div className="queueRows">
                {mapped}
            </div>
        </div>
    )
}