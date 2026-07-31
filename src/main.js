const API_KEY = import.meta.env.VITE_NASA_API_KEY;

document.querySelector("#app").innerHTML = "<p>loading...</p>"

fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
.then(response => response.json())
.then(data => {
    let media;
    let downloadBtn = '';

    const fullResUrl = data.hdurl || data.url;

    if (data.media_type === "image") {
        media = `<img src="${data.url}" alt="${data.title}" />`;

        downloadBtn = `
<a href="${fullResUrl}" target="_blank" rel="noopener noreferrer" class="download-btn">
                View HD Image ↗
            </a>
        `;
    } else {
        media = `<video src="${data.url}"  controls></video>`
    }

    const copyright = data.copyright ? `@ ${data.copyright.trim()}`: 'Public Domain';

    document.querySelector("#app").innerHTML = `
    <h1>Today's APOD is:</h1>    
    <h2>${data.title}</h2>
    <p class="meta-info"><strong>Date:</strong> ${data.date} | <strong>Credit:</strong> ${copyright}</p>
        ${media}
        ${downloadBtn}
        <p>${data.explanation}</p>
    `;
})
.catch(err => {
    document.querySelector("#app").innerHTML = `<p>Error: ${err.message}</p>`;
})