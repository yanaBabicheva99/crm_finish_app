import React, { useContext, useState, FC } from 'react';

type ModalState = {create: boolean; edit: boolean, sell: boolean}

export interface IModalContext {
    visible: ModalState;
    handleOpen: (arg: string) => void;
    handleClose: (arg: string) => void
}

const ModalContext = React.createContext<IModalContext | null>(null);

export const useModal = () => {
   return useContext(ModalContext);
};

export interface ModalProps {
    children: React.ReactNode
}

export const ModalProvider: FC<ModalProps> = ({children}) => {

    const [visible, setVisible] = useState({create: false, edit: false, sell: false});

    const handleOpen = (field: string) => {
        setVisible(prevState => ({...prevState, [field]: true}))
    };

    const handleClose = (field: string) => {
        setVisible(prevState => ({...prevState, [field]: false}))
    }

    return <ModalContext.Provider value={{visible, handleOpen, handleClose }}>
        {children}
    </ModalContext.Provider>
}

ModalProvider.displayName = 'Modal';