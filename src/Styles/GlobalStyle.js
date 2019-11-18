import { createGlobalStyle } from "styled-components";
import regularFont from "../assets/fonts/googlesans-regular-webfont.woff2";
import boldFont from "../assets/fonts/googlesans-bold-webfont.woff2";

const GlobalStyles = createGlobalStyle`

@font-face {
    font-family: "Google Sans";
    src: url(${boldFont});
    font-weight: bold;
}
@font-face {
    font-family: "Google Sans";
    src: url(${regularFont});
    font-weight: normal;
}

*,*::before,*::after{
    padding: 0;
    margin:0;
    box-sizing: border-box;
    position: relative;
    font-family: Google Sans;
    font-weight: normal;
    @media screen and (min-width: 2500px) {
    font-size: 2rem;
    }
    @media screen and (min-width: 1940px) {
    font-size: 1.5rem;
    }
    font-size: 1rem;
    color: #202020;
}
canvas {
    background: black;
    
}
#root{
    width: 100vw;
    height: 100vh;

}
`;

export default GlobalStyles;
