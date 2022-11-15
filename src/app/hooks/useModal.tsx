import React, { useContext, useState, useImperativeHandle, FC, forwardRef } from 'react';

type ModalState = {create: boolean; edit: boolean, sell: boolean}

export interface IModalContext {
    visible: ModalState;
    // setVisible: (arg: ModalState) => void;
}

const ModalContext = React.createContext<IModalContext | null>(null);

export const useModal = () => {
   return useContext(ModalContext);
};

export interface ModalProps {
    children: React.ReactNode
}

export const ModalProvider: FC<ModalProps> = forwardRef<ModalRef, ModalProps>({children}, ref) => {

    const [visible, setVisible] = useState({create: false, edit: false, sell: false});

    const handleOpen = (field: string) => {
        setVisible(prevState => ({...prevState, [field]: true}))
    };

    const handleClose = (field: string) => {
        setVisible(prevState => ({...prevState, [field]: false}))
    }

    useImperativeHandle(ref, () => ({
        openCreate: () => handleOpen('create'),
        openEdit: () => handleOpen('edit'),
        openSell: () => handleOpen('sell'),
        closeCreate: () => handleClose('create'),
        closeEdit: () => handleClose('edit'),
        closeSell: () => handleClose('sell')
    }));

    return <ModalContext.Provider value={{visible}}>
        {children}
    </ModalContext.Provider>
}

ModalProvider.displayName = 'Modal';