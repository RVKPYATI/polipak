import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../../hooks/useSession';

const Auth = () => {
  const { getSession, removeSession } = useSession();
  const name = getSession('name');
  const navigate = useNavigate();

  const handleLogOut = () => {
    removeSession('session');
    removeSession('name');
    navigate('/')
  }

  return (
    <div className='flex gap-4 mr-6 text-zinc-200'>
      <div className=''>User: {name}</div>
      <button className='text-red-400 hover:text-red-500' onClick={handleLogOut}>Выход</button>
    </div>
  )
}

export default Auth