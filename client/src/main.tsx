import {createRoot} from 'react-dom/client'
import './index.css'
import App from './components/App/App.tsx'
import {store} from "./store/store.ts";
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <App/>
    </Provider>
)
