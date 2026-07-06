 var taskBar = document.querySelector("#taskBar")

 
 function updateTime() {
  var currentTime = new Date().toLocaleString();
  var timeText = document.querySelector("#timeElement");
  timeText.innerHTML = currentTime;
}
setInterval(updateTime, 1000);
// Make the DIV element draggable:

// Step 1: Define a function called `dragElement` that makes an HTML element draggable.
function dragElement(element) {
  // Step 2: Set up variables to keep track of the element's position.
  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;

  // Step 3: Check if there is a special header element associated with the draggable element.
  if (document.getElementById(element.id + "header")) {
    // Step 4: If present, assign the `dragMouseDown` function to the header's `onmousedown` event.
    // This allows you to drag the window around by its header.
    document.getElementById(element.id + "header").onmousedown = startDragging;
  } else {
    // Step 5: If not present, assign the function directly to the draggable element's `onmousedown` event.
    // This allows you to drag the window by holding down anywhere on the window.
    element.onmousedown = startDragging;
  }

  element.addEventListener("mousedown", function () {
    handleWindowTap(element);
  });

  // Step 6: Define the `startDragging` function to capture the initial mouse position and set up event listeners.
  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    handleWindowTap(element);
    // Step 7: Get the mouse cursor position at startup.
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 8: Set up event listeners for mouse movement (`elementDrag`) and mouse button release (`closeDragElement`).
    document.onmouseup = stopDragging;
    document.onmousemove = elementDrag;
  }

  // Step 9: Define the `elementDrag` function to calculate the new position of the element based on mouse movement.
  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 10: Calculate the new cursor position.
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 11: Update the element's new position by modifying its `top` and `left` CSS properties.
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  // Step 12: Define the `stopDragging` function to stop tracking mouse movement by removing the event listeners.
  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
var welcomeScreen = document.querySelector("#welcome")
function getTaskbarIcon(element) {
  return document.querySelector("." + element.id + "Taskbar");
}

function closeWindow(element) {
  element.style.display = "none"
  const screenTaskbar = getTaskbarIcon(element);
  if (screenTaskbar) {
    screenTaskbar.style.display = "none";
  }
}

function openWindow(element) {
  element.style.display = "flex";
  biggestIndex++;  // Increment biggestIndex by 1
  element.style.zIndex = biggestIndex;
  taskBar.style.zIndex = biggestIndex + 1;
  const screenTaskbar = getTaskbarIcon(element);
  if (screenTaskbar) {
    screenTaskbar.style.display = "flex";
  }
}
var selectedIcon = undefined
function selectIcon(element) {
  if (element) {
    element.classList.add("selected");
  }
  selectedIcon = element
}
function deselectIcon(element) {
  if (element) {
    element.classList.remove("selected");
  }
  selectedIcon = undefined
}

function handleIconTap(element) {
  const screenId = element.id.replace("Icon", "Screen");
  const screenElement = document.querySelector("#" + screenId);
  if (element.classList.contains("selected")) {
    deselectIcon(element);
    if (screenElement) {
      openWindow(screenElement);
    }
  } else {
    selectIcon(element);
  }
}


