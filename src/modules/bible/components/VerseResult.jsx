// src/modules/bible/components/VerseResult.jsx
export default function VerseResult({ data }) {
  if (!data) return null;

  return (
    <div className="card bg-base-100 shadow-md mt-4">
      <div className="card-body">
        <h2 className="card-title text-lg font-bold">{data.reference}</h2>
        <p className="leading-relaxed">{data.text}</p>
      </div>
    </div>
  );
}
