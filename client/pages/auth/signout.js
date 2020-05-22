import {useEffect} from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

export default () => {
  const {doRequest, errors} = useRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => Router.push('/'),
  });

  useEffect(() => {
    doRequest();
  }, []);

  return (
    <div className='spinner-border text-dark' role='status'>
      <span className='sr-only'>Signing you out...</span>
    </div>
  );
};
