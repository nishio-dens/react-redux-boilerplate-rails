import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import sampleImage from 'images/150x50.png';

import { getUsers, addUser } from '../../modules/users';

const stateSelector = (state) => {
  return {
    users: state.users.get('records')
  };
};

export default function HomePage() {
  const { users } = useSelector(stateSelector);
  const dispatch = useDispatch();

  const onClickLoadUser = () => dispatch(getUsers());
  const onClickAddUser = (name: string) => dispatch(addUser(name));

  return (
    <article>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="A React.js Boilerplate application homepage" />
      </Helmet>
      <div className="home-page">
        <section className="centered">
          <h2>Hello React boilerplate</h2>
          <p>
            A minimal <i>React-Redux</i> boilerplate
        </p>
          <img src={sampleImage} /><br />
          <Link to="/sample">Go to sample page</Link><br />
          <Link to="/testtest">Go to not found</Link>
        </section>
        <div>
          <button onClick={onClickLoadUser}>Load Initial Records</button>
          <button onClick={() => onClickAddUser(`TestUser: ${Date.now()}`)}>Add New User</button>
          <h3>users({users.size})</h3>
          <ul>
            {users.map((u, i) => <li key={`user-${i}`}>{u}</li>)}
          </ul>
        </div>
      </div>
    </article>
  );
}