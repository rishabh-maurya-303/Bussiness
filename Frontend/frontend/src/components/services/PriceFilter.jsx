function PriceOption({
  label,
  checked,
  onChange,
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-600">

      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-slate-300 accent-indigo-600"
      />

      {label}

    </label>
  );
}

export default PriceOption;