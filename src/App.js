import React, { useState, useEffect, useRef } from "react";
import './index.css';
import Rows from "./components/dashBoad/row"
import Queue from "./components/dashBoad/queue"
import DownloadInfo from "./components/dashBoad/downloadInfo"

function App() {
  const URL = "https://newfoobarapp.herokuapp.com/"
  const Beers = "https://newfoobarapp.herokuapp.com/beertypes"
  const bartendersArray = []
  const [bartenders, setBartenders] = useState(bartendersArray)
  const queueArray = []
  const [queue, setQueue] = useState(queueArray)
  const servingArray = []
  const [serving, setServing] = useState(servingArray)
  const storageArray = []
  const [storage, setStorage] = useState(storageArray)
  const tapsArray = []
  const [taps, setTaps] = useState(tapsArray)
  const beersArray = []
  const [beers, setBeers] = useState(beersArray)
  const queueBankArray = []
  const [queueBank, setBank] = useState(queueBankArray)




  function Counter() {

    useInterval(() => {
      // Your custom logic here

      fetch(URL, {
        method: "get",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      }).then(res => res.json()).then(data => setData(data));

      function setData(data) {
        setBartenders(data.bartenders)
        setServing(data.serving)
        setStorage(data.storage)
        setTaps(data.taps)
        handlequeue(data.queue)
      }

      // Call this function after fetching, peramiters is the data.queue
      function handlequeue(queueData) {
        // Queue here is the state of which all queues are in, if it's 0 then set queue like normally
        if (queue.length <= 0) {
          // setting queue normally with setState function
          setQueue(queueData)
        } else {
          // if the queue lenght is more than 0 then check if the data we recieived is just one item or more.
          if (queueData.lenght == 1) {
            // if one then we neet to take the item and do stuff with it
            let addPerson = (queueData) => {
              console.log("it was this 1")
              // copy the queue state and turn it into a variable
              let array = [...queue]
              // now we filter the coppied array where you filter the already existing item out by matching the id's in there with the id of the item we fetched
              // if the filter does not match any item in the array that means the item from the fetch is new and nothing happens, which is what we want, (avoiding doubles)
              let filteredList = array.filter(e => e.id !== queueData.id);
              // Now make a newArray where we combine a copy of the filtered array and the item,
              let newarray = [...filteredList, queueData]
              // Now we set the the state of the queue with the new array, since it's states if the item already exists then it won't update, 
              setQueue(newarray)
            }
            addPerson(queueData)
          } else {
            // In this else statement wer'e going to check if the item we fetched is more than one item in an array, because then we need a foreach.
            // This function is the same one as above but I need two because I'm accessing it inside a statement.
            let addPersons = (oneData) => {
              console.log("it was this 2")
              let array = [...queue]
              let filteredList = array.filter(e => e.id != oneData.id);
              let newarray = [...filteredList, oneData]
              setQueue(newarray)


            }
            /// - same function as above ends.
            // Here we just do a simple for each where we pass along each item at a time to the filter function.
            queueData.forEach(e => {
              addPersons(e)
            })
          }
        }
      }
    }, 5000);
  }

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest function.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }
  Counter()


  useEffect(() => {
    fetch(Beers, {
      method: "get",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    }).then(res => res.json()).then(data => setBeers(data));
  }, [])



  function deleteServedItems(id) {
    console.log(id)
    let deleteOrder = (id) => {
      let array = [...queue]
      let filteredList = array.filter(e => e.id !== id);
      let newarray = [...filteredList]
      setQueue(newarray)
    }
    setTimeout(() => {
      deleteOrder(id)
    }, 3000);
  }

  // console.log("bartenders", bartenders, "queue", queue, "serving", serving, "storage", storage, "taps", taps, "beers", beers)
  // console.log("queue", queue, "serving", serving)

  return (
    <div className="App">
      <Rows beers={beers} />
      <Queue deleteServedItems={deleteServedItems} serving={serving} queue={queue} />
      <DownloadInfo />
    </div>
  );
}

export default App;
