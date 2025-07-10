//https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
//https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
//https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

window.onload = function() {  
    document.addEventListener('click', e => {
        if (e.target.matches('button.select-education')) {
            resetAllEducationButtons();
            e.target.disabled=true;
            getEducationSnippet(e.target.value);
        }     
    });
    getEducationSnippet("./snippets/university.html");

    document.addEventListener('click', e => {
        if (e.target.matches('button.select-employment')) {
            resetAllEmploymentButtons();
            e.target.disabled=true;
            hideAllEmploymentSnippets();
            unhideEmploymentSnippet(e.target.value);
        }     
    });
    hideAllEmploymentSnippets();
    unhideEmploymentSnippet("Regional_Fried_Chicken_Fast_Food_Outlet");
}

function resetAllEducationButtons(){
    var buttons = document.querySelectorAll("button.select-education");
    buttons.forEach(btn => {
            btn.removeAttribute('disabled');
        }
    )
}

function resetAllEmploymentButtons(){
    var buttons = document.querySelectorAll("button.select-employment");
    buttons.forEach(btn => {
            btn.removeAttribute('disabled');
        }
    )
}

function hideAllEmploymentSnippets(){
    var divs = document.getElementById("employment_history").querySelectorAll("div.cv-item");
    divs.forEach(div => {
            div.style.display="none";
        }
    )
}

function unhideEmploymentSnippet(id) {
    var div = document.getElementById(id);
    div.style.display="flex";
}

async function getEducationSnippet(url) {
    try{
        const response = await fetch(url);
        if (!response.ok) {
             throw new Error(`Response status: ${response.status}`);
        }
        var filter = document.getElementById("education-item");
        var data = await response.text();
        filter.innerHTML = data;
                
    }
    catch (error) {
        console.error(error);
    }
}