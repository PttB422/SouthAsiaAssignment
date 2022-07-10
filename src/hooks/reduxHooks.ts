import { AppDispatch, RootState } from '@redux/store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

/**
 *  Use throughout your app instead of plain `useDispatch`
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 *  Use throughout your app instead of plain `useSelector`
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
