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
  const [showRightSidebar, setShowRightSidebar] = useState(false);
  const [showLeftSidebar, setShowLeftSidebar] = useState(false);
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

  const sidebarWidth = "min(50vw, 35rem)";
  const calculateMapWidth = () => {
    if (showRightSidebar && showLeftSidebar) return `calc(100vw - 2 * ${sidebarWidth})`;
    if (showRightSidebar || showLeftSidebar) return `calc(100vw - ${sidebarWidth})`;
    return "100vw";
  };

  return (
    <div className="relative w-screen h-screen font-sans overflow-hidden">

	  {/* --- Right sidebar (basemap layers) -------------------------- */}

      {/* Basemap layers (right sidebar) toggle button */}
	  {!showRightSidebar && (
  		<button
    		onClick={() => setShowRightSidebar(true)}
    		className="absolute top-4 right-4 z-30 p-2 bg-white shadow rounded-full hover:bg-gray-100"
    		title="Control basemap layers"
  		>
    		<Layers className="w-5 h-5" />
  		</button>
	  )}

      {/* Basemaps layers sidebar (on the right) */}
	  {/* This outer div controls the width (which is 0 when collapsed) */}
	  <div
  			style={{ width: showRightSidebar ? "min(50vw, 35rem)" : "0" }}
  			className={`fixed top-0 right-0 h-full bg-white shadow-lg z-20 transition-all duration-300 ease-in-out overflow-hidden ${
    		showRightSidebar ? "p-6" : "p-0"
  			}`}
	  >
	    {/* This inner div controls the sidebar opacity. */}
        <div
          className={`transition-opacity duration-300 ${
            showRightSidebar ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Control basemap layers</h2>
            <button onClick={() => setShowRightSidebar(false)} className="hover:text-gray-600">
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
	  
	  {/* --- Left sidebar (habitat layers) -------------------------- */}
	  
      {/* Habitat layers (left sidebar) toggle button */}
	  {!showLeftSidebar && (
  		<button
    		onClick={() => setShowLeftSidebar(true)}
    		className="absolute top-4 left-4 z-30 p-2 bg-white shadow rounded-full hover:bg-gray-100"
    		title="Control habitat layers"
  		>
    		<Layers className="w-5 h-5" />
  		</button>
	  )}

      {/* Habitat layers sidebar (on the left) */}
	  {/* This outer div controls the width (which is 0 when collapsed) */}
	  <div
  			style={{ width: showLeftSidebar ? "min(50vw, 35rem)" : "0" }}
  			className={`fixed top-0 left-0 h-full bg-white shadow-lg z-20 transition-all duration-300 ease-in-out overflow-hidden ${
    		showLeftSidebar ? "p-6" : "p-0"
  			}`}
	  >
	    {/* This inner div controls the sidebar opacity. */}
        <div
          className={`transition-opacity duration-300 ${
            showLeftSidebar ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Control basemap layers</h2>
            <button onClick={() => setShowLeftSidebar(false)} className="hover:text-gray-600">
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
			// If the left sidebar is open, the map needs to move to the right.
			marginLeft: showLeftSidebar ? sidebarWidth : 0,
			width: calculateMapWidth(),
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

