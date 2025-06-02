import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100vw',
  height: '100vh',
};

const center = {
  lat: 51.752,
  lng: -1.257, // Oxford, UK
};

const App = () => {
  return (
    <div className="relative">
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
          mapTypeId="terrain"
        />
      </LoadScript>
      <div className="absolute top-0 right-0 m-4 w-64 bg-white p-4 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-2">Menu</h2>
        <p className="text-sm text-gray-600">Sidebar content here</p>
      </div>
    </div>
  );
};

export default App;
