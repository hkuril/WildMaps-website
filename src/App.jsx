import { useCallback, useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { Layers, X } from "lucide-react";

const center = {
  lat: 0.0,
  lng: 114.0,
};

const startingZoom = 6;

export default function MapApp() {
  const [mapOptions, setMapOptions] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [mapType, setMapType] = useState("terrain");

  const handleMapLoad = useCallback(() => {
    setMapOptions({
      disableDefaultUI: true,
      zoomControl: true,
      zoomControlOptions: {
        position: window.google.maps.ControlPosition.RIGHT_BOTTOM,
      },
      scaleControl: true,
      styles: [
        {
          featureType: 'all',
          elementType: 'labels.icon',
          stylers: [{ visibility: 'off' }],
        },
      ],
      mapTypeId: mapType,
    });
  }, [mapType]);

  return (
    <div className="relative w-screen h-screen font-sans overflow-hidden">
      {/* Layers toggle button */}
	  {!showSidebar && (
  		<button
    		onClick={() => setShowSidebar(true)}
    		className="absolute top-4 right-4 z-30 p-2 bg-white shadow rounded-full hover:bg-gray-100"
    		title="Control basemap layers"
  		>
    		<Layers className="w-5 h-5" />
  		</button>
	  )}

      {/* Sidebar with transition */}
	  <div
  			style={{ width: showSidebar ? "min(50vw, 35rem)" : "0" }}
  			className={`fixed top-0 right-0 h-full bg-white shadow-lg z-20 transition-all duration-300 ease-in-out overflow-hidden ${
    		showSidebar ? "p-6" : "p-0"
  			}`}
	  >
	  {/*
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg z-20 transition-all duration-300 ease-in-out ${
          showSidebar ? "w-1/2 p-6" : "w-0 p-0 overflow-hidden"
        }`}
      >
	  */}
        <div
          className={`transition-opacity duration-300 ${
            showSidebar ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Control basemap layers</h2>
            <button onClick={() => setShowSidebar(false)} className="hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="mb-4">
            <h3 className="text-md font-medium">Google basemap</h3>
            <div className="space-y-2 mt-2">
              {[
                { label: "Terrain", value: "terrain" },
                { label: "Road map", value: "roadmap" },
                { label: "Satellite", value: "hybrid" },
                { label: "Satellite (no labels)", value: "satellite" },
              ].map(({ label, value }) => (
                <label key={value} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="basemap"
                    value={value}
                    checked={mapType === value}
                    onChange={() => setMapType(value)}
                    className="form-radio text-blue-600"
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-md font-medium">Other base layers</h3>
	    	<p className="text-md leading-relaxed text-gray-700">
    			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  			</p>
          </div>
        </div>
      </div>

      {/* Map container */}
	  <div
  		style={{
    	width: showSidebar ? `calc(100vw - min(50vw, 35rem))` : "100vw",
  		}}
  		className="transition-all duration-300 ease-in-out h-full"
		>
	  {/*
      <div
        className={`transition-all duration-300 ease-in-out ${
          showSidebar ? "w-1/2" : "w-full"
        } h-full`}
      >*/}
        <LoadScript
          googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
          onLoad={handleMapLoad}
        >
          {mapOptions ? (
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%' }}
              center={center}
              zoom={startingZoom}
              options={mapOptions}
              mapTypeId={mapType}
            />
          ) : (
            <div style={{ width: '100%', height: '100%' }}>Loading map...</div>
          )}
        </LoadScript>
      </div>
    </div>
  );
}

