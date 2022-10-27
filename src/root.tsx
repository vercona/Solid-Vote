// @refresh reload
import { render } from 'solid-js/web';

import styles from './App.module.css';
import "./root.scss";
import 'uno.css'

import { Router, useRoutes } from "@solidjs/router";
import routes from './pages/router'

const App = () => {
  const Routes = useRoutes(routes);
  return (
    <div class={styles.App}> 
      <Router> <Routes/> </Router>
    </div>
  )
};

render(App, document.getElementById('root') as HTMLElement);
