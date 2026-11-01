"use client";

import dynamic from "next/dynamic";

const DeliveryMap = dynamic(() => import("./DeliveryMap"), {
  ssr: false,
  loading: () => (
    <div className="map-loading">
      <span className="loading-icon">📍</span>
      <p>Preparing your delivery map...</p>
    </div>
  ),
});

export default function MapPanel({ order }) {
  return (
    <section className="panel map-panel">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">DELIVERY LOCATION</span>
          <h2>Follow your delivery</h2>
        </div>
        <span className="map-live">
          <span className="live-dot"></span>
          Demo map
        </span>
      </div>

      <DeliveryMap order={order} />

      <div className="map-legend">
        <span>
          <i className="legend-courier"></i>
          Courier
        </span>
        <span>
          <i className="legend-destination"></i>
          Destination
        </span>
      </div>
    </section>
  );
}
