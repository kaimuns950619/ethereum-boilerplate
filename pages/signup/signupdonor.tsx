import { Default } from 'components/layouts/Default';
import { SignupDonor } from 'components/templates/signup/signupdonor';
import type { NextPage } from 'next';

const SignupDonorPage: NextPage = () => {
  return (
    <Default pageName="SignupDonor">
      <SignupDonor />
    </Default>
	
  );
};

export default SignupDonorPage;
