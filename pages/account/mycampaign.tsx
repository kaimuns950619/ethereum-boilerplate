import { Default } from 'components/layouts/Default';
import { MyCampaign } from 'components/templates/account/mycampaign';
import type { NextPage } from 'next';

const mycampaignPage: NextPage = () => {
  return (
    <Default pageName="MyCampaign">
      <MyCampaign />
    </Default>
	
  );
};

export default mycampaignPage;
