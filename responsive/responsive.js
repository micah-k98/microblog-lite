"use strict"

document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("sidebarToggle");
    sidebar.hidden = true;

    window.addEventListener("resize", () => {
        if (window.screen.width < 768) sidebar.hidden = false;
        else if (window.screen.width > 768) sidebar.hidden = true;
    })
    
})


function toggleSidebar() {
    const sidebar = document.querySelector('#side-navigation');
    sidebar.classList.toggle('hide-sidebar');
  }
  