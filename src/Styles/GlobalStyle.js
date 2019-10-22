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
}
canvas{
  background-color: white;
}
#root{
    width: 100vw;
    height: 100vh;
}
`;

export default GlobalStyles;
