import { Default } from 'components/layouts/Default';
import { Profile } from 'components/templates/account/profile';
import type { NextPage } from 'next';

const ProfilePage: NextPage = () => {
  return (
    <Default pageName="Profile">
      <Profile />
    </Default>
	
  );
};

export default ProfilePage;
