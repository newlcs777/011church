export default function MinistryPageWrapper({ title, children }) {
  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <div className="bg-white rounded-xl shadow p-4">
        {children}
      </div>
    </div>
  );
}
