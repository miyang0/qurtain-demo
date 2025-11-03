let darkmode = localStorage.getItem('darkmode') 
// a variable that gets the current theme from local storage (local doesnt get cleared, while session does; it's just a way of storing data, the theme you chose last time in this case) 
// the data/string i set later on is what will be the value of this variable, is important for the event listener if statement to determine whether darkmode is active or null
const themeSwitch = document.getElementById('theme-switch') 
// the button i made in htmlcss its id is the value here so i can add an event listener to the button later
const themeSwitch2 = document.getElementById('theme-switch2') 

const enableDarkmode = () => {
    document.body.classList.add('darkmode') 
    // adds the class 'darkmode' to the body
    localStorage.setItem('darkmode', 'active') 
    // local storage can only store strings, so a boolean cant be used here 
}

const disableDarkmode = () => {
    document.body.classList.remove('darkmode') 
    // removes the class 'darkmode' from the body (this basically reverts your site to light mode)
    localStorage.setItem('darkmode', null) 
    // removes darkmode (bc only strings can be stored in local storage and not boolean, i used null as it is also a negative just like false)
}

if(darkmode === "active") enableDarkmode() // if darkmode returns the "active" string enables darkmode

themeSwitch.addEventListener("click", () => {
    darkmode = localStorage.getItem('darkmode')
    darkmode !== "active" ? enableDarkmode() : disableDarkmode()   

    /// if (?) darkmode = not active, enableDarkmode(), else (:) disableDarkmode(). event listener: click to make the button run the code! 
    // i used a shortened version of the if/else statement here, but it'd basically look like the comment below if i'd do it normally.

    /* if(darkmode !== "active") {
        enableDarkmode
    } else {
        disableDarkmode
    } */  
})  

themeSwitch2.addEventListener("click", () => {
    darkmode = localStorage.getItem('darkmode')
    darkmode !== "active" ? enableDarkmode() : disableDarkmode()    
})  



