const colors = {
    // Primary & Background
    primary: (opacity = 1) => `rgb(255, 0, 0)`,
    white: (opacity = 1) => `rgb(255, 255, 255)`,
    black: (opacity = 1) => `rgb(0, 0, 0)`,
    
    // Grayscale
    grey: (opacity = 1) => `rgb(60, 60, 60)`,
    darkGrey: (opacity = 1) => `rgb(121, 121, 121)`,
    lightGrey: (opacity = 1) => `rgba(240, 242, 245, 1)`,
    // Accents
    light: (opacity = 1) => `rgba(255, 0, 0, 0.1)`,
}
export default colors;