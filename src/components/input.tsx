"use client";

import { useState } from "react";

interface IInput {
  name: string;
  label: string;
  type?: string;
  labelShow?: boolean;
  onChange?: any;
  isError: boolean;
  error: any;
}

const Input = ({
  name,
  label,
  labelShow = true,
  type = "text",
  onChange,
  isError,
  error,
}: IInput) => {
  const [showPassword, setShowPassoword] = useState<boolean>(false);

  const returnError = (() => {
    if (isError) {
      return (
        <div>
          {error?.map((err: any, i: number) => {
            return (
              err?.path[0] === name && (
                <p key={i} className="text-sm text-red-500">
                  {err?.message}
                </p>
              )
            );
          })}
        </div>
      );
    }
  })();

  return (
    <div className="space-y-1">
      <div className={`border rounded  flex items-center h-11 px-3`}>
        <div className="flex flex-col space-y-0.5 w-full">
          {labelShow && (
            <label className="text-[12px]  dark:text-gray-500">{label}</label>
          )}
          <input
            name={name}
            onChange={(events) => onChange(events)}
            className="outline-none text-sm h-4 bg-transparent placeholder:text-[14px]"
            placeholder={label}
            type={
              type === "password" ? (showPassword ? "text" : "password") : type
            }
          />
        </div>

        {type === "password" && (
          <button
            onClick={() => setShowPassoword(!showPassword)}
            className="font-medium text-sm"
          >
            {showPassword ? "Sembunyikan" : "Tampilkan"}
          </button>
        )}
      </div>

      {returnError}
    </div>
  );
};

export default Input;
