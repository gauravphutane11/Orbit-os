/* =========================================================
   ORBIT OS
   COMPLETE JAVASCRIPT
   STEP 6D

   Boot Screen
   Lock Screen
   Desktop
   Files
   Search
   Sort
   Navigation
   Window Controls
   Dragging
   File Selection
   Context Menu
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       HELPER FUNCTIONS
       ===================================================== */

    const $ = (selector, parent = document) =>
        parent.querySelector(selector);

    const $$ = (selector, parent = document) =>
        [...parent.querySelectorAll(selector)];


    /* =====================================================
       DOM REFERENCES
       ===================================================== */

    const bootScreen =
        $("#bootScreen") ||
        $(".boot-screen");

    const bootContent =
        $(".boot-content");

    const progressBar =
        $("#progressBar");

    const loadingPercent =
        $("#loadingPercent");

    const statusText =
        $("#statusText");

    const systemMessage =
        $("#systemMessage");


    const lockScreen =
        $("#lockScreen");

    const lockTime =
        $("#lockTime");

    const lockDate =
        $("#lockDate");

    const pinInput =
        $("#pinInput");

    const unlockButton =
        $("#unlockButton");

    const pinError =
        $("#pinError");

    const togglePin =
        $("#togglePin");


    const osDesktop =
        $("#osDesktop");

    const desktopTopTime =
        $("#desktopTopTime");

    const desktopTaskbarTime =
        $("#desktopTaskbarTime");

    const desktopTaskbarDate =
        $("#desktopTaskbarDate");


    const filesWindow =
        $("#filesWindow");

    const filesDesktopIcon =
        $('.desktop-app-icon[data-app="files"]');

    const taskbarCenter =
        $("#taskbarCenter");


    const filesBreadcrumb =
        $("#filesBreadcrumb") ||
        $(".files-main .breadcrumb");

    const filesHeading =
        $(".files-heading h2");

    const filesCount =
        $(".files-heading p");

    const fileGrid =
        $(".files-main .file-grid");

    const sidebarItems =
        $$(".files-sidebar .sidebar-item");

    const filesBackButton =
        $("#filesBackButton");

    const filesForwardButton =
        $("#filesForwardButton");

    const filesRefreshButton =
        $("#filesRefreshButton");

    const filesSearchInput =
        $("#filesSearchInput");

    const filesSort =
        $("#filesSort");


    /* =====================================================
       BOOT SCREEN
       ===================================================== */

    const bootMessages = [
        "Initializing core services...",
        "Loading interface modules...",
        "Checking system resources...",
        "Preparing desktop environment...",
        "Starting user services...",
        "Finalizing system...",
        "System ready."
    ];


    let progress = 0;


    const bootTimer =
        setInterval(() => {

            progress++;


            if (progressBar) {
                progressBar.style.width =
                    `${progress}%`;
            }


            if (loadingPercent) {
                loadingPercent.textContent =
                    `${progress}%`;
            }


            if (progress < 20) {

                if (statusText) {
                    statusText.textContent =
                        "Starting system...";
                }

                if (systemMessage) {
                    systemMessage.textContent =
                        bootMessages[0];
                }

            }

            else if (progress < 40) {

                if (statusText) {
                    statusText.textContent =
                        "Loading components...";
                }

                if (systemMessage) {
                    systemMessage.textContent =
                        bootMessages[1];
                }

            }

            else if (progress < 60) {

                if (statusText) {
                    statusText.textContent =
                        "Checking system...";
                }

                if (systemMessage) {
                    systemMessage.textContent =
                        bootMessages[2];
                }

            }

            else if (progress < 75) {

                if (statusText) {
                    statusText.textContent =
                        "Preparing environment...";
                }

                if (systemMessage) {
                    systemMessage.textContent =
                        bootMessages[3];
                }

            }

            else if (progress < 90) {

                if (statusText) {
                    statusText.textContent =
                        "Starting services...";
                }

                if (systemMessage) {
                    systemMessage.textContent =
                        bootMessages[4];
                }

            }

            else if (progress < 100) {

                if (statusText) {
                    statusText.textContent =
                        "Almost ready...";
                }

                if (systemMessage) {
                    systemMessage.textContent =
                        bootMessages[5];
                }

            }

            else {

                clearInterval(
                    bootTimer
                );

                if (statusText) {
                    statusText.textContent =
                        "System ready";
                }


                if (systemMessage) {
                    systemMessage.textContent =
                        bootMessages[6];
                }


                if (bootContent) {
                    bootContent.classList.add(
                        "ready"
                    );
                }


                setTimeout(() => {

                    if (bootScreen) {
                        bootScreen.classList.add(
                            "hidden"
                        );
                    }


                    if (lockScreen) {
                        lockScreen.classList.add(
                            "active"
                        );
                    }


                    if (pinInput) {
                        pinInput.focus();
                    }

                }, 700);

            }

        }, 35);


    /* =====================================================
       LOCK SCREEN CLOCK
       ===================================================== */

    function updateLockClock() {

        if (!lockTime || !lockDate) {
            return;
        }


        const now =
            new Date();


        lockTime.textContent =
            now.toLocaleTimeString(
                "en-IN",
                {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true
                }
            );


        lockDate.textContent =
            now.toLocaleDateString(
                "en-IN",
                {
                    weekday: "long",
                    month: "long",
                    day: "numeric"
                }
            );

    }


    updateLockClock();


    setInterval(
        updateLockClock,
        1000
    );


    /* =====================================================
       PIN VISIBILITY
       ===================================================== */

    togglePin?.addEventListener(
        "click",
        () => {

            if (!pinInput) {
                return;
            }


            const isPassword =
                pinInput.type === "password";


            pinInput.type =
                isPassword
                    ? "text"
                    : "password";


            togglePin.textContent =
                isPassword
                    ? "◌"
                    : "◉";

        }
    );


    /* =====================================================
       PIN ERROR
       ===================================================== */

    function showPinError(message) {

        if (pinError) {
            pinError.textContent =
                message;
        }


        const wrapper =
            $(".pin-input-wrapper");


        if (wrapper) {

            wrapper.classList.remove(
                "shake"
            );


            void wrapper.offsetWidth;


            wrapper.classList.add(
                "shake"
            );

        }

    }


    /* =====================================================
       UNLOCK
       ===================================================== */

    function unlockSystem() {

        if (!pinInput) {
            return;
        }


        const enteredPin =
            pinInput.value.trim();


        if (!enteredPin) {

            showPinError(
                "Please enter your PIN."
            );

            return;

        }


        if (enteredPin !== "1234") {

            showPinError(
                "Incorrect PIN. Try again."
            );


            pinInput.value =
                "";


            pinInput.focus();


            return;

        }


        if (pinError) {
            pinError.textContent =
                "";
        }


        if (unlockButton) {

            unlockButton.innerHTML =
                "<span>Unlocking...</span>";


            unlockButton.disabled =
                true;

        }


        if (osDesktop) {

            osDesktop.classList.add(
                "active"
            );

        }


        if (lockScreen) {

            lockScreen.classList.add(
                "unlocking"
            );

        }


        setTimeout(() => {

            if (lockScreen) {

                lockScreen.style.display =
                    "none";

            }

        }, 800);

    }


    unlockButton?.addEventListener(
        "click",
        unlockSystem
    );


    pinInput?.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {
                unlockSystem();
            }

        }
    );


    pinInput?.addEventListener(
        "input",
        () => {

            pinInput.value =
                pinInput.value.replace(
                    /[^0-9]/g,
                    ""
                );

        }
    );


    /* =====================================================
       DESKTOP CLOCK
       ===================================================== */

    function updateDesktopClock() {

        const now =
            new Date();


        const time =
            now.toLocaleTimeString(
                "en-IN",
                {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true
                }
            );


        const date =
            now.toLocaleDateString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                }
            );


        if (desktopTopTime) {
            desktopTopTime.textContent =
                time;
        }


        if (desktopTaskbarTime) {
            desktopTaskbarTime.textContent =
                time;
        }


        if (desktopTaskbarDate) {
            desktopTaskbarDate.textContent =
                date;
        }

    }


    updateDesktopClock();


    setInterval(
        updateDesktopClock,
        1000
    );


    /* =====================================================
       FILESYSTEM DATA
       ===================================================== */

    const folderData = {

        home: {
            name: "Home",

            items: [
                {
                    name: "Documents",
                    type: "folder",
                    icon: "📁",
                    target: "documents"
                },

                {
                    name: "Pictures",
                    type: "folder",
                    icon: "📁",
                    target: "pictures"
                },

                {
                    name: "Projects",
                    type: "folder",
                    icon: "📁",
                    target: "projects"
                },

                {
                    name: "readme.txt",
                    type: "file",
                    icon: "📄"
                }
            ]
        },


        favorites: {
            name: "Favorites",

            items: [
                {
                    name: "Projects",
                    type: "folder",
                    icon: "📁",
                    target: "projects"
                },

                {
                    name: "Project Report.pdf",
                    type: "file",
                    icon: "📕"
                },

                {
                    name: "readme.txt",
                    type: "file",
                    icon: "📄"
                }
            ]
        },


        documents: {
            name: "Documents",

            items: [
                {
                    name: "Web Technology",
                    type: "folder",
                    icon: "📁",
                    target: "web"
                },

                {
                    name: "DBMS",
                    type: "folder",
                    icon: "📁",
                    target: "dbms"
                },

                {
                    name: "Project Report",
                    type: "file",
                    icon: "📄"
                },

                {
                    name: "Viva Questions",
                    type: "file",
                    icon: "📄"
                }
            ]
        },


        pictures: {
            name: "Pictures",

            items: [
                {
                    name: "ORBIT Wallpaper",
                    type: "file",
                    icon: "🖼️"
                },

                {
                    name: "Profile",
                    type: "file",
                    icon: "🖼️"
                },

                {
                    name: "Screenshots",
                    type: "folder",
                    icon: "📁",
                    target: "screenshots"
                }
            ]
        },


        music: {
            name: "Music",

            items: [
                {
                    name: "Focus Mode",
                    type: "file",
                    icon: "🎵"
                },

                {
                    name: "Ambient Orbit",
                    type: "file",
                    icon: "🎵"
                },

                {
                    name: "Study Session",
                    type: "file",
                    icon: "🎵"
                }
            ]
        },


        projects: {
            name: "Projects",

            items: [
                {
                    name: "ORBIT OS",
                    type: "folder",
                    icon: "📁",
                    target: "orbit"
                },

                {
                    name: "College Project",
                    type: "folder",
                    icon: "📁",
                    target: "college"
                },

                {
                    name: "project-notes.txt",
                    type: "file",
                    icon: "📄"
                }
            ]
        },


        web: {
            name: "Web Technology",

            items: [
                {
                    name: "HTML",
                    type: "folder",
                    icon: "📁",
                    target: "html"
                },

                {
                    name: "CSS",
                    type: "folder",
                    icon: "📁",
                    target: "css"
                },

                {
                    name: "JavaScript",
                    type: "folder",
                    icon: "📁",
                    target: "javascript"
                }
            ]
        },


        dbms: {
            name: "DBMS",

            items: [
                {
                    name: "SQL Queries.sql",
                    type: "file",
                    icon: "📄"
                },

                {
                    name: "ER Diagram",
                    type: "file",
                    icon: "🖼️"
                },

                {
                    name: "Normalization",
                    type: "file",
                    icon: "📄"
                }
            ]
        },


        orbit: {
            name: "ORBIT OS",

            items: [
                {
                    name: "index.html",
                    type: "file",
                    icon: "🌐"
                },

                {
                    name: "style.css",
                    type: "file",
                    icon: "🎨"
                },

                {
                    name: "app.js",
                    type: "file",
                    icon: "⚙️"
                }
            ]
        },


        college: {
            name: "College Project",

            items: [
                {
                    name: "Documentation",
                    type: "file",
                    icon: "📄"
                },

                {
                    name: "Presentation",
                    type: "file",
                    icon: "📊"
                }
            ]
        },


        html: {
            name: "HTML",

            items: [
                {
                    name: "index.html",
                    type: "file",
                    icon: "🌐"
                }
            ]
        },


        css: {
            name: "CSS",

            items: [
                {
                    name: "style.css",
                    type: "file",
                    icon: "🎨"
                }
            ]
        },


        javascript: {
            name: "JavaScript",

            items: [
                {
                    name: "app.js",
                    type: "file",
                    icon: "⚙️"
                }
            ]
        },


        screenshots: {
            name: "Screenshots",

            items: [
                {
                    name: "desktop.png",
                    type: "file",
                    icon: "🖼️"
                },

                {
                    name: "lockscreen.png",
                    type: "file",
                    icon: "🖼️"
                }
            ]
        }

    };


    /* =====================================================
       FILE STATE
       ===================================================== */

    let currentFolder =
        "home";

    let searchQuery =
        "";

    let sortMode =
        "name-asc";


    const backHistory =
        [];

    const forwardHistory =
        [];


    /* =====================================================
       PARENT FOLDERS
       ===================================================== */

    const parentFolders = {

        home: null,
        favorites: null,

        documents: "home",
        pictures: "home",
        music: "home",
        projects: "home",

        web: "documents",
        dbms: "documents",

        orbit: "projects",
        college: "projects",

        html: "web",
        css: "web",
        javascript: "web",

        screenshots: "pictures"

    };


    /* =====================================================
       SELECTION STATE
       ===================================================== */

    let selectedFileCard =
        null;

    let selectedFileData =
        null;


    function clearFileSelection() {

        selectedFileCard?.classList.remove(
            "selected"
        );


        selectedFileCard =
            null;


        selectedFileData =
            null;

    }


    function getFileData(card) {

        if (!card) {
            return null;
        }


        return {

            name:
                $(".file-card-name", card)?.textContent ||
                "Unknown",

            type:
                card.dataset.type ||
                "file",

            target:
                card.dataset.target ||
                null

        };

    }


    /* =====================================================
       CONTEXT MENU
       ===================================================== */

    let fileContextMenu =
        $("#fileContextMenu");


    /*
     * Create the menu automatically if
     * it is not present in index.html.
     */

    if (!fileContextMenu) {

        fileContextMenu =
            document.createElement(
                "div"
            );


        fileContextMenu.id =
            "fileContextMenu";


        fileContextMenu.className =
            "file-context-menu";


        fileContextMenu.innerHTML = `

            <button
                type="button"
                data-file-action="open"
            >
                Open
            </button>

            <button
                type="button"
                data-file-action="rename"
            >
                Rename
            </button>

            <button
                type="button"
                data-file-action="copy"
            >
                Copy
            </button>

            <button
                type="button"
                data-file-action="cut"
            >
                Cut
            </button>

            <button
                type="button"
                data-file-action="delete"
            >
                Delete
            </button>

            <div class="context-divider"></div>

            <button
                type="button"
                data-file-action="properties"
            >
                Properties
            </button>

        `;


        document.body.appendChild(
            fileContextMenu
        );

    }


    function closeFileContextMenu() {

        fileContextMenu?.classList.remove(
            "open"
        );

    }


    /* =====================================================
       FOLDER PATH
       ===================================================== */

    function getFolderPath(
        folderId
    ) {

        const path =
            [];


        let current =
            folderId;


        while (
            current !== null &&
            current !== undefined
        ) {

            path.unshift(
                current
            );


            current =
                parentFolders[current];

        }


        return path;

    }


    /* =====================================================
       SIDEBAR ACTIVE STATE
       ===================================================== */

    function updateSidebarActive(
        folderId
    ) {

        sidebarItems.forEach(
            item => {

                item.classList.toggle(
                    "active",
                    item.dataset.folder ===
                    folderId
                );

            }
        );

    }


    /* =====================================================
       BACK / FORWARD BUTTON STATE
       ===================================================== */

    function updateNavigationButtons() {

        if (filesBackButton) {

            filesBackButton.disabled =
                backHistory.length === 0;

        }


        if (filesForwardButton) {

            filesForwardButton.disabled =
                forwardHistory.length === 0;

        }

    }


    /* =====================================================
       BREADCRUMBS
       ===================================================== */

    function renderBreadcrumbs() {

        if (!filesBreadcrumb) {
            return;
        }


        filesBreadcrumb.innerHTML =
            "";


        const path =
            getFolderPath(
                currentFolder
            );


        path.forEach(
            (
                folderId,
                index
            ) => {

                const folder =
                    folderData[folderId];


                if (!folder) {
                    return;
                }


                if (index > 0) {

                    const separator =
                        document.createElement(
                            "span"
                        );


                    separator.className =
                        "breadcrumb-separator";


                    separator.textContent =
                        "/";


                    filesBreadcrumb.appendChild(
                        separator
                    );

                }


                const button =
                    document.createElement(
                        "button"
                    );


                button.type =
                    "button";


                button.className =
                    "breadcrumb-item";


                button.textContent =
                    folder.name;


                button.dataset.folder =
                    folderId;


                if (
                    index ===
                    path.length - 1
                ) {

                    button.classList.add(
                        "current"
                    );


                    button.disabled =
                        true;

                }


                filesBreadcrumb.appendChild(
                    button
                );

            }
        );

    }


    /* =====================================================
       SEARCH + SORT
       ===================================================== */

    function getVisibleItems(
        items
    ) {

        const query =
            searchQuery
                .trim()
                .toLowerCase();


        let visibleItems =
            query
                ? items.filter(
                    item =>
                        item.name
                            .toLowerCase()
                            .includes(
                                query
                            )
                )
                : [...items];


        if (
            sortMode ===
            "name-asc"
        ) {

            visibleItems.sort(
                (a, b) =>
                    a.name.localeCompare(
                        b.name,
                        undefined,
                        {
                            sensitivity:
                                "base"
                        }
                    )
            );

        }


        else if (
            sortMode ===
            "name-desc"
        ) {

            visibleItems.sort(
                (a, b) =>
                    b.name.localeCompare(
                        a.name,
                        undefined,
                        {
                            sensitivity:
                                "base"
                        }
                    )
            );

        }


        else if (
            sortMode ===
            "type"
        ) {

            visibleItems.sort(
                (a, b) => {

                    if (
                        a.type ===
                        b.type
                    ) {

                        return a.name.localeCompare(
                            b.name,
                            undefined,
                            {
                                sensitivity:
                                    "base"
                            }
                        );

                    }


                    return a.type ===
                        "folder"
                        ? -1
                        : 1;

                }
            );

        }


        return visibleItems;

    }


    /* =====================================================
       EMPTY STATE
       ===================================================== */

    function renderEmptyState() {

        const emptyState =
            document.createElement(
                "div"
            );


        emptyState.className =
            "files-empty";


        emptyState.innerHTML = `

            <div class="files-empty-icon">
                ⌕
            </div>

            <h3>
                No results found
            </h3>

            <p>
                Try a different search term.
            </p>

        `;


        fileGrid?.appendChild(
            emptyState
        );

    }


    /* =====================================================
       RENDER FOLDER
       ===================================================== */

    function renderFolder(
        folderId
    ) {

        const folder =
            folderData[folderId];


        if (
            !folder ||
            !fileGrid
        ) {

            return;

        }


        currentFolder =
            folderId;


        const visibleItems =
            getVisibleItems(
                folder.items
            );


        /* Heading */

        if (filesHeading) {

            filesHeading.textContent =
                folder.name;

        }


        /* Count */

        if (filesCount) {

            filesCount.textContent =
                searchQuery.trim()
                    ? `${visibleItems.length} of ${folder.items.length} items`
                    : `${visibleItems.length} items`;

        }


        /* Breadcrumb */

        renderBreadcrumbs();


        /* Sidebar */

        updateSidebarActive(
            folderId
        );


        /* Clear existing cards */

        fileGrid.innerHTML =
            "";


        /* No results */

        if (
            visibleItems.length ===
            0
        ) {

            renderEmptyState();

            updateNavigationButtons();

            return;

        }


        /* Create file cards */

        visibleItems.forEach(
            item => {

                const card =
                    document.createElement(
                        "button"
                    );


                card.type =
                    "button";


                card.className =
                    "file-card";


                card.dataset.type =
                    item.type;


                if (item.target) {

                    card.dataset.target =
                        item.target;

                }


                const icon =
                    document.createElement(
                        "div"
                    );


                icon.className =
                    "file-card-icon";


                icon.classList.add(
                    item.type === "folder"
                        ? "folder-icon"
                        : "document-icon"
                );


                icon.textContent =
                    item.icon;


                const name =
                    document.createElement(
                        "div"
                    );


                name.className =
                    "file-card-name";


                name.textContent =
                    item.name;


                const type =
                    document.createElement(
                        "small"
                    );


                type.textContent =
                    item.type === "folder"
                        ? "Folder"
                        : "File";


                card.append(
                    icon,
                    name,
                    type
                );


                fileGrid.appendChild(
                    card
                );

            }
        );


        updateNavigationButtons();

    }


    /* =====================================================
       NAVIGATION
       ===================================================== */

    function navigateTo(
        folderId,
        addHistory = true
    ) {

        if (!folderData[folderId]) {
            return;
        }


        if (
            folderId ===
            currentFolder
        ) {

            return;

        }


        if (addHistory) {

            backHistory.push(
                currentFolder
            );


            forwardHistory.length =
                0;

        }


        clearFileSelection();

        closeFileContextMenu();


        renderFolder(
            folderId
        );

    }


    /* =====================================================
       FILE SELECTION
       ===================================================== */

    fileGrid?.addEventListener(
        "click",
        event => {

            const card =
                event.target.closest(
                    ".file-card"
                );


            if (!card) {

                clearFileSelection();

                return;

            }


            closeFileContextMenu();


            if (
                selectedFileCard &&
                selectedFileCard !== card
            ) {

                selectedFileCard.classList.remove(
                    "selected"
                );

            }


            selectedFileCard =
                card;


            selectedFileCard.classList.add(
                "selected"
            );


            selectedFileData =
                getFileData(
                    card
                );

        }
    );


    /* =====================================================
       DOUBLE CLICK FOLDER
       ===================================================== */

    fileGrid?.addEventListener(
        "dblclick",
        event => {

            const card =
                event.target.closest(
                    ".file-card"
                );


            if (!card) {
                return;
            }


            if (
                card.dataset.type !==
                "folder"
            ) {

                return;

            }


            const target =
                card.dataset.target;


            if (!target) {
                return;
            }


            navigateTo(
                target
            );

        }
    );


    /* =====================================================
       RIGHT CLICK CONTEXT MENU
       ===================================================== */

    fileGrid?.addEventListener(
        "contextmenu",
        event => {

            const card =
                event.target.closest(
                    ".file-card"
                );


            if (!card) {
                return;
            }


            event.preventDefault();


            if (
                selectedFileCard &&
                selectedFileCard !== card
            ) {

                selectedFileCard.classList.remove(
                    "selected"
                );

            }


            selectedFileCard =
                card;


            selectedFileCard.classList.add(
                "selected"
            );


            selectedFileData =
                getFileData(
                    card
                );


            const menuWidth =
                165;


            const menuHeight =
                245;


            let x =
                event.clientX;


            let y =
                event.clientY;


            if (
                x + menuWidth >
                window.innerWidth
            ) {

                x =
                    window.innerWidth -
                    menuWidth -
                    10;

            }


            if (
                y + menuHeight >
                window.innerHeight
            ) {

                y =
                    window.innerHeight -
                    menuHeight -
                    10;

            }


            fileContextMenu.style.left =
                `${x}px`;


            fileContextMenu.style.top =
                `${y}px`;


            fileContextMenu.classList.add(
                "open"
            );

        }
    );


    /* =====================================================
       CONTEXT MENU ACTIONS
       ===================================================== */

    fileContextMenu?.addEventListener(
        "click",
        event => {

            const actionButton =
                event.target.closest(
                    "[data-file-action]"
                );


            if (!actionButton) {
                return;
            }


            if (!selectedFileData) {
                return;
            }


            const action =
                actionButton.dataset.fileAction;


            switch (action) {

                case "open":

                    if (
                        selectedFileData.type ===
                            "folder" &&
                        selectedFileData.target
                    ) {

                        navigateTo(
                            selectedFileData.target
                        );

                    }

                    break;


                case "properties":

                    alert(
                        `Name: ${selectedFileData.name}\n` +
                        `Type: ${
                            selectedFileData.type ===
                            "folder"
                                ? "Folder"
                                : "File"
                        }`
                    );

                    break;


                case "rename":

                    alert(
                        "Rename will be added in Step 6E."
                    );

                    break;


                case "copy":

                    alert(
                        "Copy will be added in Step 6E."
                    );

                    break;


                case "cut":

                    alert(
                        "Cut will be added in Step 6E."
                    );

                    break;


                case "delete":

                    alert(
                        "Delete will be added in Step 6E."
                    );

                    break;

            }


            closeFileContextMenu();

        }
    );


    /* =====================================================
       CLOSE CONTEXT MENU
       ===================================================== */

    document.addEventListener(
        "click",
        event => {

            if (
                !event.target.closest(
                    ".file-context-menu"
                )
            ) {

                closeFileContextMenu();

            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Escape"
            ) {

                closeFileContextMenu();

                clearFileSelection();

            }

        }
    );


    /* =====================================================
       SIDEBAR
       ===================================================== */

    sidebarItems.forEach(
        item => {

            item.addEventListener(
                "click",
                () => {

                    const folderId =
                        item.dataset.folder;


                    if (
                        !folderData[folderId]
                    ) {

                        return;

                    }


                    backHistory.length =
                        0;


                    forwardHistory.length =
                        0;


                    clearFileSelection();

                    closeFileContextMenu();


                    renderFolder(
                        folderId
                    );

                }
            );

        }
    );


    /* =====================================================
       BREADCRUMB CLICK
       ===================================================== */

    filesBreadcrumb?.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    ".breadcrumb-item"
                );


            if (!button) {
                return;
            }


            const folderId =
                button.dataset.folder;


            if (!folderId) {
                return;
            }


            navigateTo(
                folderId
            );

        }
    );


    /* =====================================================
       BACK
       ===================================================== */

    filesBackButton?.addEventListener(
        "click",
        () => {

            if (
                backHistory.length ===
                0
            ) {

                return;

            }


            forwardHistory.push(
                currentFolder
            );


            const previousFolder =
                backHistory.pop();


            clearFileSelection();


            closeFileContextMenu();


            renderFolder(
                previousFolder
            );

        }
    );


    /* =====================================================
       FORWARD
       ===================================================== */

    filesForwardButton?.addEventListener(
        "click",
        () => {

            if (
                forwardHistory.length ===
                0
            ) {

                return;

            }


            backHistory.push(
                currentFolder
            );


            const nextFolder =
                forwardHistory.pop();


            clearFileSelection();


            closeFileContextMenu();


            renderFolder(
                nextFolder
            );

        }
    );


    /* =====================================================
       SEARCH
       ===================================================== */

    filesSearchInput?.addEventListener(
        "input",
        () => {

            searchQuery =
                filesSearchInput.value;


            clearFileSelection();


            closeFileContextMenu();


            renderFolder(
                currentFolder
            );

        }
    );


    /* =====================================================
       SORT
       ===================================================== */

    filesSort?.addEventListener(
        "change",
        () => {

            sortMode =
                filesSort.value;


            renderFolder(
                currentFolder
            );

        }
    );


    /* =====================================================
       REFRESH
       ===================================================== */

    filesRefreshButton?.addEventListener(
        "click",
        () => {

            clearFileSelection();

            closeFileContextMenu();


            renderFolder(
                currentFolder
            );

        }
    );


    /* =====================================================
       OPEN FILES
       ===================================================== */

    function openFiles() {

        if (!filesWindow) {
            return;
        }


        filesWindow.classList.add(
            "open"
        );


        filesWindow.classList.remove(
            "minimized"
        );


        filesWindow.classList.remove(
            "maximized"
        );


        filesWindow.style.zIndex =
            "150";


        backHistory.length =
            0;


        forwardHistory.length =
            0;


        searchQuery =
            "";


        if (filesSearchInput) {

            filesSearchInput.value =
                "";

        }


        sortMode =
            "name-asc";


        if (filesSort) {

            filesSort.value =
                "name-asc";

        }


        clearFileSelection();

        closeFileContextMenu();


        renderFolder(
            "home"
        );


        createFilesTaskbarButton();

    }


    /* =====================================================
       CLOSE FILES
       ===================================================== */

    function closeFiles() {

        if (!filesWindow) {
            return;
        }


        filesWindow.classList.remove(
            "open"
        );


        filesWindow.classList.remove(
            "minimized"
        );


        filesWindow.classList.remove(
            "maximized"
        );


        clearFileSelection();

        closeFileContextMenu();


        removeFilesTaskbarButton();

    }


    /* =====================================================
       MINIMIZE FILES
       ===================================================== */

    function minimizeFiles() {

        if (!filesWindow) {
            return;
        }


        filesWindow.classList.remove(
            "open"
        );


        filesWindow.classList.add(
            "minimized"
        );


        closeFileContextMenu();

    }


    /* =====================================================
       MAXIMIZE FILES
       ===================================================== */

    function maximizeFiles() {

        if (!filesWindow) {
            return;
        }


        filesWindow.classList.toggle(
            "maximized"
        );


        closeFileContextMenu();

    }


    /* =====================================================
       DESKTOP FILES ICON
       ===================================================== */

    filesDesktopIcon?.addEventListener(
        "dblclick",
        openFiles
    );


    /* =====================================================
       FILE WINDOW CONTROLS
       ===================================================== */

    if (filesWindow) {

        const minimizeButton =
            $('[data-action="minimize"]', filesWindow);

        const maximizeButton =
            $('[data-action="maximize"]', filesWindow);

        const closeButton =
            $('[data-action="close"]', filesWindow);


        minimizeButton?.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                minimizeFiles();

            }
        );


        maximizeButton?.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                maximizeFiles();

            }
        );


        closeButton?.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                closeFiles();

            }
        );


        filesWindow.addEventListener(
            "mousedown",
            () => {

                filesWindow.style.zIndex =
                    "250";

            }
        );

    }


    /* =====================================================
       TASKBAR FILE BUTTON
       ===================================================== */

    function createFilesTaskbarButton() {

        if (!taskbarCenter) {
            return;
        }


        let button =
            $('[data-taskbar-window="files"]');


        if (button) {

            button.classList.add(
                "active"
            );

            return;

        }


        button =
            document.createElement(
                "button"
            );


        button.type =
            "button";


        button.className =
            "taskbar-app active";


        button.dataset.taskbarWindow =
            "files";


        button.textContent =
            "📁";


        button.title =
            "Files";


        button.addEventListener(
            "click",
            () => {

                if (
                    filesWindow?.classList.contains(
                        "open"
                    )
                ) {

                    minimizeFiles();

                }

                else {

                    openFiles();

                }

            }
        );


        taskbarCenter.appendChild(
            button
        );

    }


    function removeFilesTaskbarButton() {

        const button =
            $('[data-taskbar-window="files"]');


        button?.remove();

    }


    /* =====================================================
       DRAGGABLE WINDOW
       ===================================================== */

    function makeWindowDraggable(
        windowElement
    ) {

        if (
            !windowElement ||
            !osDesktop
        ) {

            return;

        }


        const header =
            $(".window-header", windowElement);


        if (!header) {
            return;
        }


        let dragging =
            false;


        let offsetX =
            0;


        let offsetY =
            0;


        /* Start */

        header.addEventListener(
            "mousedown",
            event => {

                if (
                    event.target.closest(
                        ".window-controls"
                    )
                ) {

                    return;

                }


                if (
                    windowElement.classList.contains(
                        "maximized"
                    )
                ) {

                    return;

                }


                dragging =
                    true;


                windowElement.style.zIndex =
                    "300";


                const windowRect =
                    windowElement.getBoundingClientRect();


                const desktopRect =
                    osDesktop.getBoundingClientRect();


                windowElement.style.left =
                    `${windowRect.left - desktopRect.left}px`;


                windowElement.style.top =
                    `${windowRect.top - desktopRect.top}px`;


                windowElement.style.transform =
                    "none";


                offsetX =
                    event.clientX -
                    windowRect.left;


                offsetY =
                    event.clientY -
                    windowRect.top;


                windowElement.classList.add(
                    "dragging"
                );

            }
        );


        /* Move */

        document.addEventListener(
            "mousemove",
            event => {

                if (!dragging) {
                    return;
                }


                const desktopRect =
                    osDesktop.getBoundingClientRect();


                const windowWidth =
                    windowElement.offsetWidth;


                const windowHeight =
                    windowElement.offsetHeight;


                let left =
                    event.clientX -
                    desktopRect.left -
                    offsetX;


                let top =
                    event.clientY -
                    desktopRect.top -
                    offsetY;


                const minLeft =
                    0;


                const minTop =
                    58;


                const maxLeft =
                    Math.max(
                        0,
                        desktopRect.width -
                        windowWidth
                    );


                const maxTop =
                    Math.max(
                        minTop,
                        desktopRect.height -
                        windowHeight -
                        74
                    );


                left =
                    Math.min(
                        Math.max(
                            left,
                            minLeft
                        ),
                        maxLeft
                    );


                top =
                    Math.min(
                        Math.max(
                            top,
                            minTop
                        ),
                        maxTop
                    );


                windowElement.style.left =
                    `${left}px`;


                windowElement.style.top =
                    `${top}px`;

            }
        );


        /* Stop */

        document.addEventListener(
            "mouseup",
            () => {

                dragging =
                    false;


                windowElement.classList.remove(
                    "dragging"
                );

            }
        );

    }


    /* =====================================================
       ENABLE DRAGGING
       ===================================================== */

    makeWindowDraggable(
        filesWindow
    );


    /* =====================================================
       INITIAL FILE VIEW
       ===================================================== */

    renderFolder(
        "home"
    );

});