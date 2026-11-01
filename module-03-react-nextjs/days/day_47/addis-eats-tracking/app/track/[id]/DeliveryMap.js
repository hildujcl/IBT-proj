"use client";

import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet";

import { useEffect } from "react";
import "leaflet/dist/leaflet.css";

function FitMap({ courier, destination }) {
  const map = useMap();

  useEffect(() => {
    map.fitBounds(
      [
        [courier.lat, courier.lng],
        [destination.lat, destination.lng],
      ],
      { padding: [50, 50] },
    );
  }, [map, courier, destination]);

  return null;
}

export default function DeliveryMap({ order }) {
  const courier = order.courierLocation;
  const destination = order.destination;

  return (
    <div className="delivery-map">
      <MapContainer
        center={[courier.lat, courier.lng]}
        zoom={15}
        scrollWheelZoom={true}
        className="leaflet-map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitMap courier={courier} destination={destination} />

        <CircleMarker
          center={[courier.lat, courier.lng]}
          radius={12}
          pathOptions={{
            color: "#ffffff",
            fillColor: "#e94e91",
            fillOpacity: 1,
            weight: 4,
          }}
        >
          <Popup>
            <strong>🛵 {order.courier}</strong>
            <br />
            Your delivery courier
          </Popup>
        </CircleMarker>

        <CircleMarker
          center={[destination.lat, destination.lng]}
          radius={11}
          pathOptions={{
            color: "#ffffff",
            fillColor: "#7a65c8",
            fillOpacity: 1,
            weight: 4,
          }}
        >
          <Popup>
            <strong>🏠 Delivery destination</strong>
            <br />
            {order.deliveryAddress}
          </Popup>
        </CircleMarker>
      </MapContainer>
    </div>
  );
}
