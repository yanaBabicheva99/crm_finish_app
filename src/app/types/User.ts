import React from "react";

export type token = string | null;
export type id = string | null;


export interface IUser {
    _id: string;
    email: string;
    password: string;
    name: string;
    lastName: string;
    companyName: string;
    address: string;
    __v:number
}

export interface IUser {
    newPassword?: string,
    oldPassword?: string,
    repeatPassword?: string
}

export interface ILogin {
    children: React.ReactNode;
    title: string;
}

