export default function LoadingSkeleton() {
  return (
    <section className="loading-page">
      <div className="skeleton skeleton-heading" />

      <div className="skeleton-grid">
        {[1, 2, 3].map((item) => (
          <div className="skeleton-card" key={item}>
            <div className="skeleton skeleton-image" />

            <div className="skeleton skeleton-line" />

            <div className="skeleton skeleton-small" />

            <div className="skeleton skeleton-button" />
          </div>
        ))}
      </div>
    </section>
  );
}
