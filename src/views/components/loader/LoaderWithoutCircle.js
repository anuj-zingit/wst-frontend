import React from "react"
import ContentLoader from "react-content-loader"

const LoaderWithoutCircle = (props) => (
  <ContentLoader 
    speed={2}
    width="100%"
    height={150}
    viewBox="0 0 100% 150"
    backgroundColor="#dddddd"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="10" cy="20" r="8" /> 
    <rect x="25" y="15" rx="5" ry="5" width="100%" height="10" /> 
    <circle cx="10" cy="50" r="8" /> 
    <rect x="25" y="45" rx="5" ry="5" width="100%" height="10" /> 
    <circle cx="10" cy="80" r="8" /> 
    <rect x="25" y="75" rx="5" ry="5" width="100%" height="10" /> 
    <circle cx="10" cy="110" r="8" /> 
    <rect x="25" y="105" rx="5" ry="5" width="100%" height="10" />
  </ContentLoader>
)

export default LoaderWithoutCircle