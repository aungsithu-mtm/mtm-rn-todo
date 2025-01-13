import React, { createContext, useContext, useRef, useEffect, useState } from 'react';
import { Drawer } from 'expo-router/drawer';

type DrawerContextType = {
    openDrawer: () => void;

};

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export const DrawerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const drawerRef = useRef<{ openDrawer: () => void } | null>(null);
    const [isDrawerReady, setIsDrawerReady] = useState(false);

    // Function to open the drawer
    const openDrawer = () => {
        if (drawerRef.current && isDrawerReady) {
            drawerRef.current.openDrawer();
        } else {
            console.log('Drawer ref is not yet assigned');
        }
    };

    // Once the Drawer component has mounted and the ref is assigned, update the state
    useEffect(() => {
        if (drawerRef.current) {
            console.log('Drawer Ref is assigned:', drawerRef.current);
            setIsDrawerReady(true);
        }
    }, [drawerRef]);

    return (
        <DrawerContext.Provider value={{ openDrawer }}>
            <Drawer ref={drawerRef}>
                {children}
            </Drawer>
        </DrawerContext.Provider>
    );
};

export const useDrawerContext = () => {
    const context = useContext(DrawerContext);
    if (!context) {
        throw new Error('useDrawerContext must be used within a DrawerProvider');
    }
    return context;
};

export default DrawerContext;
