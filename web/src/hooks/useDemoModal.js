import { createContext, useContext } from 'react'

export const DemoModalContext = createContext({ open: () => {} })
export const useDemoModal = () => useContext(DemoModalContext)
