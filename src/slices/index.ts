import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import issuesReducer from "./issues/issues.slice";

export const rootReducer = combineReducers({
    issues: issuesReducer
});

export type RootState = ReturnType<typeof rootReducer>
export type AppThunk = ThunkAction<Promise<void>, RootState, null, AnyAction>