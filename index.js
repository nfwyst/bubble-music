window.addEventListener("load", () => {
  const sounds = document.querySelectorAll(".sounds div");
  const bubbles = document.querySelector(".bubbles");
  const colors = [
    "#60d394",
    "#d36060",
    "#c060d3",
    "#d3d160",
    "#606bd3",
    "#60c2d3"
  ];

  const bindTap = (sounds, createBubble, colors, bubbles) => {
    sounds.forEach((sound, index) => {
      sound.onclick = (e) => {
        const player = e.target.querySelector('audio');
        player.currentTime = 0;
        player.play();
        createBubble(colors[index], bubbles);
      }
    });

    document.onkeyup = (e) => {
      sounds.forEach((sound, index) => {
        const player = sound.querySelector('audio');
        const key = player.getAttribute('data-keymatch');
        if (key !== e.key) return false;
        sound.style.filter = 'brightness(50%)';
        player.currentTime = 0;
        player.play();
        createBubble(colors[index], bubbles, () => sound.style.filter = '');
      })
    }
  }

  const createBubble = (color, bubbles, callback = _ => { }) => {
    const bubble = document.createElement("div");
    bubble.style.backgroundColor = color;
    bubble.style.animation = 'bubbles 1s ease';
    bubble.addEventListener('animationend', () => bubbles.removeChild(bubble) && callback())
    bubbles.appendChild(bubble);
  }

  bindTap(sounds, createBubble, colors, bubbles);
});
