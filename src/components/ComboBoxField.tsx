/** biome-ignore-all lint/suspicious/noExplicitAny: Componente de combobox personalizado */
"use client";

import { type Control, Controller } from "react-hook-form";

type Option = { label: string; value: string };

interface ComboBoxFieldProps {
  name: string;
  control: Control<any>;
  options: Option[];
  label?: string;
  defaultValue?: string;
}

export function ComboBoxField({
  name,
  control,
  options,
  label = "",
  defaultValue = "",
}: ComboBoxFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({
        fieldState,
        field: { onChange, value, ref, ...restField },
      }) => (
        <div
          className="relative"
          data-combo-box='{"minSearchLength":1, "outputEmptyTemplate": "<div class=\"dropdown-item\">No se encontraron resultados...</div>"}'
        >
          <label htmlFor={name} className="mb-1 block">
            {label}
          </label>
          <input
            id={name}
            {...restField}
            ref={ref}
            value={value ?? defaultValue}
            onChange={(e) => onChange(e.target.value)}
            data-combo-box-input
            className={`input ${fieldState.error ? "is-invalid" : ""}`}
            aria-autocomplete="list"
            aria-controls={`${name}-listbox`}
          />
          {fieldState.error && (
            <span className="helper-text">{fieldState.error.message}</span>
          )}
          <div
            id={`${name}-listbox`}
            role="listbox"
            style={{ display: "none" }}
            // className="absolute z-10 mt-1 w-full bg-white border rounded shadow-lg max-h-60 overflow-auto"
            className="absolute z-50 max-h-44 w-full space-y-0.5 overflow-y-auto rounded-box bg-base-100 p-2 shadow-base-300/20 shadow-lg"
            data-combo-box-output
          >
            {options.map((opt) => (
              <div
                key={opt.value}
                role="option"
                tabIndex={0}
                data-combo-box-output-item
                data-combo-box-value={opt.value}
                data-combo-box-search-text={opt.label}
                onClick={() => onChange(opt.value)}
                onKeyDown={() => onChange(opt.value)}
                className="dropdown-item combo-box-selected:dropdown-active cursor-pointer"
              >
                {opt.label}
              </div>
            ))}
          </div>
        </div>
      )}
    />
  );
}
