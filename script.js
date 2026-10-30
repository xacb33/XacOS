// VARIABLES:
const currentUrl = window.location.href;
 //Taskbar
   var taskBar = document.querySelector("#taskBar")
  var taskbarActiveIndicator = document.querySelector("#taskbarActiveIndicator");

 //Screens
   //aboutMe
    //var aboutMeScreenOpen = document.querySelector("#openaboutMe");
    var aboutMeScreenClose = document.querySelector("#aboutMeclose");
    var aboutMeScreen = document.querySelector("#aboutMe")
    var aboutMeTaskbar = document.querySelector(".aboutMeTaskbar");
    dragElement(document.getElementById("aboutMe"));

   //Projects
     var projectsScreenClose = document.querySelector("#projectsclose");
     var projectsScreen = document.querySelector("#projectsScreen")
     var projectsIcon = document.querySelector("#projectsIcon");
    var documentsPath = document.getElementById("documentsPath");
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
      var wallpaper3 = document.querySelector("#wallpaper3");
      const themeButton = document.getElementById("themeButton");
      const themeSection = document.getElementById("themeSection");
      const themeColorPicker = document.getElementById("themeColorPicker");
      const themeDefaultButton = document.getElementById("themeDefaultButton");
      const securityButton = document.getElementById("SecurityButton");
      const securitySection = document.getElementById("securitySection");
      const factoryResetButton = document.getElementById("FactoryResetSectionButton");
      const factoryResetSection = document.getElementById("factoryResetSection");

      dragElement(settingsScreen);

      

   //Start menu
     var startMenuScreen = document.querySelector("#startMenuScreen");
     var startMenuScreenOpen = document.querySelector("#openaboutMe");

   //Sticky Notes
    var stickyNotesScreen = document.querySelector("#stickyNotesScreen");
    var stickyNotesScreenClose = document.querySelector("#stickyNotesScreenClose");
    var stickyNotesIcon = document.querySelector("#stickyNotesIcon");
    var stickyNotesScreenTaskbar = document.querySelector(".stickyNotesScreenTaskbar");
    var stickyNotesNewNoteButton = document.querySelector("#newNoteButton");
    dragElement(stickyNotesScreen);


