export function Checkbox({ checked, onCheckedChange, children }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className="h-4 w-4"
      />
      {children}
    </label>
  );
}