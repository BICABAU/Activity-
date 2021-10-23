var acc = document.getElementsByClassName("accordion");
var acc2 = document.getElementsByClassName("accordion2");
var acc_home = document.getElementsByClassName("accordion-home");
var acc_estatisticas = document.getElementsByClassName("accordion-estatisticas")
var acc_estatisticas_button = document.getElementsByClassName("accordion-button")
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}

for (i = 0; i < acc.length; i++) {
    acc2[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "none") {
            panel.style.display = "block";
        } else {
            panel.style.display = "none";
        }
    });
}



for (i = 0; i < acc_home.length; i++) {
    acc_home[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}

for (i = 0; i < acc_estatisticas.length; i++) {
    acc_estatisticas[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}


// function openNav() {
//     document.getElementById("mySidenav").style.width = "240px";

// }

// function closeNav() {
//     document.getElementById("mySidenav").style.width = "0"

// }


function openNav() {
    document.getElementById("mySidenav").style.width = "300px";
    document.getElementById("main").style.marginLeft = "300px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}
