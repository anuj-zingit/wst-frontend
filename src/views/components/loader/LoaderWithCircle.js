import React from "react"
import ContentLoader from "react-content-loader"

const LoaderWithCircle = (props) => (
  <ContentLoader 
    speed={2}
    width="100%"
    height={150}
    viewBox="0 0 100% 150"
    backgroundColor="#dddddd"
    foregroundColor="#ecebeb"
    {...props}
  > 
    <rect x="5" y="15" rx="5" ry="5" width="100%" height="10" /> 
    <rect x="5" y="45" rx="5" ry="5" width="100%" height="10" /> 
    <rect x="5" y="75" rx="5" ry="5" width="100%" height="10" /> 
    <rect x="5" y="105" rx="5" ry="5" width="100%" height="10" />
    <rect x="5" y="15" rx="5" ry="5" width="100%" height="10" /> 
     
    
  </ContentLoader>
)

export default LoaderWithCircle