// VARIABLES:
 //Taskbar
   var taskBar = document.querySelector("#taskBar")

 //Screens
   //welcome
    //var welcomeScreenOpen = document.querySelector("#openwelcome");
    var welcomeScreenClose = document.querySelector("#welcomeclose");
    var welcomeScreen = document.querySelector("#welcome")
    var welcomeTaskbar = document.querySelector(".welcomeTaskbar");
    dragElement(document.getElementById("welcome"));

   //Projects
     var projectsScreenClose = document.querySelector("#projectsclose");
     var projectsScreen = document.querySelector("#projectsScreen")
     var projectsIcon = document.querySelector("#projectsIcon");
     var projectsScreenTaskbar = document.querySelector(".projectsScreenTaskbar");
     var settingsIcon = document.querySelector("#settingsIcon");
     dragElement(document.getElementById("projectsScreen"));

   //Project1
     var project1ScreenClose = document.querySelector("#project1close");
     var project1Screen = document.querySelector("#project1Screen");
     var project1Icon = document.querySelector("#project1Icon");
     var project1ScreenTaskbar = document.querySelector(".project1ScreenTaskbar");
     dragElement(document.getElementById("project1Screen"));

   //Project2
     var project2ScreenClose = document.querySelector("#project2close");
     var project2Screen = document.querySelector("#project2Screen");
     var project2Icon = document.querySelector("#project2Icon");
     var project2ScreenTaskbar = document.querySelector(".project2ScreenTaskbar");
     dragElement(document.getElementById("project2Screen"));

   //Project3
     var project3ScreenClose = document.querySelector("#project3close");
     var project3Screen = document.querySelector("#project3Screen");
     var project3Icon = document.querySelector("#project3Icon");
     var project3ScreenTaskbar = document.querySelector(".project3ScreenTaskbar");
     dragElement(document.getElementById("project3Screen"));

   //Settings
      var settingsScreenClose = document.querySelector("#settingsclose");
      var settingsScreen = document.querySelector("#settingsScreen");
      var settingsScreenTaskbar = document.querySelector(".settingsScreenTaskbar");
      var body = document.querySelector("body");
      var wallpaper1 = document.querySelector("#wallpaper1");
      var wallpaper2 = document.querySelector("#wallpaper2");
      dragElement(settingsScreen);

   //Start menu
     var startMenuScreen = document.querySelector("#startMenuScreen");
     var startMenuScreenOpen = document.querySelector("#openwelcome");

   //Sticky Notes
    var stickyNotesScreen = document.querySelector("#stickyNotesScreen");
    var stickyNotesScreenClose = document.querySelector("#stickyNotesScreenClose");
    var stickyNotesIcon = document.querySelector("#stickyNotesIcon");
    var stickyNotesScreenTaskbar = document.querySelector(".stickyNotesScreenTaskbar");
    dragElement(stickyNotesScreen);


// GENERAL FUNCTIONS:
   // Time
      function updateTime() {
       var currentTime = new Date().toLocaleString();
       var timeText = document.querySelector("#timeElement");
       timeText.innerHTML = currentTime;
      }
      setInterval(updateTime, 1000);
   // Make the DIV element draggable:
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
          var newTop = element.offsetTop - currentY;
          var newLeft = element.offsetLeft - currentX;
          var maxLeft = document.documentElement.clientWidth - (element.offsetWidth / 2);
          newLeft = Math.max(0, Math.min(newLeft, maxLeft));
          element.style.top = newTop + "px";
          element.style.left = newLeft + "px";
        }

        // Step 12: Define the `stopDragging` function to stop tracking mouse movement by removing the event listeners.
        function stopDragging() {
          document.onmouseup = null;
          document.onmousemove = null;
        }
      }
    // Get the taskbar icon by id
      function getTaskbarIcon(element) {
        return document.querySelector("." + element.id + "Taskbar");
      }
    // Close windows
      function closeWindow(element) {
        element.style.display = "none"
        const screenTaskbar = getTaskbarIcon(element);
        if (screenTaskbar) {
          screenTaskbar.style.display = "none";
        }
      }
    // Open windows
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
    // Select and deselect icons
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
    // Handle icon taps
      function handleIconTap(element) {
        const screenId = element.id.replace("Icon", "Screen");
        const screenElement = document.querySelector("#" + screenId);
        if (element.classList.contains("selected")) {
          deselectIcon(element);
          openWindow(screenElement);
        } else {
          selectIcon(element);
        }
      }
    // Handle window taps
       var biggestIndex = 1;
       function addWindowTapHandling(element) {
        element.addEventListener("mousedown", () =>
          handleWindowTap(element)
        )
       }
       function handleWindowTap(element) {
          biggestIndex++;  // Increment biggestIndex by 1
          element.style.zIndex = biggestIndex;
          taskBar.style.zIndex = biggestIndex + 1;
          if (element !== startMenuScreen && startMenuScreen.style.display === "flex") {
            closeWindow(startMenuScreen);
          }
        }

