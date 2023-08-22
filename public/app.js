document.onclick = hideMenu;
document.oncontextmenu = rightClick;

function hideMenu() {
    document.getElementById(
        "contextMenu").style.display = "none"
}

function rightClick(e) {
    e.preventDefault();
    
    if (document.getElementById("contextMenu").style.display == "block")
        hideMenu();
    else {
        var menu = document.getElementById("contextMenu")
        menu.style.display = 'block';
        menu.style.left = e.pageX + "px";
        menu.style.top = e.pageY + "px";
        if (e.target.id) {
            let viewItem = document.getElementById("viewItemLink")
            viewItem.setAttribute("href", "items/" + e.target.id)
            let editItem = document.getElementById("editItemLink")
            editItem.setAttribute("href", "items/" + e.target.id + "/edit")
        }
        let newItem = document.getElementById("newItemLink")
        newItem.setAttribute("href", "items/new")
    }
}