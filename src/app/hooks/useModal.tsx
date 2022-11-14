import React, { useContext, useState } from 'react';

export interface IModalContext {
    visible: {create?: boolean; edit?: boolean, sell?: boolean};
    setVisible: (arg: {}) => void;
}

const ModalContext = React.createContext<IModalContext | null>(null);

export const useModal = () => {
   return useContext(ModalContext);
};
export const ModalProvider = ({children}: {children: React.ReactNode}) => {
    const [visible, setVisible] = useState({});

    return <ModalContext.Provider value={{visible, setVisible}}>
        {children}
    </ModalContext.Provider>

}