"use client";

type Props = {
  currency: string;
  onChange: (value: string) => void;
};

export default function ToggleCurrency({ currency, onChange }: Props) {
  return (
    <div className="flex space-x-2 mb-4">
      {["usd", "btc"].map((c) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          className={`px-4 py-1 rounded border ${
            currency === c
              ? "bg-blue-500 text-white"
              : "bg-gray-800 text-gray-300 border-gray-600"
          }`}
        >
          {c.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
