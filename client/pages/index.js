import buildClient from '../api/build-client';

const LandingPage = ({currentUser}) => {
  const signin = <h1>OIEEEEE</h1>;
  const signout = <h1>ADEUSSSSS</h1>;

  return currentUser ? signin : signout;
};

LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context);
  const {data} = await client.get('/api/users/currentuser');

  return data;
};

export default LandingPage;
