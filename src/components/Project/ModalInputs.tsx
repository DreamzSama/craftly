import React from "react";

type Props = {
    label_name: string;
    input_name: string;
    placeholder: string;
    type: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    required?: boolean;
    disabled?: boolean;
};

export default function ModalInputs({
    label_name, input_name, placeholder, type, value, onChange, className
}: Props) {
    return (
        <div>
            <label className="font-medium mb-1 block" htmlFor={input_name}>
                {label_name}
            </label>
            <input
                value={value}
                onChange={onChange}
                name={input_name}
                id={input_name}
                className={"w-full outline-none hover:bg-gray-200 transition-all duration-150 focus:outline-primary p-2 rounded-xl bg-gray-100 " + className}
                type={type}
                placeholder={placeholder}
            />
        </div>
    );
}
