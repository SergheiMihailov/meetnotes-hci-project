import { createStore, combineReducers } from "redux";

import { reducers as meetingReducers } from "./modules/meetings";
import { reducers as recorderReducers } from "./modules/recorder";

const rootReducer = combineReducers({
  meetings: meetingReducers,
  recorder: recorderReducers,
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
