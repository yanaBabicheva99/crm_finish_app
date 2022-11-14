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

export interface IModal {
    children: React.ReactNode;
    visible: boolean | undefined;
    handleVisible: () => void;
    sell?: boolean | undefined;
}
