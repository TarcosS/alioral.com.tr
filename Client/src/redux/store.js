import { configureStore } from '@reduxjs/toolkit'

/*----------------------------------------------------------------
Reducers
----------------------------------------------------------------*/
import navCounter from './reducers/navController'
import auth from './reducers/authController'

export const store = configureStore({
    reducer: {
        navCounter,
        auth
    },
})