/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("settingsSidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("settingsSidenav").style.width = "0";
}


// Logic for every screen
  //welcome
    welcomeScreenClose.addEventListener("click", function() {
      closeWindow(welcomeScreen);
    });

    startMenuWelcomeIcon.addEventListener("click", function() {
      openWindow(welcomeScreen);
      closeWindow(startMenuScreen);
    });

    //welcomeScreenOpen.addEventListener("click", function() {
      //openWindow(welcomeScreen);
    //});

  //projects
    projectsScreenClose.addEventListener("click", function() {
      closeWindow(projectsScreen);
    });

    projectsScreenTaskbar.addEventListener("click", function() {
      handleWindowTap(projectsScreen);
    });

    projectsIcon.addEventListener("click", function() {
      handleIconTap(projectsIcon);
    });

    startMenuProjectsIcon.addEventListener("click", function() {
      openWindow(projectsScreen);
      closeWindow(startMenuScreen);
    });

  //settings
    settingsIcon.addEventListener("click", function() {
      handleIconTap(settingsIcon);
    });
      startMenuSettingsIcon.addEventListener("click", function() {
      openWindow(settingsScreen);
      closeWindow(startMenuScreen);
    });

    settingsScreenClose.addEventListener("click", function() {
      closeWindow(settingsScreen);
    });
  
  //project1
    project1ScreenClose.addEventListener("click", function() {
      closeWindow(project1Screen);
    });

    project1Icon.addEventListener("click", function() {
      handleIconTap(project1Icon);
    });

    project1ScreenTaskbar.addEventListener("click", function() {
    handleWindowTap(project1Screen);
    });
    
  //project2
    project2ScreenClose.addEventListener("click", function() {
          closeWindow(project2Screen);
    });

    project2ScreenTaskbar.addEventListener("click", function() {
     handleWindowTap(project2Screen);
   });

    project2Icon.addEventListener("click", function() {
     handleIconTap(project2Icon);
    });

  //project3
    project3ScreenClose.addEventListener("click", function() {
      closeWindow(project3Screen);
    });

    project3Icon.addEventListener("click", function() {
     handleIconTap(project3Icon);
    });


    project3ScreenTaskbar.addEventListener("click", function() {
      handleWindowTap(project3Screen);
    });

      //Start menu
    startMenuScreenOpen.addEventListener("click", function() {
      if (startMenuScreen.style.display === "none") {
        openWindow(startMenuScreen);
      } else {
        closeWindow(startMenuScreen);
      }
    });

  //Taskbar
     welcomeTaskbar.addEventListener("click", function() {
      handleWindowTap(welcome);
     });
     
     settingsScreenTaskbar.addEventListener("click", function() {
     handleWindowTap(settingsScreen);
     });

// Settings code
  // Change wallpaper
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

  const wallpaperUpload = document.querySelector("#wallpaperUpload");

    if (wallpaperUpload) {
      wallpaperUpload.addEventListener("change", function () {
        const file = wallpaperUpload.files[0];

        if (file) {
          const imageUrl = URL.createObjectURL(file);
          document.body.style.backgroundImage = `url("${imageUrl}")`;
        }
      });
    }
   //Fonts
   courierNew.addEventListener("click", function() {
    document.body.style.fontFamily = "Courier New, monospace";
  });

  arial.addEventListener("click", function() {
    document.body.style.fontFamily = "Arial, sans-serif";
  });

  timesNewRoman.addEventListener("click", function() {
    document.body.style.fontFamily = "Times New Roman, serif";
  });


wallpaperButton.addEventListener("click", function() {
  wallpaperSection.style.display = "flex";
  fontsSection.style.display = "none";
  deviceInfoSection.style.display = "none";
  closeNav();
});

fontsButton.addEventListener("click", function() {
  wallpaperSection.style.display = "none";
  fontsSection.style.display = "flex";
  deviceInfoSection.style.display = "none";
  closeNav();
});

deviceInfoButton.addEventListener("click", function() {
  wallpaperSection.style.display = "none";
  fontsSection.style.display = "none";
  deviceInfoSection.style.display = "flex";
  closeNav();
});

//Device info
const cpuCoresElement = document.getElementById("cpuCores");
const cpuCores = navigator.hardwareConcurrency;
cpuCoresElement.textContent = cpuCores;
const ramElement = document.getElementById("ramSize");
if (ramElement) {
  if (navigator.deviceMemory) {
    const ram = navigator.deviceMemory;
    ramElement.textContent = ram + " GB";
  } else {
    ramElement.textContent = "Not available";
  }
}
const platformElement = document.getElementById("platform");
const platform = navigator.platform;
platformElement.textContent = platform;

// Sticky Notes code
  stickyNotesIcon.addEventListener("click", function() {
    handleIconTap(stickyNotesIcon);
  });

  stickyNotesScreenClose.addEventListener("click", function() {
    closeWindow(stickyNotesScreen);
  });

  stickyNotesScreenTaskbar.addEventListener("click", function() {
    handleWindowTap(stickyNotesScreen);
  });
