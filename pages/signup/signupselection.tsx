import { Default } from 'components/layouts/Default';
import { SignupSelection } from 'components/templates/signup/signupselection';
import type { NextPage } from 'next';

const SignupSelectionPage: NextPage = () => {
  return (
    <Default pageName="SignupSelection">
      <SignupSelection />
    </Default>
	
  );
};

export default SignupSelectionPage;
