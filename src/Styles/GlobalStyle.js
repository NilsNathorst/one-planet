import { createGlobalStyle } from "styled-components";
import bg from "../assets/bg.png";
const GlobalStyles = createGlobalStyle`

@font-face {
    font-family: "Google Sans";
    src: url("../assets/fonts/googlesans-bold-webfont.woff2");
    font-weight: bold;
}
@font-face {
    font-family: "Google Sans";
    src: url("../assets/fonts/googlesans-regular-webfont.woff2");
    font-weight: normal;
}

*,*::before,*::after{
    padding: 0;
    margin:0;
    box-sizing: border-box;
    position: relative;
		font-family: Google Sans;
		font-weight: normal;
}
canvas{
    background: url(${bg});
}
#root{
    width: 100vw;
    height: 100vh;
}
`;

export default GlobalStyles;
