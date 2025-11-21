const eventsource = new EventSource('/api/news')

const liveText = document.querySelector('.live-text')

eventsource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const story = data.story;
    liveText.innerHTML = story;
}

eventsource.onerror = () => {
    console.log("connection lost...Attempting to reconnect");
}