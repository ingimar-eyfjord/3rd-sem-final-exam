import React from "react"
import { CSSTransition, TransitionGroup, } from 'react-transition-group';
import QueueItem from "./QueueItem"
export default function Queue({ queue, serving, bartenders }) {

    return (
        <div className="queue">
            <h2 className="QueueHeader">QUEUE</h2>
            <div key="RowsContainer" className="queueRows">
                <TransitionGroup>
                    {serving.map((serving, index) => <CSSTransition key={index} timeout={1000} classNames="transitionServe"><QueueItem bartenders={bartenders} key={serving.id} serving={serving} id={serving.id} starttime={serving.startTime} {...serving} style={{ "--animation-order": index }} className="Rows" ></QueueItem ></CSSTransition>)}
                </TransitionGroup>
                <TransitionGroup>
                    {queue.map((queue, index) => <CSSTransition key={index} timeout={1000} classNames="transition"><QueueItem key={queue.id} bartenders={bartenders} id={queue.id} starttime={queue.startTime} {...queue} style={{ "--animation-order": index }} className="Rows" ></QueueItem ></CSSTransition>)}
                </TransitionGroup>
            </div>
        </div >
    )
}