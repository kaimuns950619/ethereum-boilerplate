import { Default } from 'components/layouts/Default';
import { CreateCampaign } from 'components/templates/account/createcampaign';
import type { NextPage } from 'next';

const CreateCampaignPage: NextPage = () => {
  return (
    <Default pageName="CreateCampaign">
      <CreateCampaign />
    </Default>
	
  );
};

export default CreateCampaignPage;
