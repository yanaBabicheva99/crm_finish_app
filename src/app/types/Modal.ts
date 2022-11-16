import React from "react";
import Modal from "../components/modal/Modal";

export type ModalRef = React.ElementRef<typeof Modal>;

export interface ModalProps {
    children: React.ReactNode;
    sell?: boolean;
}

export interface ModalReference {
    open: () => void,
    close: () => void
}