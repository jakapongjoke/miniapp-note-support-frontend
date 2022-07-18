import { legacy_createStore  as  createStore} from "redux";

import rootReducer from "../reducer/rootReducer";
export const Store = createStore(rootReducer)
export type RootStore = ReturnType<typeof rootReducer>
