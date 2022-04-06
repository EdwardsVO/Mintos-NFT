/* eslint-disable react/jsx-no-comment-textnodes */
import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  ChangeEvent,
  FormEventHandler,
} from 'react';

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<
    | HTMLInputElement
    | HTMLSelectElement
    | HTMLTextAreaElement
    | HTMLDataListElement
  >,
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement
  | HTMLDataListElement
> & {
  label: string;
  labelSrOnly?: boolean;
  notMargin?: boolean;
  onChange?: (event: any) => void;
  children?: React.ReactNode;
  _ref?: React.LegacyRef<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >;
};

function Input({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
  children,
  className = '',
  labelSrOnly = false,
  notMargin = false,
  _ref = null,
  ...rest
}: InputProps) {
  if (type === 'textarea') {
    // w-full p-2 text-base placeholder-gray-500 text-gray-800 rounded-md bg-gray-100 mt-2 focus:outline-none outline-none focus:shadow-outline-indigo border border-gray-100 shadow-md
    return (
      <>
        <label
          htmlFor={name}
          className={`block ${notMargin ? 'mb-0' : 'mb-4'} ${className}`}
        >
          <span
            className={`text-gray-700 text-base ${
              labelSrOnly ? 'sr-only' : ''
            }`}
          >
            {label}
          </span>
          <textarea
            id={name}
            name={name}
            defaultValue={value}
            className="appearance-none border-gray-300 border rounded-md py-2 px-3 font-base leading-6 mt-1 block w-full disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700"
            onChange={onChange}
            disabled={rest.disabled}
          />
        </label>
      </>
    );
  }
  if (type === 'select') {
    // w-full p-2 text-base placeholder-gray-500 text-gray-800 rounded-md bg-gray-100 mt-2 focus:outline-none outline-none focus:shadow-outline-indigo border border-gray-100 shadow-md
    return (
      <label
        htmlFor={name}
        className={`block ${notMargin ? 'mb-0' : 'mb-4'} ${className}`}
      >
        <span
          className={`text-gray-700 text-base ${labelSrOnly ? 'sr-only' : ''}`}
        >
          {label}
        </span>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <select
          name={name}
          id={name}
          defaultValue={value}
          onChange={onChange}
          className="appearance-none border-gray-300 border rounded-md py-2 px-3 font-base leading-6 block w-full mt-1 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700"
          disabled={rest.disabled}
          {...rest}
        >
          {children}
        </select>
      </label>
    );
  }
  if (type === 'datalist') {
    return (
      <label
        htmlFor={name}
        className={`block ${notMargin ? 'mb-0' : 'mb-4'} ${className}`}
      >
        <span
          className={`text-gray-700 text-base ${labelSrOnly ? 'sr-only' : ''}`}
        >
          {label}
        </span>
        <input
          className="appearance-none border-gray-300 border rounded-md py-2 px-3 font-base leading-6 block w-full mt-1 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700"
          onChange={(e) => {
            e.preventDefault();
          }}
          list={name}
        />
        <datalist id={name} defaultValue={value}>
          {children}
        </datalist>
      </label>
    );
  }
  // w-full p-2 text-base placeholder-gray-500 text-gray-800 rounded-md bg-gray-100 mt-2 focus:outline-none outline-none focus:shadow-outline-indigo border border-gray-100 shadow-md
  return (
    <label
      htmlFor={name}
      className={`block ${notMargin ? 'mb-0' : 'mb-4'} ${className}`}
    >
      <span
        className={`text-gray-700 text-base ${labelSrOnly ? 'sr-only' : ''}`}
      >
        {label}
      </span>
      <input
        name={name}
        id={name}
        type={type}
        value={value}
        placeholder={placeholder || label}
        className="appearance-none border-gray-300 border rounded-md py-2 px-3 font-base leading-6 mt-1 block w-full disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700"
        onChange={onChange}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ref={_ref as React.LegacyRef<HTMLInputElement>}
        {...rest}
      />
    </label>
  );
}

export default Input;
