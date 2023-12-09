import { Default } from 'components/layouts/Default';
import { SignupCharity } from 'components/templates/signup/signupcharity';
import type { NextPage } from 'next';

const SignupCharityPage: NextPage = () => {
  return (
    <Default pageName="SignupCharity">
      <SignupCharity />
    </Default>
	
  );
};

export default SignupCharityPage;
