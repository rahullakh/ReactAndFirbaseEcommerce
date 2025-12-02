import React, { createContext, useEffect, useState } from "react";
//create Context
export const ThemeContext = createContext();

//Provider
const ThemeProvider = ({children})=>{
    const[theme,setTheme] = useState("dark");
   
    useEffect(()=>{
      if(theme === "dark"){
        document.documentElement.classList.add("dark");
      }else{
        document.documentElement.classList.remove('dark');
      }
   },[theme])
    const toggleTheme = ()=>{
        setTheme(theme === "light" ? "dark" : "light");
    }
    return(
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
};

export default ThemeProvider;