// Import Javascript libraries.
// React: Library for interactive web page features.
import { useCallback, useState, React } from "react";
// react-google-maps: Library to make maps using the Google Maps API.
import { GoogleMap, LoadScript } from "@react-google-maps/api";
// lucide-react: Library for icons.
import { ChevronLeft, ChevronRight } from "lucide-react";

// Define a full-page container style.
const containerStyle = {
  width: '100vw',
  height: '100vh',
};

// Choose the starting viewpoint of the map.
// Oxford UK: 51.752, -1.257
const center = {
  lat: 51.752, 
  lng: -1.257,
};

export default function MapApp() {
  // State tracker to determine if the map options have been set.
  const [mapOptions, setMapOptions] = useState(null);

  // Event handler for the loading of the map.
  const handleMapLoad = useCallback(() => {
      setMapOptions({
		// Reset the UI, including removing street view and full-screen.
		disableDefaultUI: true,
		//// Disable Street View.
        //streetViewControl: false,
		//// Disable full-screen button.
        //fullscreenControl: false,
		//// Move zoom control to bottom left.
        zoomControl: true,
        zoomControlOptions: {
          position: window.google.maps.ControlPosition.LEFT_BOTTOM,
        },
		// Move map-type control to bottom right.
        mapTypeControl: true,
        mapTypeControlOptions: {
          position: window.google.maps.ControlPosition.LEFT_BOTTOM,
        },
		// Show scale bar.
        scaleControl: true,
		//
        // Remove POI symbols and labels such as restaurants,
		// shops and landmarks.
        styles: [
          {
            featureType: 'all',
            elementType: 'labels.icon',
            stylers: [{ visibility: 'off' }],
          },
        ],
		// Use a terrain hillshade basemap by default.
		mapTypeId: 'terrain',
      });
  }, []);

  return (
    <div className="relative w-screen h-screen font-sans">
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} onLoad={handleMapLoad}>
      {mapOptions && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
          mapTypeId="terrain"
          options={mapOptions}
        />
      )}
      {!mapOptions && (
        // Render a placeholder until the map options are ready.
        <div style={containerStyle}>Loading map...</div>
      )}
    </LoadScript>

    </div>
  );
}