// Logic for every screen
 //welcome
 dragElement(document.getElementById("welcome"));
 var welcomeScreenClose = document.querySelector("#welcomeclose");
 var welcomeScreenOpen = document.querySelector("#openwelcome");
 welcomeScreenClose.addEventListener("click", function() {
  closeWindow(welcomeScreen);
 });

 welcomeScreenOpen.addEventListener("click", function() {
  openWindow(welcomeScreen);
 });

 //projects
 dragElement(document.getElementById("projectsScreen"));
 var projectsScreenClose = document.querySelector("#projectsclose");
 var projectsIcon = document.querySelector("#projectsIcon");
 var projectsScreen = document.querySelector("#projectsScreen");
 var project1Screen = document.querySelector("#project1Screen");
 var project2Screen = document.querySelector("#project2Screen");
 var project3Screen = document.querySelector("#project3Screen");

 projectsScreenClose.addEventListener("click", function() {
  closeWindow(projectsScreen);
 });

 projectsIcon.addEventListener("click", function() {
  handleIconTap(projectsIcon);
 });
  var project1Icon = document.querySelector("#project1Icon");
  project1Icon.addEventListener("click", function() {
  handleIconTap(project1Icon);
 });

  var project2Icon = document.querySelector("#project2Icon");
  project2Icon.addEventListener("click", function() {
  handleIconTap(project2Icon);
 });

  var project3Icon = document.querySelector("#project3Icon");
  project3Icon.addEventListener("click", function() {
  handleIconTap(project3Icon);
 });

  var project4Icon = document.querySelector("#project4Icon");
  project4Icon.addEventListener("click", function() {
  // disabled for now handleIconTap(project4Icon);
 });

  var settingsScreen = document.querySelector("#settingsScreen");
  var settingsIcon = document.querySelector("#settingsIcon");
  settingsIcon.addEventListener("click", function() {
    handleIconTap(settingsIcon);
  });

  var settingsClose = document.querySelector("#settingsclose");
  settingsClose.addEventListener("click", function() {
    closeWindow(settingsScreen);
  });
 
 var project1Close = document.querySelector("#project1close");
 project1Close.addEventListener("click", function() {
  closeWindow(project1Screen);
 });
 dragElement(document.getElementById("project1Screen"));
 var project2Close = document.querySelector("#project2close");
 project2Close.addEventListener("click", function() {
  closeWindow(project2Screen);
 });
  var project3Close = document.querySelector("#project3close");
 project3Close.addEventListener("click", function() {
  closeWindow(project3Screen);
 });
 dragElement(document.getElementById("project2Screen"));
 dragElement(document.getElementById("project3Screen"));
 if (settingsScreen) {
   dragElement(settingsScreen);
 }

 var biggestIndex = 1;
function addWindowTapHandling(element) {
  element.addEventListener("mousedown", () =>
    handleWindowTap(element)
  )
}
 var projectsScreenTaskbar = document.querySelector(".projectsScreenTaskbar");
 projectsScreenTaskbar.addEventListener("click", function() {
  handleWindowTap(projectsScreen);
 });

  var project1ScreenTaskbar = document.querySelector(".project1ScreenTaskbar");
 project1ScreenTaskbar.addEventListener("click", function() {
  handleWindowTap(project1Screen);
 });

  var project2ScreenTaskbar = document.querySelector(".project2ScreenTaskbar");
 project2ScreenTaskbar.addEventListener("click", function() {
  handleWindowTap(project2Screen);
 });

  var project3ScreenTaskbar = document.querySelector(".project3ScreenTaskbar");
 project3ScreenTaskbar.addEventListener("click", function() {
  handleWindowTap(project3Screen);
 });

  var welcomeTaskbar = document.querySelector(".welcomeTaskbar");
  welcomeTaskbar.addEventListener("click", function() {
  handleWindowTap(welcome);
 });

  var settingsScreenTaskbar = document.querySelector(".settingsScreenTaskbar");
  settingsScreenTaskbar.addEventListener("click", function() {
  handleWindowTap(settingsScreen);
 });

function handleWindowTap(element) {
  biggestIndex++;  // Increment biggestIndex by 1
  element.style.zIndex = biggestIndex;
  taskBar.style.zIndex = biggestIndex + 1;
}

var body = document.querySelector("body");
var wallpaper1 = document.querySelector("#wallpaper1");
var wallpaper2 = document.querySelector("#wallpaper2");

if (wallpaper1) {
  wallpaper1.addEventListener("click", function() {
    body.style.backgroundImage = "url(./wallpaper.jpg)";
  });
}

if (wallpaper2) {
  wallpaper2.addEventListener("click", function() {
    body.style.backgroundImage = "url(./wallpaper2.jpg)";
  });
}

