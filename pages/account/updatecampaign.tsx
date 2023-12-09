import { Default } from 'components/layouts/Default';
import { UpdateCampaign } from 'components/templates/account/updatecampaign';
import type { NextPage } from 'next';

const UpdateCampaignPage: NextPage = () => {
  return (
    <Default pageName="UpdateCampaign">
      <UpdateCampaign />
    </Default>
	
  );
};

export default UpdateCampaignPage;
