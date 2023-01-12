/* This example requires Tailwind CSS v2.0+ */
export default function Divider() {
  return (
    <div className="relative py-8">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-300" />
      </div>
    </div>
  );
}
