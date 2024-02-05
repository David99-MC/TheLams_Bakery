import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux"
import type { AppDisPatch, RootState } from "./store"

// Define the typed version instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDisPatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
