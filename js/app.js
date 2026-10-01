/* =========================================================
   ORBIT OS
   COMPLETE APPLICATION JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENT HELPERS
       ===================================================== */

    const $ = (selector, parent = document) =>
        parent.querySelector(selector);

    const $$ = (selector, parent = document) =>
        [...parent.querySelectorAll(selector)];

    const byId = id =>
        document.getElementById(id);


    /* =====================================================
       CORE ELEMENTS
       ===================================================== */

    const bootScreen = byId("bootScreen");
    const bootContent = $(".boot-content");
    const progressBar = byId("progressBar");
    const loadingPercent = byId("loadingPercent");
    const statusText = byId("statusText");
    const systemMessage = byId("systemMessage");

    const lockScreen = byId("lockScreen");
    const lockTime = byId("lockTime");
    const lockDate = byId("lockDate");
    const pinInput = byId("pinInput");
    const pinError = byId("pinError");
    const unlockButton = byId("unlockButton");
    const togglePin = byId("togglePin");

    const osDesktop = byId("osDesktop");
    const desktopTopTime = byId("desktopTopTime");
    const desktopTaskbarTime = byId("desktopTaskbarTime");
    const desktopTaskbarDate = byId("desktopTaskbarDate");

    const filesWindow = byId("filesWindow");
    const filesDesktopIcon =
        $('.desktop-app-icon[data-app="files"]');

    const taskbarCenter = byId("taskbarCenter");
    const taskbarSearch = $(".taskbar-search");
    const taskbarOrbitButton = byId("taskbarOrbitButton");

    const fileGrid = $(".file-grid");
    const filesBreadcrumb = byId("filesBreadcrumb");
    const filesHeading = $(".files-heading h2");
    const filesCount = $(".files-heading p");

    const filesBackButton = byId("filesBackButton");
    const filesForwardButton = byId("filesForwardButton");
    const filesRefreshButton = byId("filesRefreshButton");
    const filesSearchInput = byId("filesSearchInput");
    const filesSort = byId("filesSort");

    const sidebarItems =
        $$(".files-sidebar .sidebar-item");


    /* =====================================================
       STORAGE KEYS
       ===================================================== */

    const FILES_KEY = "orbit-os-files-v3";
    const NOTES_KEY = "orbit-os-notes-v3";
    const SETTINGS_KEY = "orbit-os-settings-v3";


    /* =====================================================
       FILE SYSTEM
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


    let currentFolder = "home";
    let searchQuery = "";
    let sortMode = "name-asc";

    const backHistory = [];
    const forwardHistory = [];

    let selectedItemId = null;
    let selectedFolderId = "home";

    let clipboard = null;

    let windowZIndex = 500;

    const dynamicWindows = new Map();
    const taskbarApps = new Map();


    /* =====================================================
       BASIC UTILS
       ===================================================== */

    function escapeHtml(value) {

        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    function generateId(prefix) {

        return (
            prefix +
            "-" +
            Date.now() +
            "-" +
            Math.random()
                .toString(36)
                .slice(2, 8)
        );

    }


    function currentItems() {

        return (
            folderData[currentFolder]?.items ||
            []
        );

    }


    function selectedItem() {

        if (!selectedItemId) {
            return null;
        }

        return (
            folderData[selectedFolderId]
                ?.items
                ?.find(
                    item =>
                        item._orbitId ===
                        selectedItemId
                ) ||
            null
        );

    }


    function ensureIds() {

        Object.values(folderData)
            .forEach(folder => {

                folder.items.forEach(item => {

                    if (!item._orbitId) {

                        item._orbitId =
                            generateId("item");

                    }

                });

            });

    }


    function fileIcon(name) {

        const lower =
            String(name).toLowerCase();

        if (
            lower.endsWith(".html") ||
            lower.endsWith(".htm")
        ) return "🌐";

        if (lower.endsWith(".css"))
            return "🎨";

        if (lower.endsWith(".js"))
            return "⚙️";

        if (lower.endsWith(".json"))
            return "🧩";

        if (lower.endsWith(".sql"))
            return "🗄️";

        if (
            lower.endsWith(".png") ||
            lower.endsWith(".jpg") ||
            lower.endsWith(".jpeg") ||
            lower.endsWith(".webp")
        ) return "🖼️";

        if (
            lower.endsWith(".mp3") ||
            lower.endsWith(".wav")
        ) return "🎵";

        if (lower.endsWith(".pdf"))
            return "📕";

        if (lower.endsWith(".md"))
            return "📘";

        return "📄";

    }


    /* =====================================================
       CLOCK
       ===================================================== */

    function updateClock() {

        const now = new Date();

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

        const lockDateText =
            now.toLocaleDateString(
                "en-IN",
                {
                    weekday: "long",
                    month: "long",
                    day: "numeric"
                }
            );

        if (desktopTopTime)
            desktopTopTime.textContent =
                time;

        if (desktopTaskbarTime)
            desktopTaskbarTime.textContent =
                time;

        if (desktopTaskbarDate)
            desktopTaskbarDate.textContent =
                date;

        if (lockTime)
            lockTime.textContent =
                time;

        if (lockDate)
            lockDate.textContent =
                lockDateText;

    }

    updateClock();

    setInterval(
        updateClock,
        1000
    );


    /* =====================================================
       BOOT SCREEN
       ===================================================== */

    let bootProgress = 0;

    const bootMessages = [
        "Initializing core services...",
        "Loading interface modules...",
        "Checking system resources...",
        "Preparing desktop environment...",
        "Starting user services...",
        "Finalizing system...",
        "System ready."
    ];


    function updateBoot() {

        bootProgress += 1;

        if (progressBar)
            progressBar.style.width =
                bootProgress + "%";

        if (loadingPercent)
            loadingPercent.textContent =
                bootProgress + "%";

        let index = 0;

        if (bootProgress >= 90)
            index = 5;
        else if (bootProgress >= 75)
            index = 4;
        else if (bootProgress >= 60)
            index = 3;
        else if (bootProgress >= 40)
            index = 2;
        else if (bootProgress >= 20)
            index = 1;

        if (systemMessage)
            systemMessage.textContent =
                bootMessages[index];

        if (statusText) {

            if (bootProgress < 20)
                statusText.textContent =
                    "Starting system...";

            else if (bootProgress < 40)
                statusText.textContent =
                    "Loading components...";

            else if (bootProgress < 60)
                statusText.textContent =
                    "Checking system...";

            else if (bootProgress < 75)
                statusText.textContent =
                    "Preparing environment...";

            else if (bootProgress < 90)
                statusText.textContent =
                    "Starting services...";

            else
                statusText.textContent =
                    "Almost ready...";

        }


        if (bootProgress >= 100) {

            clearInterval(bootTimer);

            if (bootContent)
                bootContent.classList.add(
                    "ready"
                );

            if (statusText)
                statusText.textContent =
                    "System ready";

            if (systemMessage)
                systemMessage.textContent =
                    "System ready.";

            setTimeout(() => {

                if (bootScreen)
                    bootScreen.classList.add(
                        "hidden"
                    );

                if (lockScreen)
                    lockScreen.classList.add(
                        "active"
                    );

                pinInput?.focus();

            }, 600);

        }

    }


    const bootTimer =
        setInterval(
            updateBoot,
            35
        );


    /* =====================================================
       PIN
       ===================================================== */

    function showPinError(message) {

        if (pinError)
            pinError.textContent =
                message;

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


    function unlockSystem() {

        const value =
            pinInput?.value.trim() ||
            "";

        if (!value) {

            showPinError(
                "Please enter your PIN."
            );

            return;

        }

        if (value !== "1234") {

            showPinError(
                "Incorrect PIN. Try again."
            );

            pinInput.value = "";

            pinInput.focus();

            return;

        }

        if (pinError)
            pinError.textContent = "";

        if (unlockButton) {

            unlockButton.disabled =
                true;

            unlockButton.innerHTML =
                "<span>Unlocking...</span>";

        }

        if (osDesktop) {

            osDesktop.style.display =
                "";

            osDesktop.classList.add(
                "active"
            );

        }

        if (lockScreen)
            lockScreen.classList.add(
                "unlocking"
            );

        setTimeout(() => {

            if (lockScreen)
                lockScreen.style.display =
                    "none";

        }, 800);

    }


    unlockButton?.addEventListener(
        "click",
        unlockSystem
    );


    pinInput?.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter")
                unlockSystem();

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


    togglePin?.addEventListener(
        "click",
        () => {

            if (pinInput.type === "password") {

                pinInput.type = "text";

                togglePin.textContent =
                    "◌";

            } else {

                pinInput.type =
                    "password";

                togglePin.textContent =
                    "◉";

            }

        }
    );


    /* =====================================================
       FILE STORAGE
       ===================================================== */

    function saveFileSystem() {

        try {

            localStorage.setItem(
                FILES_KEY,
                JSON.stringify({
                    folders: folderData,
                    parents: parentFolders
                })
            );

        } catch (error) {

            console.error(
                "ORBIT file save error:",
                error
            );

        }

    }


    function loadFileSystem() {

        try {

            const raw =
                localStorage.getItem(
                    FILES_KEY
                );

            if (!raw)
                return;

            const data =
                JSON.parse(raw);

            if (
                !data ||
                !data.folders
            )
                return;

            Object.keys(folderData)
                .forEach(
                    key =>
                        delete folderData[key]
                );

            Object.assign(
                folderData,
                data.folders
            );

            Object.keys(parentFolders)
                .forEach(
                    key =>
                        delete parentFolders[key]
                );

            Object.assign(
                parentFolders,
                data.parents || {}
            );

        } catch (error) {

            console.error(
                "ORBIT file restore error:",
                error
            );

        }

    }


    /* =====================================================
       FILE NAVIGATION
       ===================================================== */

    function folderPath(folderId) {

        const path = [];

        let current = folderId;

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


    function renderBreadcrumbs() {

        if (!filesBreadcrumb)
            return;

        filesBreadcrumb.innerHTML = "";

        folderPath(currentFolder)
            .forEach(
                (folderId, index, array) => {

                    const folder =
                        folderData[folderId];

                    if (!folder)
                        return;

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

                    button.dataset.folder =
                        folderId;

                    button.textContent =
                        folder.name;

                    if (
                        index ===
                        array.length - 1
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


    function updateNavigationButtons() {

        if (filesBackButton)
            filesBackButton.disabled =
                backHistory.length === 0;

        if (filesForwardButton)
            filesForwardButton.disabled =
                forwardHistory.length === 0;

    }


    function clearFileSelection() {

        $$(".file-card.selected")
            .forEach(
                card =>
                    card.classList.remove(
                        "selected"
                    )
            );

        selectedItemId =
            null;

        selectedFolderId =
            currentFolder;

    }


    function selectFileCard(card) {

        clearFileSelection();

        if (!card)
            return;

        card.classList.add(
            "selected"
        );

        selectedItemId =
            card.dataset.orbitId;

        selectedFolderId =
            currentFolder;

    }


    function renderFolder(folderId) {

        const folder =
            folderData[folderId];

        if (!folder || !fileGrid)
            return;

        currentFolder =
            folderId;

        clearFileSelection();

        let items =
            [...folder.items];

        const query =
            searchQuery
                .trim()
                .toLowerCase();

        if (query) {

            items =
                items.filter(
                    item =>
                        item.name
                            .toLowerCase()
                            .includes(query)
                );

        }


        items.sort(
            (a, b) => {

                if (
                    sortMode ===
                    "name-desc"
                ) {

                    return b.name.localeCompare(
                        a.name
                    );

                }

                if (
                    sortMode ===
                    "type"
                ) {

                    if (a.type !== b.type)
                        return a.type ===
                            "folder"
                            ? -1
                            : 1;

                }

                return a.name.localeCompare(
                    b.name
                );

            }
        );


        if (filesHeading)
            filesHeading.textContent =
                folder.name;

        if (filesCount) {

            filesCount.textContent =
                query
                    ? `${items.length} of ${folder.items.length} items`
                    : `${items.length} items`;

        }

        renderBreadcrumbs();

        fileGrid.innerHTML = "";

        if (!items.length) {

            fileGrid.innerHTML = `
                <div class="files-empty">
                    <div class="files-empty-icon">⌕</div>
                    <h3>No results found</h3>
                    <p>Try a different search term.</p>
                </div>
            `;

            updateNavigationButtons();

            return;

        }


        items.forEach(item => {

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

            card.dataset.orbitId =
                item._orbitId;

            if (item.target)
                card.dataset.target =
                    item.target;


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
                item.icon ||
                fileIcon(item.name);


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

        });


        updateNavigationButtons();

    }


    function navigateTo(
        folderId,
        saveHistory = true
    ) {

        if (!folderData[folderId])
            return;

        if (
            folderId ===
            currentFolder
        )
            return;

        if (saveHistory) {

            backHistory.push(
                currentFolder
            );

            forwardHistory.length =
                0;

        }

        renderFolder(
            folderId
        );

    }


    filesBackButton?.addEventListener(
        "click",
        () => {

            if (!backHistory.length)
                return;

            forwardHistory.push(
                currentFolder
            );

            const previous =
                backHistory.pop();

            renderFolder(
                previous
            );

        }
    );


    filesForwardButton?.addEventListener(
        "click",
        () => {

            if (!forwardHistory.length)
                return;

            backHistory.push(
                currentFolder
            );

            const next =
                forwardHistory.pop();

            renderFolder(
                next
            );

        }
    );


    filesBreadcrumb?.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    ".breadcrumb-item"
                );

            if (!button)
                return;

            navigateTo(
                button.dataset.folder
            );

        }
    );


    sidebarItems.forEach(item => {

        item.addEventListener(
            "click",
            () => {

                const folderId =
                    item.dataset.folder;

                if (
                    !folderData[folderId]
                )
                    return;

                sidebarItems.forEach(
                    button =>
                        button.classList.remove(
                            "active"
                        )
                );

                item.classList.add(
                    "active"
                );

                backHistory.length =
                    0;

                forwardHistory.length =
                    0;

                renderFolder(
                    folderId
                );

            }
        );

    });


    filesSearchInput?.addEventListener(
        "input",
        () => {

            searchQuery =
                filesSearchInput.value;

            renderFolder(
                currentFolder
            );

        }
    );


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


    filesRefreshButton?.addEventListener(
        "click",
        () =>
            renderFolder(
                currentFolder
            )
    );


    /* =====================================================
       FILE CONTEXT MENU
       ===================================================== */

    function closeContextMenu() {

        byId(
            "orbitFileContextMenu"
        )?.remove();

    }


    function showContextMenu(
        event,
        card = null
    ) {

        event.preventDefault();

        closeContextMenu();

        if (card)
            selectFileCard(card);
        else
            clearFileSelection();

        const menu =
            document.createElement(
                "div"
            );

        menu.id =
            "orbitFileContextMenu";

        menu.className =
            "file-context-menu orbit-file-context-menu";

        const selected =
            !!selectedItem();

        const hasClipboard =
            !!clipboard;


        menu.innerHTML = `

            ${
                selected
                    ? `
                        <button data-orbit-action="open">
                            Open
                        </button>

                        <button data-orbit-action="rename">
                            Rename
                        </button>

                        <button data-orbit-action="copy">
                            Copy
                        </button>

                        <button data-orbit-action="cut">
                            Cut
                        </button>

                        <button data-orbit-action="delete">
                            Delete
                        </button>

                        <div class="context-divider"></div>

                        <button data-orbit-action="properties">
                            Properties
                        </button>

                        <div class="context-divider"></div>
                    `
                    : ""
            }

            <button
                data-orbit-action="paste"
                ${hasClipboard ? "" : "disabled"}
            >
                Paste
            </button>

            <button data-orbit-action="new-folder">
                New Folder
            </button>

            <button data-orbit-action="new-file">
                New File
            </button>

            <div class="context-divider"></div>

            <button data-orbit-action="refresh">
                Refresh
            </button>

        `;


        document.body.appendChild(
            menu
        );


        const rect =
            menu.getBoundingClientRect();

        let left =
            event.clientX;

        let top =
            event.clientY;


        if (
            left + rect.width >
            window.innerWidth
        ) {

            left =
                window.innerWidth -
                rect.width -
                10;

        }


        if (
            top + rect.height >
            window.innerHeight
        ) {

            top =
                window.innerHeight -
                rect.height -
                10;

        }


        menu.style.left =
            Math.max(
                8,
                left
            ) + "px";

        menu.style.top =
            Math.max(
                8,
                top
            ) + "px";

        requestAnimationFrame(
            () =>
                menu.classList.add(
                    "open"
                )
        );

    }


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

            selectFileCard(
                card
            );

        }
    );


    fileGrid?.addEventListener(
        "contextmenu",
        event => {

            const card =
                event.target.closest(
                    ".file-card"
                );

            if (card)
                showContextMenu(
                    event,
                    card
                );

        }
    );


    fileGrid?.addEventListener(
        "dblclick",
        event => {

            const card =
                event.target.closest(
                    ".file-card"
                );

            if (!card)
                return;

            const item =
                folderData[currentFolder]
                    ?.items
                    ?.find(
                        entry =>
                            entry._orbitId ===
                            card.dataset.orbitId
                    );

            openFile(item);

        }
    );


    /* =====================================================
       FILE OPERATIONS
       ===================================================== */

    function uniqueName(
        base,
        items
    ) {

        const exists =
            name =>
                items.some(
                    item =>
                        item.name
                            .toLowerCase() ===
                        name.toLowerCase()
                );

        if (!exists(base))
            return base;

        let count = 2;

        let candidate =
            `${base} ${count}`;

        while (
            exists(candidate)
        ) {

            count++;

            candidate =
                `${base} ${count}`;

        }

        return candidate;

    }


    function renameSelected() {

        const item =
            selectedItem();

        if (!item) {

            notify(
                "Select a file or folder first."
            );

            return;

        }


        const value =
            prompt(
                "Rename item:",
                item.name
            );

        if (value === null)
            return;

        const name =
            value.trim();

        if (!name) {

            notify(
                "Name cannot be empty."
            );

            return;

        }


        if (
            currentItems().some(
                entry =>
                    entry !== item &&
                    entry.name
                        .toLowerCase() ===
                    name.toLowerCase()
            )
        ) {

            notify(
                "That name already exists."
            );

            return;

        }


        item.name =
            name;

        if (
            item.type === "folder" &&
            item.target &&
            folderData[item.target]
        ) {

            folderData[item.target].name =
                name;

        }


        saveFileSystem();

        clearFileSelection();

        renderFolder(
            currentFolder
        );

        notify(
            "Item renamed."
        );

    }


    function deleteFolderTree(
        folderId
    ) {

        const folder =
            folderData[folderId];

        if (!folder)
            return;

        folder.items.forEach(
            item => {

                if (
                    item.type === "folder" &&
                    item.target
                ) {

                    deleteFolderTree(
                        item.target
                    );

                }

            }
        );

        delete folderData[
            folderId
        ];

        delete parentFolders[
            folderId
        ];

    }


    function deleteSelected() {

        const item =
            selectedItem();

        if (!item) {

            notify(
                "Select a file or folder first."
            );

            return;

        }


        if (
            !confirm(
                `Delete "${item.name}"?`
            )
        )
            return;


        const items =
            currentItems();

        const index =
            items.indexOf(
                item
            );

        if (index < 0)
            return;


        if (
            item.type === "folder" &&
            item.target
        ) {

            deleteFolderTree(
                item.target
            );

        }


        const deletedName =
            item.name;

        items.splice(
            index,
            1
        );

        clipboard =
            null;

        clearFileSelection();

        saveFileSystem();

        renderFolder(
            currentFolder
        );

        notify(
            `"${deletedName}" deleted.`
        );

    }


    function copySelected() {

        const item =
            selectedItem();

        if (!item) {

            notify(
                "Select a file or folder first."
            );

            return;

        }


        clipboard = {

            mode: "copy",

            sourceFolder:
                currentFolder,

            item:
                JSON.parse(
                    JSON.stringify(
                        item
                    )
                )

        };


        notify(
            `"${item.name}" copied.`
        );

    }


    function cutSelected() {

        const item =
            selectedItem();

        if (!item) {

            notify(
                "Select a file or folder first."
            );

            return;

        }


        clipboard = {

            mode: "cut",

            sourceFolder:
                currentFolder,

            item

        };


        notify(
            `"${item.name}" ready to move.`
        );

    }


    function cloneFolderTree(
        sourceId,
        newParentId,
        preferredName
    ) {

        const source =
            folderData[sourceId];

        if (!source)
            return null;


        const newId =
            generateId(
                "folder"
            );


        folderData[newId] = {

            name:
                preferredName ||
                source.name,

            items: []

        };


        parentFolders[newId] =
            newParentId;


        source.items.forEach(
            sourceItem => {

                if (
                    sourceItem.type ===
                    "folder" &&
                    sourceItem.target
                ) {

                    const childId =
                        cloneFolderTree(
                            sourceItem.target,
                            newId,
                            sourceItem.name
                        );

                    folderData[newId]
                        .items
                        .push({

                            _orbitId:
                                generateId(
                                    "item"
                                ),

                            name:
                                sourceItem.name,

                            type:
                                "folder",

                            icon:
                                sourceItem.icon ||
                                "📁",

                            target:
                                childId

                        });

                }

                else {

                    folderData[newId]
                        .items
                        .push({

                            ...JSON.parse(
                                JSON.stringify(
                                    sourceItem
                                )
                            ),

                            _orbitId:
                                generateId(
                                    "item"
                                )

                        });

                }

            }
        );


        return newId;

    }


    function pasteClipboard() {

        if (!clipboard) {

            notify(
                "Clipboard is empty."
            );

            return;

        }


        const destination =
            currentItems();


        if (
            clipboard.mode ===
            "cut"
        ) {

            const sourceItems =
                folderData[
                    clipboard.sourceFolder
                ]?.items;

            if (!sourceItems)
                return;


            if (
                clipboard.sourceFolder ===
                currentFolder
            ) {

                notify(
                    "The item is already in this folder."
                );

                return;

            }


            const index =
                sourceItems.indexOf(
                    clipboard.item
                );

            if (index < 0)
                return;


            const moving =
                sourceItems.splice(
                    index,
                    1
                )[0];


            moving.name =
                uniqueName(
                    moving.name,
                    destination
                );


            if (
                moving.type ===
                    "folder" &&
                moving.target
            ) {

                parentFolders[
                    moving.target
                ] =
                    currentFolder;

            }


            destination.push(
                moving
            );

        }

        else {

            const source =
                clipboard.item;


            if (
                source.type ===
                    "folder" &&
                source.target
            ) {

                const name =
                    uniqueName(
                        source.name +
                        " Copy",
                        destination
                    );

                const newId =
                    cloneFolderTree(
                        source.target,
                        currentFolder,
                        name
                    );


                destination.push({

                    _orbitId:
                        generateId(
                            "item"
                        ),

                    name,

                    type:
                        "folder",

                    icon:
                        source.icon ||
                        "📁",

                    target:
                        newId

                });

            }

            else {

                destination.push({

                    ...JSON.parse(
                        JSON.stringify(
                            source
                        )
                    ),

                    _orbitId:
                        generateId(
                            "item"
                        ),

                    name:
                        uniqueName(
                            source.name +
                                " Copy",
                            destination
                        )

                });

            }

        }


        clipboard =
            null;

        saveFileSystem();

        renderFolder(
            currentFolder
        );

        notify(
            "Item pasted."
        );

    }


    function createNewFolder() {

        const value =
            prompt(
                "New folder name:",
                "New Folder"
            );

        if (value === null)
            return;

        const name =
            value.trim();

        if (!name) {

            notify(
                "Folder name cannot be empty."
            );

            return;

        }


        if (
            currentItems()
                .some(
                    item =>
                        item.name
                            .toLowerCase() ===
                        name.toLowerCase()
                )
        ) {

            notify(
                "That name already exists."
            );

            return;

        }


        const id =
            generateId(
                "folder"
            );


        folderData[id] = {

            name,

            items: []

        };


        parentFolders[id] =
            currentFolder;


        currentItems().push({

            _orbitId:
                generateId(
                    "item"
                ),

            name,

            type:
                "folder",

            icon:
                "📁",

            target:
                id

        });


        saveFileSystem();

        renderFolder(
            currentFolder
        );

        notify(
            "Folder created."
        );

    }


    function createNewFile() {

        const value =
            prompt(
                "New file name:",
                "New File.txt"
            );

        if (value === null)
            return;

        const name =
            value.trim();

        if (!name) {

            notify(
                "File name cannot be empty."
            );

            return;

        }


        if (
            currentItems()
                .some(
                    item =>
                        item.name
                            .toLowerCase() ===
                        name.toLowerCase()
                )
        ) {

            notify(
                "That name already exists."
            );

            return;

        }


        currentItems().push({

            _orbitId:
                generateId(
                    "item"
                ),

            name,

            type:
                "file",

            icon:
                fileIcon(name)

        });


        saveFileSystem();

        renderFolder(
            currentFolder
        );

        notify(
            "File created."
        );

    }


    function showProperties() {

        const item =
            selectedItem();

        if (!item) {

            notify(
                "Select an item first."
            );

            return;

        }


        const location =
            folderData[
                currentFolder
            ]?.name ||
            "Home";


        const contents =
            item.type === "folder" &&
            item.target
                ? (
                    folderData[
                        item.target
                    ]?.items?.length ||
                    0
                )
                : null;


        showModal(
            "Properties",
            `

                <div class="orbit-property-icon">
                    ${escapeHtml(
                        item.icon || "📄"
                    )}
                </div>

                <div class="orbit-property-row">
                    <span>Name</span>
                    <strong>
                        ${escapeHtml(
                            item.name
                        )}
                    </strong>
                </div>

                <div class="orbit-property-row">
                    <span>Type</span>
                    <strong>
                        ${
                            item.type ===
                            "folder"
                                ? "Folder"
                                : "File"
                        }
                    </strong>
                </div>

                <div class="orbit-property-row">
                    <span>Location</span>
                    <strong>
                        ${escapeHtml(
                            location
                        )}
                    </strong>
                </div>

                <div class="orbit-property-row">
                    <span>ID</span>
                    <strong>
                        ${escapeHtml(
                            item._orbitId
                        )}
                    </strong>
                </div>

                ${
                    contents !== null
                        ? `
                            <div class="orbit-property-row">
                                <span>Items</span>
                                <strong>
                                    ${contents}
                                </strong>
                            </div>
                        `
                        : ""
                }

            `
        );

    }


    function openFile(item) {

        if (!item)
            return;


        if (
            item.type ===
                "folder" &&
            item.target &&
            folderData[item.target]
        ) {

            navigateTo(
                item.target
            );

            return;

        }


        const extension =
            item.name.includes(".")
                ? item.name
                    .split(".")
                    .pop()
                    .toLowerCase()
                : "";


        let description =
            "Simulated file stored inside ORBIT OS.";


        if (extension === "txt")
            description =
                "Text file preview. Use Notes for persistent editing.";

        if (extension === "html")
            description =
                "HTML document detected. ORBIT Browser can simulate a preview.";

        if (extension === "css")
            description =
                "CSS stylesheet detected.";

        if (extension === "js")
            description =
                "JavaScript source detected.";

        if (extension === "sql")
            description =
                "SQL file detected.";

        showModal(
            item.name,
            `

                <div class="orbit-preview-icon">
                    ${escapeHtml(
                        item.icon ||
                        "📄"
                    )}
                </div>

                <h3>
                    ${escapeHtml(
                        item.name
                    )}
                </h3>

                <p class="orbit-preview-text">
                    ${escapeHtml(
                        description
                    )}
                </p>

            `
        );

    }


    /* =====================================================
       MODALS / NOTIFICATIONS
       ===================================================== */

    function showModal(
        title,
        body,
        footer = ""
    ) {

        const overlay =
            document.createElement(
                "div"
            );

        overlay.className =
            "orbit-modal";

        overlay.innerHTML = `

            <div class="orbit-modal-card">

                <header class="orbit-modal-header">

                    <strong>
                        ${escapeHtml(
                            title
                        )}
                    </strong>

                    <button
                        type="button"
                        class="orbit-modal-close"
                    >
                        ×
                    </button>

                </header>

                <div class="orbit-modal-body">
                    ${body}
                </div>

                ${
                    footer
                        ? `
                            <footer class="orbit-modal-actions">
                                ${footer}
                            </footer>
                        `
                        : ""
                }

            </div>

        `;


        const close =
            () =>
                overlay.remove();


        $(".orbit-modal-close", overlay)
            .addEventListener(
                "click",
                close
            );


        overlay.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    overlay
                )
                    close();

            }
        );


        document.body.appendChild(
            overlay
        );


        requestAnimationFrame(
            () =>
                overlay.classList.add(
                    "open"
                )
        );


        return overlay;

    }


    function notify(
        message,
        title = "ORBIT OS"
    ) {

        let container =
            byId(
                "orbitNotificationContainer"
            );


        if (!container) {

            container =
                document.createElement(
                    "div"
                );

            container.id =
                "orbitNotificationContainer";

            container.className =
                "orbit-notification-container";

            document.body.appendChild(
                container
            );

        }


        const toast =
            document.createElement(
                "div"
            );

        toast.className =
            "orbit-toast";


        toast.innerHTML = `

            <div class="orbit-toast-icon">
                O
            </div>

            <div class="orbit-toast-copy">

                <strong>
                    ${escapeHtml(title)}
                </strong>

                <span>
                    ${escapeHtml(message)}
                </span>

            </div>

        `;


        container.appendChild(
            toast
        );


        requestAnimationFrame(
            () =>
                toast.classList.add(
                    "show"
                )
        );


        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

                setTimeout(
                    () =>
                        toast.remove(),
                    250
                );

            },
            2600
        );

    }


    /* =====================================================
       WINDOW MANAGER
       ===================================================== */

    function focusWindow(win) {

        if (!win)
            return;

        win.style.zIndex =
            String(
                ++windowZIndex
            );

        const button =
            taskbarApps.get(
                win.id
            );

        button?.classList.add(
            "active"
        );

    }


    function addTaskbarApp(
        id,
        title,
        icon
    ) {

        if (
            !taskbarCenter ||
            taskbarApps.has(id)
        )
            return;


        const button =
            document.createElement(
                "button"
            );

        button.type =
            "button";

        button.className =
            "taskbar-app active";

        button.dataset.taskbarWindow =
            id;

        button.title =
            title;

        button.textContent =
            icon;


        button.addEventListener(
            "click",
            () => {

                const win =
                    byId(id);

                if (!win) {

                    button.remove();

                    taskbarApps.delete(
                        id
                    );

                    return;

                }


                if (
                    win.classList.contains(
                        "minimized"
                    )
                ) {

                    win.classList.remove(
                        "minimized"
                    );

                    win.classList.add(
                        "open"
                    );

                    focusWindow(
                        win
                    );

                }

                else if (
                    win.classList.contains(
                        "open"
                    )
                ) {

                    minimizeWindow(
                        id
                    );

                }

            }
        );


        taskbarCenter.appendChild(
            button
        );

        taskbarApps.set(
            id,
            button
        );

    }


    function removeTaskbarApp(id) {

        const button =
            taskbarApps.get(id);

        button?.remove();

        taskbarApps.delete(
            id
        );

    }


    function minimizeWindow(id) {

        const win =
            byId(id);

        if (!win)
            return;

        win.classList.remove(
            "open"
        );

        win.classList.add(
            "minimized"
        );

        taskbarApps.get(
            id
        )?.classList.remove(
            "active"
        );

    }


    function closeWindow(id) {

        const win =
            byId(id);

        if (win)
            win.remove();

        dynamicWindows.delete(
            id
        );

        removeTaskbarApp(
            id
        );

    }


    function createAppWindow({
        id,
        title,
        icon,
        width = 720,
        height = 500,
        content
    }) {

        const existing =
            byId(id);

        if (existing) {

            existing.classList.remove(
                "minimized"
            );

            existing.classList.add(
                "open"
            );

            focusWindow(
                existing
            );

            return existing;

        }


        const win =
            document.createElement(
                "section"
            );

        win.id =
            id;

        win.className =
            "os-window orbit-app-window open";

        win.style.width =
            width + "px";

        win.style.height =
            height + "px";

        win.style.left =
            Math.max(
                18,
                90 +
                    dynamicWindows.size *
                    25
            ) + "px";

        win.style.top =
            Math.max(
                70,
                85 +
                    dynamicWindows.size *
                    20
            ) + "px";

        win.style.zIndex =
            String(
                ++windowZIndex
            );


        win.innerHTML = `

            <header class="window-header">

                <div class="window-title">

                    <div class="window-app-icon">
                        ${escapeHtml(icon)}
                    </div>

                    <span>
                        ${escapeHtml(title)}
                    </span>

                </div>

                <div class="window-controls">

                    <button
                        class="window-control"
                        data-orbit-window-action="minimize"
                        type="button"
                    >
                        −
                    </button>

                    <button
                        class="window-control"
                        data-orbit-window-action="maximize"
                        type="button"
                    >
                        □
                    </button>

                    <button
                        class="window-control close-control"
                        data-orbit-window-action="close"
                        type="button"
                    >
                        ×
                    </button>

                </div>

            </header>

            <div class="orbit-app-content">
                ${content}
            </div>

        `;


        osDesktop.appendChild(
            win
        );

        dynamicWindows.set(
            id,
            win
        );


        $(
            '[data-orbit-window-action="minimize"]',
            win
        ).addEventListener(
            "click",
            event => {

                event.stopPropagation();

                minimizeWindow(
                    id
                );

            }
        );


        $(
            '[data-orbit-window-action="maximize"]',
            win
        ).addEventListener(
            "click",
            event => {

                event.stopPropagation();

                win.classList.toggle(
                    "maximized"
                );

                focusWindow(
                    win
                );

            }
        );


        $(
            '[data-orbit-window-action="close"]',
            win
        ).addEventListener(
            "click",
            event => {

                event.stopPropagation();

                closeWindow(
                    id
                );

            }
        );


        win.addEventListener(
            "mousedown",
            () =>
                focusWindow(
                    win
                )
        );


        makeWindowDraggable(
            win
        );

        addTaskbarApp(
            id,
            title,
            icon
        );

        focusWindow(
            win
        );


        return win;

    }


    /* =====================================================
       FILES WINDOW
       ===================================================== */

    function createFilesTaskbar() {

        if (!taskbarCenter)
            return;

        if (
            $(
                '[data-taskbar-window="files"]'
            )
        ) {

            return;

        }


        const button =
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
                    filesWindow.classList.contains(
                        "open"
                    )
                ) {

                    minimizeFiles();

                } else {

                    openFiles();

                }

            }
        );


        taskbarCenter.appendChild(
            button
        );

    }


    function openFiles() {

        if (!filesWindow)
            return;

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
            String(
                ++windowZIndex
            );

        searchQuery =
            "";

        sortMode =
            "name-asc";

        if (filesSearchInput)
            filesSearchInput.value =
                "";

        if (filesSort)
            filesSort.value =
                "name-asc";

        backHistory.length =
            0;

        forwardHistory.length =
            0;

        renderFolder(
            "home"
        );

        createFilesTaskbar();

    }


    function closeFiles() {

        filesWindow?.classList.remove(
            "open"
        );

        filesWindow?.classList.remove(
            "minimized"
        );

        filesWindow?.classList.remove(
            "maximized"
        );

        $(
            '[data-taskbar-window="files"]'
        )?.remove();

    }


    function minimizeFiles() {

        if (!filesWindow)
            return;

        filesWindow.classList.remove(
            "open"
        );

        filesWindow.classList.add(
            "minimized"
        );

        $(
            '[data-taskbar-window="files"]'
        )?.classList.remove(
            "active"
        );

    }


    const filesMinimize =
        filesWindow?.querySelector(
            '[data-action="minimize"]'
        );

    const filesMaximize =
        filesWindow?.querySelector(
            '[data-action="maximize"]'
        );

    const filesClose =
        filesWindow?.querySelector(
            '[data-action="close"]'
        );


    filesMinimize?.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            minimizeFiles();

        }
    );


    filesMaximize?.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            filesWindow.classList.toggle(
                "maximized"
            );

        }
    );


    filesClose?.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            closeFiles();

        }
    );


    filesWindow?.addEventListener(
        "mousedown",
        () => {

            filesWindow.style.zIndex =
                String(
                    ++windowZIndex
                );

        }
    );


    filesDesktopIcon?.addEventListener(
        "dblclick",
        openFiles
    );


    /* =====================================================
       NOTES
       ===================================================== */

    let notes = [];


    function loadNotes() {

        try {

            const raw =
                localStorage.getItem(
                    NOTES_KEY
                );

            if (raw) {

                const parsed =
                    JSON.parse(raw);

                if (
                    Array.isArray(
                        parsed
                    )
                ) {

                    notes =
                        parsed;

                    return;

                }

            }

        } catch (error) {

            console.error(
                "Notes restore error:",
                error
            );

        }


        notes = [

            {

                id: "welcome",

                title:
                    "Welcome to ORBIT OS",

                body:
                    "This is your personal digital workspace.\n\nYour notes are automatically saved."

            }

        ];

    }


    function saveNotes() {

        localStorage.setItem(
            NOTES_KEY,
            JSON.stringify(
                notes
            )
        );

    }


    function openNotes() {

        const win =
            createAppWindow({

                id:
                    "orbitNotesWindow",

                title:
                    "Notes",

                icon:
                    "📝",

                width:
                    760,

                height:
                    540,

                content: `

                    <div class="notes-app">

                        <aside class="notes-sidebar">

                            <button
                                type="button"
                                class="orbit-primary-button"
                                id="newNoteButton"
                            >
                                + New Note
                            </button>

                            <div
                                class="notes-list"
                                id="notesList"
                            ></div>

                        </aside>

                        <section class="notes-editor">

                            <input
                                class="notes-title-input"
                                id="noteTitle"
                                type="text"
                                placeholder="Note title"
                            >

                            <textarea
                                class="notes-body-input"
                                id="noteBody"
                                placeholder="Start writing..."
                            ></textarea>

                            <div
                                class="notes-save-status"
                                id="noteStatus"
                            >
                                Saved locally
                            </div>

                        </section>

                    </div>

                `

            });


        if (
            win.dataset.notesReady ===
            "true"
        )
            return;


        win.dataset.notesReady =
            "true";


        const list =
            byId(
                "notesList",
                win
            ) ||
            $("#notesList", win);

        const title =
            $("#noteTitle", win);

        const body =
            $("#noteBody", win);

        const status =
            $("#noteStatus", win);


        let currentNote =
            notes[0]?.id ||
            null;


        function renderNotesList() {

            list.innerHTML = "";

            notes.forEach(note => {

                const button =
                    document.createElement(
                        "button"
                    );

                button.type =
                    "button";

                button.className =
                    "notes-list-item";

                button.textContent =
                    note.title ||
                    "Untitled Note";

                if (
                    note.id ===
                    currentNote
                ) {

                    button.classList.add(
                        "active"
                    );

                }


                button.addEventListener(
                    "click",
                    () => {

                        currentNote =
                            note.id;

                        loadCurrentNote();

                        renderNotesList();

                    }
                );


                list.appendChild(
                    button
                );

            });

        }


        function loadCurrentNote() {

            const note =
                notes.find(
                    entry =>
                        entry.id ===
                        currentNote
                );

            title.value =
                note?.title ||
                "";

            body.value =
                note?.body ||
                "";

        }


        function saveCurrentNote() {

            let note =
                notes.find(
                    entry =>
                        entry.id ===
                        currentNote
                );

            if (!note) {

                note = {

                    id:
                        generateId(
                            "note"
                        ),

                    title:
                        "Untitled Note",

                    body:
                        ""

                };

                notes.unshift(
                    note
                );

                currentNote =
                    note.id;

            }


            note.title =
                title.value.trim() ||
                "Untitled Note";

            note.body =
                body.value;

            saveNotes();

            status.textContent =
                "Saved locally • " +
                new Date()
                    .toLocaleTimeString(
                        [],
                        {
                            hour:
                                "numeric",

                            minute:
                                "2-digit"
                        }
                    );

            renderNotesList();

        }


        $("#newNoteButton", win)
            .addEventListener(
                "click",
                () => {

                    const note = {

                        id:
                            generateId(
                                "note"
                            ),

                        title:
                            "Untitled Note",

                        body:
                            ""

                    };

                    notes.unshift(
                        note
                    );

                    currentNote =
                        note.id;

                    saveNotes();

                    loadCurrentNote();

                    renderNotesList();

                    title.focus();

                }
            );


        title.addEventListener(
            "input",
            saveCurrentNote
        );

        body.addEventListener(
            "input",
            saveCurrentNote
        );


        renderNotesList();

        loadCurrentNote();

    }


    /* =====================================================
       CALCULATOR
       ===================================================== */

    function openCalculator() {

        const win =
            createAppWindow({

                id:
                    "orbitCalculatorWindow",

                title:
                    "Calculator",

                icon:
                    "🧮",

                width:
                    370,

                height:
                    540,

                content: `

                    <div class="calculator-app">

                        <div
                            class="calculator-display"
                            id="calcDisplay"
                        >
                            0
                        </div>

                        <div class="calculator-grid">

                            <button
                                data-calc-action="clear"
                            >
                                C
                            </button>

                            <button
                                data-calc-action="back"
                            >
                                ⌫
                            </button>

                            <button
                                data-calc-value="/"
                            >
                                ÷
                            </button>

                            <button
                                data-calc-value="*"
                            >
                                ×
                            </button>

                            <button data-calc-value="7">
                                7
                            </button>

                            <button data-calc-value="8">
                                8
                            </button>

                            <button data-calc-value="9">
                                9
                            </button>

                            <button data-calc-value="-">
                                −
                            </button>

                            <button data-calc-value="4">
                                4
                            </button>

                            <button data-calc-value="5">
                                5
                            </button>

                            <button data-calc-value="6">
                                6
                            </button>

                            <button data-calc-value="+">
                                +
                            </button>

                            <button data-calc-value="1">
                                1
                            </button>

                            <button data-calc-value="2">
                                2
                            </button>

                            <button data-calc-value="3">
                                3
                            </button>

                            <button
                                data-calc-action="equals"
                                class="calculator-equals"
                            >
                                =
                            </button>

                            <button
                                data-calc-value="0"
                                class="calculator-zero"
                            >
                                0
                            </button>

                            <button data-calc-value=".">
                                .
                            </button>

                        </div>

                    </div>

                `

            });


        if (
            win.dataset.calculatorReady ===
            "true"
        )
            return;


        win.dataset.calculatorReady =
            "true";


        const display =
            $("#calcDisplay", win);


        let current =
            "0";

        let stored =
            null;

        let operator =
            null;

        let waiting =
            false;


        function updateDisplay() {

            display.textContent =
                current;

        }


        function calculate() {

            const a =
                Number(
                    stored
                );

            const b =
                Number(
                    current
                );


            if (
                Number.isNaN(a) ||
                Number.isNaN(b)
            ) {

                current =
                    "Error";

            }

            else if (
                operator === "+"
            ) {

                current =
                    String(
                        a + b
                    );

            }

            else if (
                operator === "-"
            ) {

                current =
                    String(
                        a - b
                    );

            }

            else if (
                operator === "*"
            ) {

                current =
                    String(
                        a * b
                    );

            }

            else if (
                operator === "/"
            ) {

                current =
                    b === 0
                        ? "Error"
                        : String(
                            a / b
                        );

            }


            stored =
                null;

            operator =
                null;

        }


        $$(
            "[data-calc-action], [data-calc-value]",
            win
        ).forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const action =
                            button.dataset.calcAction;

                        const value =
                            button.dataset.calcValue;


                        if (
                            action ===
                            "clear"
                        ) {

                            current =
                                "0";

                            stored =
                                null;

                            operator =
                                null;

                            waiting =
                                false;

                        }

                        else if (
                            action ===
                            "back"
                        ) {

                            current =
                                current.length >
                                1
                                    ? current.slice(
                                        0,
                                        -1
                                    )
                                    : "0";

                        }

                        else if (
                            action ===
                            "equals"
                        ) {

                            if (
                                stored !==
                                    null &&
                                operator
                            ) {

                                calculate();

                            }

                            waiting =
                                true;

                        }

                        else if (
                            ["+", "-", "*", "/"]
                                .includes(
                                    value
                                )
                        ) {

                            if (
                                operator &&
                                !waiting
                            ) {

                                calculate();

                            }

                            stored =
                                current;

                            operator =
                                value;

                            waiting =
                                true;

                        }

                        else if (
                            value
                        ) {

                            if (
                                current ===
                                "Error"
                            ) {

                                current =
                                    "0";

                            }

                            if (waiting) {

                                current =
                                    value === "."
                                        ? "0."
                                        : value;

                                waiting =
                                    false;

                            }

                            else if (
                                value === "." &&
                                current.includes(
                                    "."
                                )
                            ) {

                                return;

                            }

                            else if (
                                current ===
                                    "0" &&
                                value !== "."
                            ) {

                                current =
                                    value;

                            }

                            else {

                                current +=
                                    value;

                            }

                        }


                        updateDisplay();

                    }
                );

            }
        );


        updateDisplay();

    }


    /* =====================================================
       TERMINAL
       ===================================================== */

    function openTerminal() {

        const win =
            createAppWindow({

                id:
                    "orbitTerminalWindow",

                title:
                    "Terminal",

                icon:
                    ">_",

                width:
                    760,

                height:
                    500,

                content: `

                    <div class="terminal-app">

                        <div
                            class="terminal-output"
                            id="terminalOutput"
                        >

                            <div>
                                ORBIT TERMINAL v3.0
                            </div>

                            <div>
                                Type <strong>help</strong>
                                to view commands.
                            </div>

                            <br>

                        </div>

                        <form
                            class="terminal-input-row"
                            id="terminalForm"
                        >

                            <span>
                                orbit@desktop:~$
                            </span>

                            <input
                                id="terminalInput"
                                type="text"
                                autocomplete="off"
                                spellcheck="false"
                            >

                        </form>

                    </div>

                `

            });


        if (
            win.dataset.terminalReady ===
            "true"
        )
            return;


        win.dataset.terminalReady =
            "true";


        const output =
            $("#terminalOutput", win);

        const input =
            $("#terminalInput", win);


        function print(
            text = ""
        ) {

            const div =
                document.createElement(
                    "div"
                );

            div.textContent =
                text;

            output.appendChild(
                div
            );

            output.scrollTop =
                output.scrollHeight;

        }


        function runCommand(
            command
        ) {

            const parts =
                command.split(
                    /\s+/
                );

            const base =
                (
                    parts[0] ||
                    ""
                ).toLowerCase();


            if (
                base === "help"
            ) {

                [

                    "help          Show commands",
                    "clear         Clear terminal",
                    "date          Show date",
                    "time          Show time",
                    "whoami        Show user",
                    "pwd           Show folder",
                    "ls            List files",
                    "open files    Open Files",
                    "open notes    Open Notes",
                    "open calc     Open Calculator",
                    "open browser  Open Browser",
                    "open settings Open Settings",
                    "systeminfo    Show system information",
                    "lock          Lock system",
                    "fullscreen    Toggle fullscreen",
                    "echo TEXT     Print text"

                ].forEach(
                    print
                );

            }

            else if (
                base === "clear"
            ) {

                output.innerHTML =
                    "";

            }

            else if (
                base === "date"
            ) {

                print(
                    new Date()
                        .toLocaleDateString(
                            "en-IN"
                        )
                );

            }

            else if (
                base === "time"
            ) {

                print(
                    new Date()
                        .toLocaleTimeString(
                            "en-IN"
                        )
                );

            }

            else if (
                base === "whoami"
            ) {

                print(
                    "Gaurav@ORBIT"
                );

            }

            else if (
                base === "pwd"
            ) {

                print(
                    `/home/${folderData[currentFolder]?.name || "Home"}`
                );

            }

            else if (
                base === "ls"
            ) {

                currentItems()
                    .forEach(
                        item =>
                            print(
                                `${item.icon || "📄"}  ${item.name}`
                            )
                    );

            }

            else if (
                base === "open"
            ) {

                const target =
                    parts
                        .slice(1)
                        .join(" ")
                        .toLowerCase();

                if (
                    target.includes(
                        "file"
                    )
                )
                    openFiles();

                else if (
                    target.includes(
                        "note"
                    )
                )
                    openNotes();

                else if (
                    target.includes(
                        "calc"
                    )
                )
                    openCalculator();

                else if (
                    target.includes(
                        "browser"
                    )
                )
                    openBrowser();

                else if (
                    target.includes(
                        "setting"
                    )
                )
                    openSettings();

                else if (
                    target.includes(
                        "task"
                    )
                )
                    openTaskManager();

                else
                    print(
                        "Application not found."
                    );

            }

            else if (
                base === "systeminfo"
            ) {

                print(
                    "ORBIT OS 3.0"
                );

                print(
                    "Runtime: Browser"
                );

                print(
                    "Frontend: HTML5 / CSS3 / Vanilla JavaScript"
                );

                print(
                    "Storage: LocalStorage"
                );

            }

            else if (
                base === "lock"
            ) {

                lockSystem();

            }

            else if (
                base === "fullscreen"
            ) {

                toggleFullscreen();

            }

            else if (
                base === "echo"
            ) {

                print(
                    parts
                        .slice(1)
                        .join(" ")
                );

            }

            else {

                print(
                    `Command not found: ${command}`
                );

            }

        }


        $("#terminalForm", win)
            .addEventListener(
                "submit",
                event => {

                    event.preventDefault();

                    const command =
                        input.value.trim();

                    if (!command)
                        return;

                    print(
                        `orbit@desktop:~$ ${command}`
                    );

                    runCommand(
                        command
                    );

                    input.value =
                        "";

                }
            );


        input.focus();

    }


    /* =====================================================
       BROWSER
       ===================================================== */

    function openBrowser() {

        const win =
            createAppWindow({

                id:
                    "orbitBrowserWindow",

                title:
                    "Browser",

                icon:
                    "🌐",

                width:
                    820,

                height:
                    560,

                content: `

                    <div class="browser-app">

                        <div
                            class="browser-toolbar"
                        >

                            <button
                                type="button"
                                id="browserBack"
                            >
                                ←
                            </button>

                            <button
                                type="button"
                                id="browserForward"
                            >
                                →
                            </button>

                            <button
                                type="button"
                                id="browserHome"
                            >
                                ⌂
                            </button>

                            <input
                                id="browserAddress"
                                type="text"
                                value="orbit://home"
                                placeholder="Search or enter address"
                            >

                            <button
                                type="button"
                                id="browserGo"
                            >
                                Go
                            </button>

                        </div>

                        <div
                            class="browser-page"
                            id="browserPage"
                        ></div>

                    </div>

                `

            });


        if (
            win.dataset.browserReady ===
            "true"
        )
            return;


        win.dataset.browserReady =
            "true";


        const address =
            $("#browserAddress", win);

        const page =
            $("#browserPage", win);

        const history = [];

        let historyIndex =
            -1;


        function renderPage(
            value,
            addHistory = true
        ) {

            const query =
                value.trim() ||
                "orbit://home";


            if (addHistory) {

                history.splice(
                    historyIndex + 1
                );

                history.push(
                    query
                );

                historyIndex++;

            }


            address.value =
                query;


            if (
                query ===
                "orbit://home"
            ) {

                page.innerHTML = `

                    <div class="browser-home">

                        <div class="browser-orbit-mark">
                            O
                        </div>

                        <h2>
                            Welcome to ORBIT Browser
                        </h2>

                        <p>
                            A browser simulation built inside ORBIT OS.
                        </p>

                        <div class="browser-search-hint">
                            Search the local ORBIT workspace.
                        </div>

                    </div>

                `;

                return;

            }


            const matches = [];

            Object.values(
                folderData
            ).forEach(
                folder => {

                    folder.items.forEach(
                        item => {

                            if (
                                item.name
                                    .toLowerCase()
                                    .includes(
                                        query.toLowerCase()
                                    )
                            ) {

                                matches.push(
                                    item.name
                                );

                            }

                        }
                    );

                }
            );


            page.innerHTML = `

                <div class="browser-result">

                    <span>
                        ORBIT SEARCH
                    </span>

                    <h2>
                        ${escapeHtml(query)}
                    </h2>

                    <p>
                        ${matches.length}
                        matching local result(s).
                    </p>

                    <div class="browser-results-list">

                        ${
                            matches.length
                                ? matches
                                    .slice(
                                        0,
                                        10
                                    )
                                    .map(
                                        name =>
                                            `
                                                <div class="browser-result-card">

                                                    <strong>
                                                        ${escapeHtml(
                                                            name
                                                        )}
                                                    </strong>

                                                    <small>
                                                        ORBIT local workspace
                                                    </small>

                                                </div>
                                            `
                                    )
                                    .join("")
                                : `
                                    <div class="browser-result-card">
                                        <strong>
                                            No result found
                                        </strong>
                                    </div>
                                `
                        }

                    </div>

                </div>

            `;

        }


        $("#browserGo", win)
            .addEventListener(
                "click",
                () =>
                    renderPage(
                        address.value
                    )
            );


        address.addEventListener(
            "keydown",
            event => {

                if (
                    event.key ===
                    "Enter"
                ) {

                    renderPage(
                        address.value
                    );

                }

            }
        );


        $("#browserHome", win)
            .addEventListener(
                "click",
                () =>
                    renderPage(
                        "orbit://home"
                    )
            );


        $("#browserBack", win)
            .addEventListener(
                "click",
                () => {

                    if (
                        historyIndex >
                        0
                    ) {

                        historyIndex--;

                        renderPage(
                            history[
                                historyIndex
                            ],
                            false
                        );

                    }

                }
            );


        $("#browserForward", win)
            .addEventListener(
                "click",
                () => {

                    if (
                        historyIndex <
                        history.length - 1
                    ) {

                        historyIndex++;

                        renderPage(
                            history[
                                historyIndex
                            ],
                            false
                        );

                    }

                }
            );


        renderPage(
            "orbit://home"
        );

    }


    /* =====================================================
       SETTINGS
       ===================================================== */

    let settings = {

        theme:
            "dark",

        accent:
            "violet",

        reducedMotion:
            false

    };


    function loadSettings() {

        try {

            const raw =
                localStorage.getItem(
                    SETTINGS_KEY
                );

            if (!raw)
                return;

            const parsed =
                JSON.parse(raw);

            settings =
                {
                    ...settings,
                    ...parsed
                };

        } catch (error) {

            console.error(
                "Settings restore error:",
                error
            );

        }

    }


    function saveSettings() {

        localStorage.setItem(
            SETTINGS_KEY,
            JSON.stringify(
                settings
            )
        );

    }


    function applySettings() {

        document.body.classList.toggle(
            "orbit-light",
            settings.theme ===
                "light"
        );

        document.body.classList.toggle(
            "orbit-accent-cyan",
            settings.accent ===
                "cyan"
        );

        document.body.classList.toggle(
            "orbit-reduced-motion",
            !!settings.reducedMotion
        );

    }


    function openSettings() {

        const win =
            createAppWindow({

                id:
                    "orbitSettingsWindow",

                title:
                    "Settings",

                icon:
                    "⚙",

                width:
                    620,

                height:
                    500,

                content: `

                    <div class="settings-app">

                        <section class="settings-section">

                            <div
                                class="settings-section-title"
                            >

                                <strong>
                                    Appearance
                                </strong>

                                <span>
                                    Customize ORBIT OS.
                                </span>

                            </div>

                            <div class="settings-option">

                                <label>
                                    Theme
                                </label>

                                <select
                                    id="themeSelect"
                                >

                                    <option value="dark">
                                        Dark
                                    </option>

                                    <option value="light">
                                        Light
                                    </option>

                                </select>

                            </div>

                            <div class="settings-option">

                                <label>
                                    Accent
                                </label>

                                <select
                                    id="accentSelect"
                                >

                                    <option value="violet">
                                        Violet
                                    </option>

                                    <option value="cyan">
                                        Cyan
                                    </option>

                                </select>

                            </div>

                            <div class="settings-option">

                                <label>
                                    Reduced Motion
                                </label>

                                <input
                                    type="checkbox"
                                    id="motionToggle"
                                >

                            </div>

                        </section>

                        <section class="settings-section">

                            <div
                                class="settings-section-title"
                            >

                                <strong>
                                    System
                                </strong>

                                <span>
                                    Browser-based system controls.
                                </span>

                            </div>

                            <div class="settings-actions-grid">

                                <button
                                    class="orbit-secondary-button"
                                    id="lockButton"
                                    type="button"
                                >
                                    Lock System
                                </button>

                                <button
                                    class="orbit-secondary-button"
                                    id="fullscreenButton"
                                    type="button"
                                >
                                    Fullscreen
                                </button>

                                <button
                                    class="orbit-secondary-button"
                                    id="resetButton"
                                    type="button"
                                >
                                    Reset Saved Data
                                </button>

                            </div>

                        </section>

                        <section class="settings-section about-section">

                            <div
                                class="settings-section-title"
                            >

                                <strong>
                                    ORBIT OS
                                </strong>

                                <span>
                                    Version 3.0 • Browser desktop simulation
                                </span>

                            </div>

                        </section>

                    </div>

                `

            });


        if (
            win.dataset.settingsReady ===
            "true"
        )
            return;


        win.dataset.settingsReady =
            "true";


        const theme =
            $("#themeSelect", win);

        const accent =
            $("#accentSelect", win);

        const motion =
            $("#motionToggle", win);


        theme.value =
            settings.theme;

        accent.value =
            settings.accent;

        motion.checked =
            !!settings.reducedMotion;


        theme.addEventListener(
            "change",
            () => {

                settings.theme =
                    theme.value;

                saveSettings();

                applySettings();

            }
        );


        accent.addEventListener(
            "change",
            () => {

                settings.accent =
                    accent.value;

                saveSettings();

                applySettings();

            }
        );


        motion.addEventListener(
            "change",
            () => {

                settings.reducedMotion =
                    motion.checked;

                saveSettings();

                applySettings();

            }
        );


        $("#lockButton", win)
            .addEventListener(
                "click",
                lockSystem
            );


        $("#fullscreenButton", win)
            .addEventListener(
                "click",
                toggleFullscreen
            );


        $("#resetButton", win)
            .addEventListener(
                "click",
                () => {

                    if (
                        confirm(
                            "Reset all saved ORBIT data?"
                        )
                    ) {

                        localStorage.removeItem(
                            FILES_KEY
                        );

                        localStorage.removeItem(
                            NOTES_KEY
                        );

                        localStorage.removeItem(
                            SETTINGS_KEY
                        );

                        location.reload();

                    }

                }
            );

    }


    /* =====================================================
       TASK MANAGER
       ===================================================== */

    function openTaskManager() {

        const win =
            createAppWindow({

                id:
                    "orbitTaskManagerWindow",

                title:
                    "Task Manager",

                icon:
                    "▦",

                width:
                    640,

                height:
                    420,

                content: `

                    <div
                        class="task-manager-app"
                    >

                        <div
                            class="task-manager-summary"
                            id="taskSummary"
                        ></div>

                        <div
                            class="task-manager-header"
                        >

                            <span>
                                Application
                            </span>

                            <span>
                                Status
                            </span>

                            <span>
                                Action
                            </span>

                        </div>

                        <div
                            class="task-manager-list"
                            id="taskList"
                        ></div>

                    </div>

                `

            });


        if (
            win.dataset.taskReady ===
            "true"
        )
            return;


        win.dataset.taskReady =
            "true";


        const list =
            $("#taskList", win);

        const summary =
            $("#taskSummary", win);


        function renderTasks() {

            list.innerHTML =
                "";

            const apps = [];


            if (
                filesWindow?.classList.contains(
                    "open"
                )
            ) {

                apps.push({

                    id:
                        "filesWindow",

                    name:
                        "Files",

                    icon:
                        "📁",

                    status:
                        "Running"

                });

            }


            dynamicWindows.forEach(
                (windowElement, id) => {

                    if (
                        !document.body.contains(
                            windowElement
                        )
                    )
                        return;

                    const title =
                        $(
                            ".window-title span",
                            windowElement
                        )?.textContent ||
                        "Application";

                    const icon =
                        $(
                            ".window-app-icon",
                            windowElement
                        )?.textContent ||
                        "◌";

                    const status =
                        windowElement.classList.contains(
                            "minimized"
                        )
                            ? "Minimized"
                            : "Running";


                    apps.push({

                        id,

                        name:
                            title,

                        icon,

                        status

                    });

                }
            );


            summary.textContent =
                `${apps.length} application${apps.length === 1 ? "" : "s"} in session`;


            apps.forEach(
                app => {

                    const row =
                        document.createElement(
                            "div"
                        );

                    row.className =
                        "task-manager-row";


                    row.innerHTML = `

                        <div class="task-manager-name">

                            <span>
                                ${escapeHtml(
                                    app.icon
                                )}
                            </span>

                            <strong>
                                ${escapeHtml(
                                    app.name
                                )}
                            </strong>

                        </div>

                        <span>
                            ${escapeHtml(
                                app.status
                            )}
                        </span>

                        <button
                            type="button"
                            data-task-close="${escapeHtml(
                                app.id
                            )}"
                        >
                            Close
                        </button>

                    `;


                    $(
                        "[data-task-close]",
                        row
                    ).addEventListener(
                        "click",
                        () => {

                            if (
                                app.id ===
                                "filesWindow"
                            ) {

                                closeFiles();

                            } else {

                                closeWindow(
                                    app.id
                                );

                            }

                            renderTasks();

                        }
                    );


                    list.appendChild(
                        row
                    );

                }
            );

        }


        renderTasks();

        const refreshTimer =
            setInterval(
                () => {

                    if (
                        !document.body.contains(
                            win
                        )
                    ) {

                        clearInterval(
                            refreshTimer
                        );

                        return;

                    }

                    renderTasks();

                },
                1000
            );

    }


    /* =====================================================
       START MENU
       ===================================================== */

    function ensureStartMenu() {

        let menu =
            byId(
                "orbitStartMenu"
            );


        if (menu)
            return menu;


        menu =
            document.createElement(
                "div"
            );

        menu.id =
            "orbitStartMenu";

        menu.className =
            "orbit-start-menu";


        menu.innerHTML = `

            <div class="start-menu-header">

                <div>

                    <strong>
                        ORBIT OS
                    </strong>

                    <span>
                        Application Center
                    </span>

                </div>

                <div class="start-menu-logo">
                    O
                </div>

            </div>

            <input
                class="start-menu-search"
                id="startSearch"
                type="search"
                placeholder="Search applications..."
                autocomplete="off"
            >

            <div
                class="start-menu-apps"
                id="startApps"
            ></div>

            <div class="start-menu-footer">

                <button
                    id="startLock"
                    type="button"
                >
                    Lock
                </button>

                <button
                    id="startRestart"
                    type="button"
                >
                    Restart
                </button>

                <button
                    id="startShutdown"
                    type="button"
                >
                    Shutdown
                </button>

            </div>

        `;


        osDesktop.appendChild(
            menu
        );


        const apps = () => [

            [
                "Files",
                "📁",
                openFiles
            ],

            [
                "Notes",
                "📝",
                openNotes
            ],

            [
                "Browser",
                "🌐",
                openBrowser
            ],

            [
                "Terminal",
                ">_",
                openTerminal
            ],

            [
                "Calculator",
                "🧮",
                openCalculator
            ],

            [
                "Settings",
                "⚙",
                openSettings
            ],

            [
                "Task Manager",
                "▦",
                openTaskManager
            ]

        ];


        function renderApps(
            filter = ""
        ) {

            const container =
                $("#startApps", menu);

            const query =
                filter
                    .trim()
                    .toLowerCase();


            container.innerHTML =
                "";


            apps()
                .filter(
                    app =>
                        app[0]
                            .toLowerCase()
                            .includes(
                                query
                            )
                )
                .forEach(
                    app => {

                        const button =
                            document.createElement(
                                "button"
                            );

                        button.type =
                            "button";

                        button.className =
                            "start-menu-app";


                        button.innerHTML = `

                            <span>
                                ${escapeHtml(
                                    app[1]
                                )}
                            </span>

                            <strong>
                                ${escapeHtml(
                                    app[0]
                                )}
                            </strong>

                        `;


                        button.addEventListener(
                            "click",
                            () => {

                                menu.classList.remove(
                                    "open"
                                );

                                app[2]();

                            }
                        );


                        container.appendChild(
                            button
                        );

                    }
                );

        }


        $("#startSearch", menu)
            .addEventListener(
                "input",
                event =>
                    renderApps(
                        event.target.value
                    )
            );


        $("#startLock", menu)
            .addEventListener(
                "click",
                lockSystem
            );


        $("#startRestart", menu)
            .addEventListener(
                "click",
                () =>
                    location.reload()
            );


        $("#startShutdown", menu)
            .addEventListener(
                "click",
                shutdownSystem
            );


        renderApps();

        return menu;

    }


    function toggleStartMenu() {

        const menu =
            ensureStartMenu();

        menu.classList.toggle(
            "open"
        );


        if (
            menu.classList.contains(
                "open"
            )
        ) {

            const search =
                $("#startSearch", menu);

            search.value =
                "";

            search.focus();

        }

    }


    taskbarOrbitButton?.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            toggleStartMenu();

        }
    );


    /* =====================================================
       SPOTLIGHT SEARCH
       ===================================================== */

    function openSpotlight() {

        let overlay =
            byId(
                "orbitSpotlight"
            );


        if (!overlay) {

            overlay =
                document.createElement(
                    "div"
                );

            overlay.id =
                "orbitSpotlight";

            overlay.className =
                "orbit-spotlight";


            overlay.innerHTML = `

                <div class="spotlight-card">

                    <div class="spotlight-title">
                        ORBIT Search
                    </div>

                    <input
                        id="spotlightInput"
                        type="search"
                        placeholder="Search apps and files..."
                        autocomplete="off"
                    >

                    <div
                        class="spotlight-results"
                        id="spotlightResults"
                    ></div>

                </div>

            `;


            document.body.appendChild(
                overlay
            );


            overlay.addEventListener(
                "click",
                event => {

                    if (
                        event.target ===
                        overlay
                    ) {

                        overlay.classList.remove(
                            "open"
                        );

                    }

                }
            );


            $("#spotlightInput", overlay)
                .addEventListener(
                    "input",
                    event =>
                        renderSpotlight(
                            event.target.value
                        )
                );

        }


        overlay.classList.add(
            "open"
        );


        const input =
            $("#spotlightInput", overlay);

        input.value =
            "";

        renderSpotlight(
            ""
        );

        input.focus();

    }


    function renderSpotlight(
        query
    ) {

        const results =
            byId(
                "spotlightResults"
            );

        if (!results)
            return;


        const q =
            query
                .trim()
                .toLowerCase();


        results.innerHTML =
            "";


        const apps = [

            [
                "Files",
                "📁",
                openFiles
            ],

            [
                "Notes",
                "📝",
                openNotes
            ],

            [
                "Browser",
                "🌐",
                openBrowser
            ],

            [
                "Terminal",
                ">_",
                openTerminal
            ],

            [
                "Calculator",
                "🧮",
                openCalculator
            ],

            [
                "Settings",
                "⚙",
                openSettings
            ],

            [
                "Task Manager",
                "▦",
                openTaskManager
            ]

        ];


        apps
            .filter(
                app =>
                    app[0]
                        .toLowerCase()
                        .includes(q)
            )
            .forEach(
                ([name, icon, action]) => {

                    const button =
                        document.createElement(
                            "button"
                        );

                    button.type =
                        "button";

                    button.className =
                        "spotlight-result";

                    button.innerHTML = `

                        <span>
                            ${escapeHtml(
                                icon
                            )}
                        </span>

                        <strong>
                            ${escapeHtml(
                                name
                            )}
                        </strong>

                    `;


                    button.addEventListener(
                        "click",
                        () => {

                            byId(
                                "orbitSpotlight"
                            )?.classList.remove(
                                "open"
                            );

                            action();

                        }
                    );


                    results.appendChild(
                        button
                    );

                }
            );


        const fileMatches = [];


        Object.entries(
            folderData
        ).forEach(
            ([folderId, folder]) => {

                folder.items.forEach(
                    item => {

                        if (
                            !q ||
                            item.name
                                .toLowerCase()
                                .includes(q)
                        ) {

                            fileMatches.push({
                                folderId,
                                item
                            });

                        }

                    }
                );

            }
        );


        fileMatches
            .slice(
                0,
                12
            )
            .forEach(
                ({
                    folderId,
                    item
                }) => {

                    const button =
                        document.createElement(
                            "button"
                        );

                    button.type =
                        "button";

                    button.className =
                        "spotlight-result";

                    button.innerHTML = `

                        <span>
                            ${escapeHtml(
                                item.icon ||
                                "📄"
                            )}
                        </span>

                        <strong>
                            ${escapeHtml(
                                item.name
                            )}
                        </strong>

                    `;


                    button.addEventListener(
                        "click",
                        () => {

                            byId(
                                "orbitSpotlight"
                            )?.classList.remove(
                                "open"
                            );

                            openFiles();

                            navigateTo(
                                folderId
                            );


                            const card =
                                $(
                                    `.file-card[data-orbit-id="${CSS.escape(
                                        item._orbitId
                                    )}"]`
                                );

                            if (card)
                                selectFileCard(
                                    card
                                );

                        }
                    );


                    results.appendChild(
                        button
                    );

                }
            );


        if (
            !results.children.length
        ) {

            results.innerHTML = `
                <div class="spotlight-empty">
                    No results found
                </div>
            `;

        }

    }


    taskbarSearch?.addEventListener(
        "click",
        openSpotlight
    );


    /* =====================================================
       KEYBOARD SHORTCUTS
       ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            const target =
                event.target;

            const isTyping =
                target &&
                (
                    target.tagName ===
                        "INPUT" ||
                    target.tagName ===
                        "TEXTAREA" ||
                    target.tagName ===
                        "SELECT" ||
                    target.isContentEditable
                );


            if (
                event.key ===
                "Escape"
            ) {

                closeContextMenu();

                byId(
                    "orbitSpotlight"
                )?.classList.remove(
                    "open"
                );

                byId(
                    "orbitStartMenu"
                )?.classList.remove(
                    "open"
                );

            }


            if (isTyping)
                return;


            if (
                event.ctrlKey &&
                event.key.toLowerCase() ===
                    "c" &&
                selectedItemId
            ) {

                event.preventDefault();

                copySelected();

                return;

            }


            if (
                event.ctrlKey &&
                event.key.toLowerCase() ===
                    "x" &&
                selectedItemId
            ) {

                event.preventDefault();

                cutSelected();

                return;

            }


            if (
                event.ctrlKey &&
                event.key.toLowerCase() ===
                    "v" &&
                clipboard
            ) {

                event.preventDefault();

                pasteClipboard();

                return;

            }


            if (
                event.ctrlKey &&
                event.shiftKey &&
                event.key.toLowerCase() ===
                    "n"
            ) {

                event.preventDefault();

                createNewFolder();

                return;

            }


            if (
                event.ctrlKey &&
                event.shiftKey &&
                event.key.toLowerCase() ===
                    "t"
            ) {

                event.preventDefault();

                openTerminal();

                return;

            }


            if (
                event.ctrlKey &&
                event.code ===
                    "Space"
            ) {

                event.preventDefault();

                openSpotlight();

                return;

            }


            if (
                event.key ===
                "Delete" &&
                selectedItemId
            ) {

                event.preventDefault();

                deleteSelected();

                return;

            }


            if (
                event.key ===
                "F2" &&
                selectedItemId
            ) {

                event.preventDefault();

                renameSelected();

                return;

            }


            if (
                event.key ===
                "F11"
            ) {

                event.preventDefault();

                toggleFullscreen();

            }

        }
    );


    /* =====================================================
       CONTEXT ACTIONS
       ===================================================== */

    document.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    "[data-orbit-action]"
                );


            if (button) {

                const action =
                    button.dataset.orbitAction;

                closeContextMenu();


                if (
                    action ===
                    "open"
                )
                    openFile(
                        selectedItem()
                    );

                else if (
                    action ===
                    "rename"
                )
                    renameSelected();

                else if (
                    action ===
                    "copy"
                )
                    copySelected();

                else if (
                    action ===
                    "cut"
                )
                    cutSelected();

                else if (
                    action ===
                    "paste"
                )
                    pasteClipboard();

                else if (
                    action ===
                    "delete"
                )
                    deleteSelected();

                else if (
                    action ===
                    "properties"
                )
                    showProperties();

                else if (
                    action ===
                    "new-folder"
                )
                    createNewFolder();

                else if (
                    action ===
                    "new-file"
                )
                    createNewFile();

                else if (
                    action ===
                    "refresh"
                )
                    renderFolder(
                        currentFolder
                    );

                return;

            }


            if (
                !event.target.closest(
                    "#orbitFileContextMenu"
                )
            ) {

                closeContextMenu();

            }


            const menu =
                byId(
                    "orbitStartMenu"
                );


            if (
                menu &&
                !event.target.closest(
                    "#orbitStartMenu"
                ) &&
                !event.target.closest(
                    "#taskbarOrbitButton"
                )
            ) {

                menu.classList.remove(
                    "open"
                );

            }

        }
    );


    /* =====================================================
       DESKTOP APP ICONS
       ===================================================== */

    $$(".desktop-app-icon")
        .forEach(
            icon => {

                if (
                    icon.dataset.app ===
                    "files"
                )
                    return;


                icon.addEventListener(
                    "dblclick",
                    () => {

                        const app =
                            icon.dataset.app;


                        if (
                            app ===
                            "notes"
                        )
                            openNotes();

                        else if (
                            app ===
                            "browser"
                        )
                            openBrowser();

                        else if (
                            app ===
                            "terminal"
                        )
                            openTerminal();

                        else if (
                            app ===
                            "calculator"
                        )
                            openCalculator();

                        else if (
                            app ===
                            "settings"
                        )
                            openSettings();

                        else if (
                            app ===
                            "taskmanager"
                        )
                            openTaskManager();

                    }
                );

            }
        );


    /* =====================================================
       FULLSCREEN
       ===================================================== */

    async function toggleFullscreen() {

        try {

            if (
                !document.fullscreenElement
            ) {

                await document
                    .documentElement
                    .requestFullscreen();

                notify(
                    "Fullscreen enabled."
                );

            }

            else {

                await document.exitFullscreen();

                notify(
                    "Fullscreen disabled."
                );

            }

        } catch (error) {

            notify(
                "Fullscreen is not available."
            );

        }

    }


    /* =====================================================
       LOCK / SHUTDOWN
       ===================================================== */

    function lockSystem() {

        byId(
            "orbitStartMenu"
        )?.classList.remove(
            "open"
        );

        byId(
            "orbitSpotlight"
        )?.classList.remove(
            "open"
        );

        closeContextMenu();


        if (osDesktop) {

            osDesktop.classList.remove(
                "active"
            );

            osDesktop.style.display =
                "none";

        }


        if (lockScreen) {

            lockScreen.style.display =
                "flex";

            lockScreen.classList.remove(
                "unlocking"
            );

            lockScreen.classList.add(
                "active"
            );

        }


        if (unlockButton) {

            unlockButton.disabled =
                false;

            unlockButton.innerHTML =
                "<span>Unlock</span><span>→</span>";

        }


        if (pinInput) {

            pinInput.value =
                "";

            pinInput.focus();

        }


        if (pinError)
            pinError.textContent =
                "";

    }


    function shutdownSystem() {

        const overlay =
            document.createElement(
                "div"
            );

        overlay.className =
            "orbit-shutdown-overlay";


        overlay.innerHTML = `

            <div class="shutdown-orbit">
                O
            </div>

            <strong>
                ORBIT OS
            </strong>

            <span>
                System is now offline.
            </span>

            <button
                id="powerOnButton"
                type="button"
            >
                Power On
            </button>

        `;


        document.body.appendChild(
            overlay
        );


        requestAnimationFrame(
            () =>
                overlay.classList.add(
                    "show"
                )
        );


        byId(
            "powerOnButton"
        ).addEventListener(
            "click",
            () =>
                location.reload()
        );

    }


    /* =====================================================
       DRAGGABLE WINDOWS
       ===================================================== */

    function makeWindowDraggable(
        win
    ) {

        if (!win || !osDesktop)
            return;


        const header =
            $(".window-header", win);

        if (!header)
            return;


        let dragging =
            false;

        let offsetX =
            0;

        let offsetY =
            0;


        header.addEventListener(
            "mousedown",
            event => {

                if (
                    event.target.closest(
                        ".window-controls"
                    )
                )
                    return;


                if (
                    win.classList.contains(
                        "maximized"
                    )
                )
                    return;


                dragging =
                    true;


                focusWindow(
                    win
                );


                const windowRect =
                    win.getBoundingClientRect();

                const desktopRect =
                    osDesktop.getBoundingClientRect();


                win.style.left =
                    (
                        windowRect.left -
                        desktopRect.left
                    ) + "px";


                win.style.top =
                    (
                        windowRect.top -
                        desktopRect.top
                    ) + "px";


                win.style.transform =
                    "none";


                offsetX =
                    event.clientX -
                    windowRect.left;

                offsetY =
                    event.clientY -
                    windowRect.top;


                win.classList.add(
                    "dragging"
                );

            }
        );


        document.addEventListener(
            "mousemove",
            event => {

                if (!dragging)
                    return;


                const desktopRect =
                    osDesktop.getBoundingClientRect();


                const width =
                    win.offsetWidth;

                const height =
                    win.offsetHeight;


                let left =
                    event.clientX -
                    desktopRect.left -
                    offsetX;


                let top =
                    event.clientY -
                    desktopRect.top -
                    offsetY;


                const maxLeft =
                    Math.max(
                        0,
                        desktopRect.width -
                            width
                    );

                const maxTop =
                    Math.max(
                        58,
                        desktopRect.height -
                            height -
                            74
                    );


                left =
                    Math.max(
                        0,
                        Math.min(
                            left,
                            maxLeft
                        )
                    );


                top =
                    Math.max(
                        58,
                        Math.min(
                            top,
                            maxTop
                        )
                    );


                win.style.left =
                    left + "px";

                win.style.top =
                    top + "px";

            }
        );


        document.addEventListener(
            "mouseup",
            () => {

                if (!dragging)
                    return;

                dragging =
                    false;

                win.classList.remove(
                    "dragging"
                );

            }
        );

    }


    /* =====================================================
       INITIALIZATION
       ===================================================== */

    loadFileSystem();

    ensureIds();

    saveFileSystem();

    loadNotes();

    loadSettings();

    applySettings();

    renderFolder(
        "home"
    );


    /* =====================================================
       PUBLIC API
       ===================================================== */

    window.ORBIT = {

        openFiles,

        openNotes,

        openBrowser,

        openTerminal,

        openCalculator,

        openSettings,

        openTaskManager,

        openSpotlight,

        toggleFullscreen,

        lock:
            lockSystem,

        shutdown:
            shutdownSystem,

        notify,

        resetFiles:
            () => {

                localStorage.removeItem(
                    FILES_KEY
                );

                location.reload();

            }

    };

});