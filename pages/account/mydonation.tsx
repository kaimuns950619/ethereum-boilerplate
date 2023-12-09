import { Default } from 'components/layouts/Default';
import { MyDonation } from 'components/templates/account/mydonation';
import type { NextPage } from 'next';

const MyDonationPage: NextPage = () => {
  return (
    <Default pageName="MyDonation">
      <MyDonation />
    </Default>
	
  );
};

export default MyDonationPage;
