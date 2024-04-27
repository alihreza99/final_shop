"use client";
import NeshanMap from "@neshan-maps-platform/react-openlayers";
import "@neshan-maps-platform/react-openlayers/dist/style.css";

function App() {
  
  return (
    <NeshanMap
      mapKey="web.98e7463be9ea4a879897b8cdd9dd2eab"
      center={{ latitude: 35.69672648316882, longitude: 51.36281969540723 }}
      defaultType="standard-night"
      zoom={10}
    ></NeshanMap>

    
  );
}

export default App;


