function slideToLeft() {
    var homeContainer = document.getElementById("homeContainer");
    homeContainer.style.transform = "translateX(-74%)";
  }
  function slideBackToHome() {
    const homeContainer = document.getElementById('homeContainer');
    homeContainer.style.transform = 'translateX(0)';
    
  }