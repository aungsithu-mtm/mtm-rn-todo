import React, { createContext, useContext, RefObject } from 'react';
import { Drawer } from 'expo-router/drawer';

type DrawerContextType = {
  openDrawer: () => void;
};

export const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

const _layout = () => {
  let drawerRef: RefObject<any> | null = null;

  const openDrawer = () => {
    if (drawerRef && drawerRef.current) {
      drawerRef.current.openDrawer();
    }
  };

  return (
    <DrawerContext.Provider value={{ openDrawer }}>
      <Drawer
        ref={(ref: RefObject<any> | null) => {
          drawerRef = ref;
        }}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="(page1)"
          options={{ headerTitle: "Page 1", drawerLabel: "Page 1" }}
        />
        <Drawer.Screen
          name="page2"
          options={{ headerTitle: "Blogs", drawerLabel: "Blogs" }}
        />
      </Drawer>
    </DrawerContext.Provider>
  );
};

export default _layout;
