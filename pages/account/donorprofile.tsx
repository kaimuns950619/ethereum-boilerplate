import { Default } from 'components/layouts/Default';
import { DonorProfile } from 'components/templates/account/donorprofile';
import type { NextPage } from 'next';

const DonorProfilePage: NextPage = () => {
  return (
    <Default pageName="DonorProfile">
      <DonorProfile />
    </Default>
	
  );
};

export default DonorProfilePage;
