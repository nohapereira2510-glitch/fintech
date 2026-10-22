import { createContext, useContext } from 'react'

export const ThemeContext = createContext({ mode: 'light', toggle: () => {} })
export const useThemeContext = () => useContext(ThemeContext)
