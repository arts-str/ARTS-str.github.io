const soundElement = document.getElementById('sound');

soundElement.onclick = () =>{
    for (const svg of soundElement.children) {
        svg.classList.toggle('inactive');
    }
    const videos = document.querySelectorAll('video');
    console.log(videos);
    
}