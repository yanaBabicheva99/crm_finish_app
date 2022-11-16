import React from "react";

export interface ILayoutProp {
    children: React.ReactNode;
    title: string;
    subtitle: string
}

export interface IBurger {
    open: boolean;
    onClick: () => void;
}
