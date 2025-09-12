// components/WorldMap.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useLanguage } from '../App';

const WorldMap = ({ biodiversityLocations }) => {
  const { t } = useLanguage();

  return (
    <div className="bg-slate-800/50 p-6 rounded-2xl relative z-0">
      <h3 className="text-xl font-semibold mb-4 text-cyan-300">{t('samplingLocations')}</h3>
      <MapContainer center={[20, 0]} zoom={2} style={{ height: "400px", width: "100%", borderRadius: "1rem", zIndex: 0 }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {biodiversityLocations.map((loc, i) => (
          <Marker key={i} position={[loc.lat, loc.lng]}>
            <Popup>
              <strong>{loc.name}</strong><br />
              Species: {loc.species}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <div className="mt-4 text-sm text-cyan-200">
        <strong>Biodiversity Data:</strong>
        <ul>
          {biodiversityLocations.map((loc, i) => (
            <li key={i}>{loc.name}: {loc.species} species</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WorldMap;