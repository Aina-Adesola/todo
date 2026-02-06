window.addEventListener("load", () => {
  const splash = document.getElementById("splash");
  const main = document.getElementById("main-content");
  const progressBar = document.getElementById("progress-bar");

  let progress = 0;
  const duration = 5000;
  const intervalTime = 50;
  const increment = 100 / (duration / intervalTime);

  const progressInterval = setInterval(() => {
    progress += increment;
    progressBar.style.width = progress + "%";

    if (progress >= 100) {
      clearInterval(progressInterval);
      splash.classList.add("fade-out");

      setTimeout(() => {
        splash.style.display = "none";
        main.style.display = "flex";
      }, 1000);
    }
  }, intervalTime);
});
