function ResourceCard({ resource }) {
  return (
    <article className="resource-card">
      <h3>{resource.title}</h3>

      <p>
        <strong>Type:</strong> {resource.type}
      </p>

      <p>{resource.description}</p>

      <button onClick={() => alert(`Opening ${resource.title}`)}>
        View Resource
      </button>
    </article>
  );
}

export default ResourceCard;
