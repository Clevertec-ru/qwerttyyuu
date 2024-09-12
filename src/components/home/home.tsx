import { Link } from 'react-router-dom';

import style from './home.module.css';
export const Home = () => (
  <>
    <Link to='/demo'>
      <button className={style.demoButton}>Demo</button>
    </Link>
    <Link to='/diagram'>
      <button className={style.demoButton}>Diagram</button>
    </Link>
  </>
);