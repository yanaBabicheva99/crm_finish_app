import React from "react";

export interface IInputProps {
    label: string;
    type?: string;
    name: string;
    placeholder?: string;
    value: string | number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
    touched?: boolean,
    errors?: string,
}

export interface IReset {
    resetForm: () => void
}

