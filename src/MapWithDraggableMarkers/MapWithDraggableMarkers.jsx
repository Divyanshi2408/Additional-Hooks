import React, { useState, useCallback } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";

// Fix default marker icon issue in Leaflet
import "leaflet/dist/leaflet.css";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const MapWithDraggableMarkers = () => {
  const [markerPosition, setMarkerPosition] = useState([51.505, -0.09]);

  // Handle drag start (memoized)
  const handleDragStart = useCallback(() => {
    console.log("Drag started!");
  }, []);

  // Handle drag end (memoized)
  const handleDragEnd = useCallback((event) => {
    const newPosition = event.target.getLatLng();
    console.log("New position:", newPosition);
    setMarkerPosition([newPosition.lat, newPosition.lng]);
  }, []);

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <MapContainer
        center={markerPosition}
        zoom={13}
        style={{ width: "100%", height: "100%" }}
      >
        {/* Tile layer */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Draggable marker */}
        <Marker
          position={markerPosition}
          draggable
          eventHandlers={{
            dragstart: handleDragStart,
            dragend: handleDragEnd,
          }}
        />
      </MapContainer>
    </div>
  );
};

export default MapWithDraggableMarkers;
