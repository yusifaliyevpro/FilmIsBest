import React from "react";

const CustomCheckboxGrid = React.forwardRef((props, ref) => {
  const { type, value, onChange } = props;
  const columns = 2; // Sütun sayısını belirleyin
  const items = type.options.list;

  const handleChange = (event) => {
    const newValue = event.target.value;
    if (value.includes(newValue)) {
      onChange(PatchEvent.from(unset(newValue)));
    } else {
      onChange(PatchEvent.from(set(newValue)));
    }
  };

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: "10px",
        }}
      >
        {items.map((item) => (
          <label key={item.value} style={{ display: "block" }}>
            <input
              type="checkbox"
              value={item.value}
              checked={value.includes(item.value)}
              onChange={handleChange}
            />
            {item.title}
          </label>
        ))}
      </div>
    </div>
  );
});

export default CustomCheckboxGrid;