// GENERAL FUNCTIONS:

   //Set settings from localStorageº
    //Wallpaper
    const savedWallpaper = localStorage.getItem("xacos.wallpaper");
    if (savedWallpaper) {
      document.body.style.backgroundImage = `url("${savedWallpaper}")`;
    }

    //Font
    const savedFont = localStorage.getItem("xacos.font");
    if (savedFont) {
      document.body.style.fontFamily = savedFont;
    }
    
   //GPU info
   const gpuInfoElement = document.getElementById("gpuInfo");
    if (gpuInfoElement) {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (gl) {
        const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
        if (debugInfo) {
          const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
          const gpuModel = renderer
            .replace(/ANGLE \(|Direct3D11|Direct3D12|OpenGL Engine|\)/gi, "")
            .trim();
          gpuInfoElement.textContent = gpuModel;
        } else {
          gpuInfoElement.textContent = "Not available";
        }
      } else {
        gpuInfoElement.textContent = "Not available";
      }
    }
    
   // Fullscreen
   const elem = document.documentElement;
   let fullscreenRequested = false;
   elem.addEventListener("click", function() {
     if (fullscreenRequested) {
       return;
     }
     fullscreenRequested = true;
     if (elem.requestFullscreen) {
       elem.requestFullscreen();
     } else if (elem.mozRequestFullScreen) { /* Firefox */
       elem.mozRequestFullScreen();
     } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
       elem.webkitRequestFullscreen();
     } else if (elem.msRequestFullscreen) { /* IE/Edge */
       elem.msRequestFullscreen();
     }
     const sound = new Audio("oobe.wav");
     sound.play();
   });
   // Time
      function updateTime() {
       var currentDate = new Date();
       var timeText = document.querySelector("#timeElementHour");
       var dateText = document.querySelector("#timeElementDate");

       timeText.textContent = currentDate.toLocaleTimeString([], {
         hour: "2-digit",
         minute: "2-digit"
       });
       dateText.textContent = currentDate.toLocaleDateString();
      }
      updateTime();
      setInterval(updateTime, 10000);
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
      // Move the indicator below the visible window with the highest z-index.
        function updateTaskbarIndicator() {
          var activeWindow = Array.from(document.querySelectorAll(".window"))
            .filter(function(windowElement) {
              return windowElement.style.display !== "none" &&
                getTaskbarIcon(windowElement) &&
                !windowElement.classList.contains("zoom-out");
            })
            .sort(function(firstWindow, secondWindow) {
              return Number(secondWindow.style.zIndex || 0) - Number(firstWindow.style.zIndex || 0);
            })[0];

          if (!activeWindow) {
            taskbarActiveIndicator.classList.remove("visible");
            return;
          }

          var activeIcon = getTaskbarIcon(activeWindow);
          taskbarActiveIndicator.style.left =
            activeIcon.offsetLeft + activeIcon.offsetWidth / 2 - taskbarActiveIndicator.offsetWidth / 2 + "px";
          taskbarActiveIndicator.classList.add("visible");
        }
    // Close windows
      function closeWindow(element) {
        if (element === startMenuScreen) {
          closeStartMenu();
          return;
        }

        element.classList.remove("zoom-in");
        element.classList.add("zoom-out");
        element.addEventListener("animationend", function hideWindow() {
          element.style.display = "none";
          element.classList.remove("zoom-out");
          element.removeEventListener("animationend", hideWindow);
        });

        const screenTaskbar = getTaskbarIcon(element);
        if (screenTaskbar) {
          screenTaskbar.style.display = "none";
        }
        updateTaskbarIndicator();
      }
    // Open start menu
      function openStartMenu() {
        startMenuScreen.style.display = "flex";
        requestAnimationFrame(() => {
          startMenuScreen.classList.add("open");
        });
        biggestIndex++;  // Increment biggestIndex by 1
        startMenuScreen.style.zIndex = biggestIndex;
        taskBar.style.zIndex = biggestIndex + 1;
      }
    // Close start menu
      function closeStartMenu() {
        startMenuScreen.classList.remove("open");
        startMenuScreen.addEventListener("transitionend", function hideMenu() {
          startMenuScreen.style.display = "none";
          startMenuScreen.removeEventListener("transitionend", hideMenu);
        });
      }
    // Open windows
      function openWindow(element) {
        element.style.display = "flex";
        element.classList.remove("zoom-in");
        void element.offsetWidth;
        element.classList.add("zoom-in");
        biggestIndex++;  // Increment biggestIndex by 1
        element.style.zIndex = biggestIndex;
        taskBar.style.zIndex = biggestIndex + 1;
        const screenTaskbar = getTaskbarIcon(element);
        if (screenTaskbar) {
          screenTaskbar.style.display = "flex";
        }
        updateTaskbarIndicator();
        if (element === projectsScreen) {
          creatorProjectsArea.style.display = "none";
          explorerHomeContent.style.display = "flex";
          renderSavedNotes();
        }
      }
    // Select and deselect icons
      var selectedIcon = undefined
      function selectIcon(element) {
        if (selectedIcon && selectedIcon !== element) {
          selectedIcon.classList.remove("selected");
        }
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
          if (element === projects) {
            creatorProjectsArea.style.display = "flex";
            explorerHomeContent.style.display = "none";
          } else {
            openWindow(screenElement);
          }

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
         updateTaskbarIndicator();
          if (element !== startMenuScreen && startMenuScreen.style.display === "flex") {
            closeStartMenu();
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
  //aboutMe
    aboutMeScreenClose.addEventListener("click", function() {
      closeWindow(aboutMeScreen);
    });

    startMenuaboutMeIcon.addEventListener("click", function() {
      openWindow(aboutMeScreen);
      closeStartMenu();
    });

    //aboutMeScreenOpen.addEventListener("click", function() {
      //openWindow(aboutMeScreen);
    //});

  //projects
    var backToMainProjectsButton = document.getElementById("backToMainProjectsButton");
    backToMainProjectsButton.addEventListener("click", function() {
      creatorProjectsArea.style.display = "none";
      explorerHomeContent.style.display = "flex";
    });
    projectsScreenClose.addEventListener("click", function() {
      closeWindow(projectsScreen);
    });

    projectsScreenTaskbar.addEventListener("click", function() {
      handleWindowTap(projectsScreen);
    });

    projectsIcon.addEventListener("click", function() {
      handleIconTap(projectsIcon);
      const username = localStorage.getItem("xacos.username") || "User";
      documentsPath.textContent = "C:/Users/" + username + "/Documents/";
      projectsPath.textContent = "C:/Users/" + username + "/Documents/Projects/";
    });

    startMenuProjectsIcon.addEventListener("click", function() {
      openWindow(projectsScreen);
      closeStartMenu();
      const username = localStorage.getItem("xacos.username") || "User";
      documentsPath.textContent = "C:/Users/" + username + "/Documents/";
      projectsPath.textContent = "C:/Users/" + username + "/Documents/Projects/";
    });

    const projects = document.getElementById("projects");
    projects.addEventListener("click", function() {
     handleIconTap(projects);
    });

  //settings
    settingsIcon.addEventListener("click", function() {
      handleIconTap(settingsIcon);
    });
      startMenuSettingsIcon.addEventListener("click", function() {
      openWindow(settingsScreen);
      closeStartMenu();
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
        openStartMenu();
      } else {
        closeStartMenu();
      }
    });

  //Taskbar
     aboutMeTaskbar.addEventListener("click", function() {
      handleWindowTap(aboutMe);
     });
     
     settingsScreenTaskbar.addEventListener("click", function() {
     handleWindowTap(settingsScreen);
     });

// Settings code
  // Change wallpaper
    if (wallpaper1) {
      wallpaper1.addEventListener("click", function() {
        body.style.backgroundImage = "url(./wallpaper.jpg)";
        localStorage.setItem("xacos.wallpaper", "./wallpaper.jpg");
      });
    }

    if (wallpaper2) {
      wallpaper2.addEventListener("click", function() {
        body.style.backgroundImage = "url(./wallpaper2.jpg)";
        localStorage.setItem("xacos.wallpaper", "./wallpaper2.jpg");
      });
    }

    if (wallpaper3) {
      wallpaper3.addEventListener("click", function() {
        body.style.backgroundImage = "url(./wallpaper3.jpg)";
        localStorage.setItem("xacos.wallpaper", "./wallpaper3.jpg");
      });
    }

  const wallpaperUpload = document.querySelector("#wallpaperUpload");

    if (wallpaperUpload) {
      wallpaperUpload.addEventListener("change", function () {
        const file = wallpaperUpload.files[0];

        if (file) {
          const imageUrl = URL.createObjectURL(file);
          document.body.style.backgroundImage = `url("${imageUrl}")`;
          localStorage.setItem("xacos.wallpaper", imageUrl);
        }
      });
    }
   //Fonts
   courierNew.addEventListener("click", function() {
    document.body.style.fontFamily = "Courier New, monospace";
    localStorage.setItem("xacos.font", "Courier New, monospace");

  });

  arial.addEventListener("click", function() {
    document.body.style.fontFamily = "Arial, sans-serif";
    localStorage.setItem("xacos.font", "Arial, sans-serif");
  });

  timesNewRoman.addEventListener("click", function() {
    document.body.style.fontFamily = "Times New Roman, serif";
    localStorage.setItem("xacos.font", "Times New Roman, serif");
  });

    Saira.addEventListener("click", function() {
    document.body.style.fontFamily = "Saira";
    localStorage.setItem("xacos.font", "Saira");
  });



wallpaperButton.addEventListener("click", function() {
  wallpaperSection.style.display = "flex";
  fontsSection.style.display = "none";
  deviceInfoSection.style.display = "none";
  securitySection.style.display = "none";
  themeSection.style.display = "none";
  factoryResetSection.style.display = "none";
  closeNav();
});

fontsButton.addEventListener("click", function() {
  wallpaperSection.style.display = "none";
  fontsSection.style.display = "flex";
  deviceInfoSection.style.display = "none";
  securitySection.style.display = "none";
  themeSection.style.display = "none";
  factoryResetSection.style.display = "none";
  closeNav();
});

deviceInfoButton.addEventListener("click", function() {
  wallpaperSection.style.display = "none";
  fontsSection.style.display = "none";
  deviceInfoSection.style.display = "flex";
  securitySection.style.display = "none";
  themeSection.style.display = "none";
  factoryResetSection.style.display = "none";
  closeNav();
});

themeButton.addEventListener("click", function() {
  wallpaperSection.style.display = "none";
  fontsSection.style.display = "none";
  deviceInfoSection.style.display = "none";
  themeSection.style.display = "flex";
  securitySection.style.display = "none";
  factoryResetSection.style.display = "none";
  themeColorPicker.value = localStorage.getItem("xacos.themeColor") || "#0078D7";
  closeNav();
});

securityButton.addEventListener("click", function() {
  wallpaperSection.style.display = "none";
  fontsSection.style.display = "none";
  deviceInfoSection.style.display = "none";
  themeSection.style.display = "none";
  securitySection.style.display = "block";
  factoryResetSection.style.display = "none";
  closeNav();
});

factoryResetButton.addEventListener("click", function() {
  wallpaperSection.style.display = "none";
  fontsSection.style.display = "none";
  deviceInfoSection.style.display = "none";
  securitySection.style.display = "none";
  themeSection.style.display = "none";
  factoryResetSection.style.display = "block";
  closeNav();
});

//Factory Reset
const factoryResetConfirmButton = document.getElementById("factoryResetButton");
factoryResetConfirmButton.addEventListener("click", function() {
  if (confirm("Are you sure you want to reset your device? THIS IS THE LAST WARNING!")) {
    localStorage.clear();
    location.reload();
  }
});

//Device info
const cpuCoresElement = document.getElementById("cpuCores");
const cpuCores = navigator.hardwareConcurrency;
cpuCoresElement.textContent = cpuCores;
const ramElement = document.getElementById("ramSize");
if (ramElement) {
  if (navigator.deviceMemory) {
    const ram = navigator.deviceMemory;
    ramElement.textContent = ram + " GB aprox.";
  } else {
    ramElement.textContent = "Not available";
  }
}
const platformElement = document.getElementById("platform");
const platform = navigator.platform;
platformElement.textContent = platform;

//Themes

const defaultThemeColor = "#0078D7";
const savedThemeColor = localStorage.getItem("xacos.themeColor");
themeColorPicker.value = savedThemeColor || defaultThemeColor;
if (savedThemeColor) {
  document.documentElement.style.setProperty("--theme-color", savedThemeColor);
} else {
  document.documentElement.style.removeProperty("--theme-color");
}

themeColorPicker.addEventListener("input", function() {
  const selectedColor = themeColorPicker.value;
  localStorage.setItem("xacos.themeColor", selectedColor);
  document.documentElement.style.setProperty("--theme-color", selectedColor);
}); 

themeDefaultButton.addEventListener("click", function() {
  localStorage.removeItem("xacos.themeColor");
  document.documentElement.style.removeProperty("--theme-color");
  themeColorPicker.value = defaultThemeColor;
});

// Sticky Notes code
  stickyNotesIcon.addEventListener("click", function() {
    handleIconTap(stickyNotesIcon);
  });

  startMenuStickyNoteIcon.addEventListener("click", function() {
    openWindow(stickyNotesScreen);
    closeStartMenu();
  });

  stickyNotesScreenClose.addEventListener("click", function() {
    closeWindow(stickyNotesScreen);
  });

  stickyNotesScreenTaskbar.addEventListener("click", function() {
    handleWindowTap(stickyNotesScreen);
  });

//Notepad
const saveNotesButton = document.getElementById("saveNotesButton");
const exportNotesButton = document.getElementById("exportNotesButton");
const stickyNotesTitleArea = document.getElementById("stickyNotesTitleArea");
const notepadTextarea = document.getElementById("stickyNotesTextarea");
const savedNotesList = document.getElementById("savedNotesList");
let currentNoteId = null;

function getSavedNotes() {
  try {
    const notes = JSON.parse(localStorage.getItem("xacos.notes") || "[]");
    return Array.isArray(notes) ? notes : [];
  } catch (error) {
    return [];
  }
}

function renderSavedNotes() {
  const notes = getSavedNotes();
  savedNotesList.replaceChildren();

  notes.forEach(function(note) {
    const noteItem = document.createElement("div");
    noteItem.className = "saved-note-item";

    const displayTitle = note.title || "Untitled note";
    const openButton = document.createElement("button");
    openButton.type = "button";
    openButton.className = "saved-note-open";
    openButton.setAttribute("aria-label", "Open " + displayTitle);

    const noteIcon = document.createElement("img");
    noteIcon.src = "sticky_note.png";
    noteIcon.width = 50;
    noteIcon.height = 50;
    noteIcon.alt = "";

    const noteTitle = document.createElement("p");
    noteTitle.textContent = displayTitle;

    openButton.append(noteIcon, noteTitle);
    openButton.addEventListener("click", function() {
      if (!openButton.classList.contains("selected")) {
        const selectedNoteButton = savedNotesList.querySelector(".saved-note-open.selected");
        if (selectedNoteButton) {
          selectedNoteButton.classList.remove("selected");
        }
        openButton.classList.add("selected");
        return;
      }

      openButton.classList.remove("selected");
      currentNoteId = note.id;
      stickyNotesTitleArea.value = note.title || "";
      notepadTextarea.value = note.content || "";
      openWindow(stickyNotesScreen);
    });

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "saved-note-delete";
    deleteButton.textContent = "×";
    deleteButton.title = "Delete " + displayTitle;
    deleteButton.setAttribute("aria-label", "Delete " + displayTitle);
    deleteButton.addEventListener("click", function() {
      if (!confirm("Delete \"" + displayTitle + "\"?")) {
        return;
      }

      const remainingNotes = getSavedNotes().filter(function(savedNote) {
        return savedNote.id !== note.id;
      });
      localStorage.setItem("xacos.notes", JSON.stringify(remainingNotes));

      if (currentNoteId === note.id) {
        currentNoteId = null;
        stickyNotesTitleArea.value = "";
        notepadTextarea.value = "";
      }

      renderSavedNotes();
    });

    noteItem.append(openButton, deleteButton);
    savedNotesList.appendChild(noteItem);
  });
}

function hasUnsavedNoteChanges() {
  const title = stickyNotesTitleArea.value;
  const content = notepadTextarea.value;

  if (!title.trim() && !content.trim()) {
    return false;
  }

  if (!currentNoteId) {
    return true;
  }

  const savedNote = getSavedNotes().find(function(note) {
    return note.id === currentNoteId;
  });

  return !savedNote || savedNote.title !== title || savedNote.content !== content;
}

stickyNotesNewNoteButton.addEventListener("click", function() {
  if (hasUnsavedNoteChanges() && !confirm("Discard unsaved changes and create a new note?")) {
    return;
  }

  stickyNotesTitleArea.value = "";
  notepadTextarea.value = "";
  currentNoteId = null;
});

saveNotesButton.addEventListener("click", function() {
  const notes = getSavedNotes();
  const title = stickyNotesTitleArea.value.trim();

  if (!title) {
    alert("Enter a title before saving the note.");
    return;
  }

  const duplicateTitle = notes.find(function(savedNote) {
    return savedNote.id !== currentNoteId &&
      savedNote.title.trim().toLowerCase() === title.toLowerCase();
  });

  if (duplicateTitle) {
    alert("A note with this title already exists.");
    return;
  }

  const note = {
    id: currentNoteId || crypto.randomUUID(),
    title: title,
    content: notepadTextarea.value,
  };

  currentNoteId = note.id;
  const noteIndex = notes.findIndex(function(savedNote) {
    return savedNote.id === note.id;
  });

  if (noteIndex === -1) {
    notes.push(note);
  } else {
    notes[noteIndex] = note;
  }

  localStorage.setItem("xacos.notes", JSON.stringify(notes));
  renderSavedNotes();
});

renderSavedNotes();

exportNotesButton.addEventListener("click", function() {
  const textToExport = notepadTextarea.value;
  const blob = new Blob([textToExport], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  var title = stickyNotesTitleArea.value.trim();
  a.download = title ? title + ".txt" : "note.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}); 

//OOBE
const arialOOBE = document.getElementById("arialOOBE");
const courierNewOOBE = document.getElementById("courierNewOOBE");
const timesNewRomanOOBE = document.getElementById("timesNewRomanOOBE");
const SairaOOBE = document.getElementById("SairaOOBE");

const OOBEScreen = document.getElementById("OOBEScreen");
const OOBEScreen1 = document.getElementById("OOBEScreen1");
const OOBEScreen2 = document.getElementById("OOBEScreen2");
const OOBEScreen3 = document.getElementById("OOBEScreen3");
const OOBEScreen4 = document.getElementById("OOBEScreen4");
const OOBEScreen5 = document.getElementById("OOBEScreen5");
const OOBEClose = document.getElementById("OOBEClose");
const OOBEScreenTaskbar = document.querySelector(".OOBEScreenTaskbar");
const lowGraphicsModeCheckbox = document.getElementById("OOBECheckbox1");
const lowGraphicsModeSettingsCheckbox = document.getElementById("lowGraphicsCheckbox");
const OOBECompleted = localStorage.getItem("xacos.oobeCompleted") === "true";

if (!OOBECompleted) {
  OOBEScreen.style.display = "flex";
  OOBEScreenTaskbar.style.display = "flex";
}


arialOOBE.addEventListener("click", function() {
  document.body.style.fontFamily = "Arial, sans-serif";
  localStorage.setItem("xacos.font", "Arial, sans-serif");
});

courierNewOOBE.addEventListener("click", function() {
  document.body.style.fontFamily = "Courier New, monospace";
  localStorage.setItem("xacos.font", "Courier New, monospace");
});

timesNewRomanOOBE.addEventListener("click", function() {
  document.body.style.fontFamily = "Times New Roman, serif";
  localStorage.setItem("xacos.font", "Times New Roman, serif");
});

SairaOOBE.addEventListener("click", function() {
  document.body.style.fontFamily = "Saira";
  localStorage.setItem("xacos.font", "Saira");
});
function setLowGraphicsMode(enabled) {
  document.body.classList.toggle("low-end-mode", enabled);
  localStorage.setItem("xacos.lowGraphicsMode", enabled);
}

const lowGraphicsModeEnabled = localStorage.getItem("xacos.lowGraphicsMode") === "true";
lowGraphicsModeCheckbox.checked = lowGraphicsModeEnabled;
setLowGraphicsMode(lowGraphicsModeEnabled);
lowGraphicsModeCheckbox.addEventListener("change", function() {
  setLowGraphicsMode(lowGraphicsModeCheckbox.checked);
});

lowGraphicsModeSettingsCheckbox.addEventListener("change", function() {
  setLowGraphicsMode(lowGraphicsModeSettingsCheckbox.checked);
});

OOBEClose.addEventListener("click", function() {
  closeWindow(OOBEScreen);
});

OOBEScreenTaskbar.addEventListener("click", function() {
  handleWindowTap(OOBEScreen);
});

dragElement(OOBEScreen);

function showOOBEScreen(screenToShow) {
  const screens = [OOBEScreen1, OOBEScreen2, OOBEScreen3, OOBEScreen4, OOBEScreen5, OOBEScreen6, OOBEScreen7];
  screens.forEach(function(screen) {
    screen.style.display = screen === screenToShow ? "block" : "none";
  });
}

const OOBEArrow1 = document.getElementById("OOBEArrow1");
OOBEArrow1.addEventListener("click", function() {
  showOOBEScreen(OOBEScreen2);
});

const OOBEArrow2 = document.getElementById("OOBEArrow2");
OOBEArrow2.addEventListener("click", function() {
  showOOBEScreen(OOBEScreen3);
});

const OOBEArrow3 = document.getElementById("OOBEArrow3");
OOBEArrow3.addEventListener("click", function() {
  showOOBEScreen(OOBEScreen4);
});

const OOBEArrow4 = document.getElementById("OOBEArrow4");
OOBEArrow4.addEventListener("click", function() {
  showOOBEScreen(OOBEScreen5);
});

const OOBEArrow5 = document.getElementById("OOBEArrow5");
OOBEArrow5.addEventListener("click", function() {
  localStorage.setItem("xacos.username", usernameInput.value.trim() || "User");
  localStorage.setItem("xacos.profilePicture", selectedProfilePicture.src);
  loadUserProfile();
  showOOBEScreen(OOBEScreen6);
});

const OOBEArrow6 = document.getElementById("OOBEArrow6");
OOBEArrow6.addEventListener("click", function() {
  showOOBEScreen(OOBEScreen7);
});

const OOBEArrow7 = document.getElementById("OOBEArrow7");
OOBEArrow7.addEventListener("click", function() {
  localStorage.setItem("xacos.oobeCompleted", "true");
  closeWindow(OOBEScreen);
});

const usernameInput = document.getElementById("usernameInput");
const selectedProfilePicture = document.getElementById("selectedProfilePicture");
const profilePictureOptions = document.querySelectorAll(".profile-picture-option");
const profilePicture2 = document.getElementById("profilePicture2");
const profilePicture3 = document.getElementById("profilePicture3");
const profilePicture4 = document.getElementById("profilePicture4");
const profilePicture5 = document.getElementById("profilePicture5");
const profilePicture6 = document.getElementById("profilePicture6");
const profilePicture7 = document.getElementById("profilePicture7");
const desktopProfilePicture = document.getElementById("desktopProfilePicture");
const desktopUsername = document.getElementById("desktopUsername");

function loadUserProfile() {
  desktopUsername.textContent = localStorage.getItem("xacos.username") || "User";
  desktopProfilePicture.src = localStorage.getItem("xacos.profilePicture") || "profile7.jpg";
}

const savedUsername = localStorage.getItem("xacos.username");
const savedProfilePicture = localStorage.getItem("xacos.profilePicture");
if (savedUsername) {
  usernameInput.value = savedUsername;
}
if (savedProfilePicture) {
  selectedProfilePicture.src = savedProfilePicture;
  profilePictureOptions.forEach(function(option) {
    option.classList.toggle("selected", option.src === selectedProfilePicture.src);
  });
}
loadUserProfile();

profilePicture2.addEventListener("click", function() {
  selectedProfilePicture.src = profilePicture2.src;
  profilePictureOptions.forEach(option => option.classList.remove("selected"));
  profilePicture2.classList.add("selected");
});

profilePicture3.addEventListener("click", function() {
  selectedProfilePicture.src = profilePicture3.src;
  profilePictureOptions.forEach(option => option.classList.remove("selected"));
  profilePicture3.classList.add("selected");
});

profilePicture4.addEventListener("click", function() {
  selectedProfilePicture.src = profilePicture4.src;
  profilePictureOptions.forEach(option => option.classList.remove("selected"));
  profilePicture4.classList.add("selected");
});

profilePicture5.addEventListener("click", function() {
  selectedProfilePicture.src = profilePicture5.src;
  profilePictureOptions.forEach(option => option.classList.remove("selected"));
  profilePicture5.classList.add("selected");
});

profilePicture6.addEventListener("click", function() {
  selectedProfilePicture.src = profilePicture6.src;
  profilePictureOptions.forEach(option => option.classList.remove("selected"));
  profilePicture6.classList.add("selected");
});

profilePicture7.addEventListener("click", function() {
  selectedProfilePicture.src = profilePicture7.src;
  profilePictureOptions.forEach(option => option.classList.remove("selected"));
  profilePicture7.classList.add("selected");
});

//Security
if (currentUrl === "https://xacb33.github.io/XacOS/") {
  document.getElementById("URLCheck").textContent = "URL Check: ✅ Official URL";
  document.getElementById("openSourceCheck").textContent = "Open Source Check: ✅ Passed";
  document.getElementById("authorCheck").textContent = "Original Software: ✅ Original";
} else {
  document.getElementById("URLCheck").textContent = "URL Check: ❌ Not Official URL";
  document.getElementById("openSourceCheck").textContent = "Open Source Check: ❌ Failed";
  document.getElementById("authorCheck").textContent = "Original Software: ❌ Not Original";
  if (currentUrl.includes("xacb33")) {
    document.getElementById("authorCheck").textContent = "Original Software: ✅ Original";
  }
  if (currentUrl.includes("github")) {
    document.getElementById("openSourceCheck").textContent = "Open Source Check: ✅ Passed";
  }
  document.getElementById("GeneralStatus").textContent = "⚠️ Warning";
  document.getElementById("GeneralStatus").style.color = "orange";
}

//Paint
const paintScreen = document.getElementById("paintScreen");
dragElement(paintScreen);
const paintScreenClose = document.getElementById("paintScreenClose");
paintScreenClose.addEventListener("click", function() {
  closeWindow(paintScreen);
});
const paintScreenTaskbar = document.querySelector(".paintScreenTaskbar");
paintScreenTaskbar.addEventListener("click", function() {
  handleWindowTap(paintScreen);
});
const startMenuPaintIcon = document.getElementById("startMenuPaintIcon");
startMenuPaintIcon.addEventListener("click", function() {
  openWindow(paintScreen);
  closeStartMenu();
});

