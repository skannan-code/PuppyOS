let display;

document.addEventListener("DOMContentLoaded", () => {


    display = document.getElementById("display");

    window.appendValue = function (value) {
        display.value += value;
    };

    window.clearDisplay = function () {
        display.value = "";
    };

    window.backspace = function () {
        display.value = display.value.slice(0, -1);
    };

    window.calculate = function () {
        try {
            display.value = eval(display.value);
        } catch {
            display.value = "Error";
        }
    };


    const welcomeScreen = document.getElementById("welcome");
    const welcomeClose = document.getElementById("welcomeclose");
    const welcomeOpen = document.getElementById("welcomeopen");

    const notesScreen = document.getElementById("notes");
    const notesClose = document.getElementById("notesclose");
    const notepadIcon = document.getElementById("notepadIcon");

    const googleScreen = document.getElementById("google");
    const googleClose = document.getElementById("googleclose");
    const googleIcon = document.getElementById("googleIcon");

    const calculatorScreen = document.getElementById("calculator");
    const calculatorClose = document.getElementById("calculatorclose");
    const calculatorIcon = document.getElementById("calculatorIcon");

    const IPHelpdeskScreen = document.getElementById("IPHelpdesk");
    const IPHelpdeskClose = document.getElementById("IPHelpdeskclose");
    const IPHelpdeskIcon = document.getElementById("IPHelpdeskIcon");

    let biggestIndex = 10;


    function openWindow(el) {
        el.style.display = "block";
        el.style.left = (window.innerWidth - el.offsetWidth) / 2 + "px";
        el.style.top = (window.innerHeight - el.offsetHeight) / 2 + "px";

        biggestIndex++;
        el.style.zIndex = biggestIndex;
    }

    function closeWindow(el) {
        el.style.display = "none";
    }

    function minimizeWindow(el) {
        el.style.transform = "scale(0.1)";
        el.style.opacity = "0";

        setTimeout(() => {
            el.style.display = "none";
            el.style.transform = "scale(1)";
            el.style.opacity = "1";
        }, 250);
    }

    function toggleMaximize(el) {
        if (!el.dataset.maximized) {
            el.dataset.prevLeft = el.style.left;
            el.dataset.prevTop = el.style.top;
            el.dataset.prevWidth = el.style.width;
            el.dataset.prevHeight = el.style.height;

            el.style.left = "0px";
            el.style.top = "40px";
            el.style.width = "100vw";
            el.style.height = "calc(100vh - 40px)";

            el.dataset.maximized = "true";
        } else {
            el.style.left = el.dataset.prevLeft;
            el.style.top = el.dataset.prevTop;
            el.style.width = el.dataset.prevWidth;
            el.style.height = el.dataset.prevHeight;

            el.dataset.maximized = "";
        }
    }


    document.getElementById("notesmin").addEventListener("click", () => minimizeWindow(notesScreen));
    document.getElementById("notesmax").addEventListener("click", () => toggleMaximize(notesScreen));

    document.getElementById("welcomemin").addEventListener("click", () => minimizeWindow(welcomeScreen));
    document.getElementById("welcomemax").addEventListener("click", () => toggleMaximize(welcomeScreen));

    document.getElementById("googlemin").addEventListener("click", () => minimizeWindow(googleScreen));
    document.getElementById("googlemax").addEventListener("click", () => toggleMaximize(googleScreen));

    document.getElementById("calculatormin").addEventListener("click", () => minimizeWindow(calculatorScreen));
    document.getElementById("calculatormax").addEventListener("click", () => toggleMaximize(calculatorScreen));

    document.getElementById("IPHelpdeskmin").addEventListener("click", () => minimizeWindow(IPHelpdeskScreen));
    document.getElementById("IPHelpdeskmax").addEventListener("click", () => toggleMaximize(IPHelpdeskScreen));

    openWindow(welcomeScreen);

    welcomeClose.addEventListener("click", () => closeWindow(welcomeScreen));
    welcomeOpen.addEventListener("click", () => openWindow(welcomeScreen));

    notesClose.addEventListener("click", () => closeWindow(notesScreen));
    notepadIcon.addEventListener("click", () => openWindow(notesScreen));

    googleClose.addEventListener("click", () => closeWindow(googleScreen));
    googleIcon.addEventListener("click", () => openWindow(googleScreen));

    calculatorClose.addEventListener("click", () => closeWindow(calculatorScreen));
    calculatorIcon.addEventListener("click", () => openWindow(calculatorScreen));

    IPHelpdeskClose.addEventListener("click", () => closeWindow(IPHelpdeskScreen));
    IPHelpdeskIcon.addEventListener("click", () => openWindow(IPHelpdeskScreen));


    function makeDraggable(windowEl, headerEl) {
        let offsetX = 0;
        let offsetY = 0;
        let dragging = false;

        headerEl.addEventListener("pointerdown", (e) => {
            if (e.target.closest(".closebutton, .minbutton, .maxbutton")) return;

            dragging = true;
            offsetX = e.clientX - windowEl.offsetLeft;
            offsetY = e.clientY - windowEl.offsetTop;

            biggestIndex++;
            windowEl.style.zIndex = biggestIndex;
        });

        document.addEventListener("pointermove", (e) => {
            if (!dragging) return;

            windowEl.style.left = (e.clientX - offsetX) + "px";
            windowEl.style.top = (e.clientY - offsetY) + "px";
        });

        document.addEventListener("pointerup", () => {
            dragging = false;
        });
    }

    makeDraggable(welcomeScreen, document.getElementById("welcomeheader"));
    makeDraggable(notesScreen, document.getElementById("notesheader"));
    makeDraggable(googleScreen, document.getElementById("googleheader"));
    makeDraggable(calculatorScreen, document.getElementById("calculatorheader"));
    makeDraggable(IPHelpdeskScreen, document.getElementById("IPHelpdeskheader"));


    document.querySelectorAll(".window").forEach(win => {
        win.addEventListener("pointerdown", () => {
            biggestIndex++;
            win.style.zIndex = biggestIndex;
        });
    });
});
