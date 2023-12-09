import { Default } from 'components/layouts/Default';
import { CampaignDetail } from 'components/templates/account/campaigndetail';
import type { NextPage } from 'next';

const CampaignDetailPage: NextPage = () => {
  return (
    <Default pageName="CampaignDetail">
      <CampaignDetail />
    </Default>
	
  );
};

export default CampaignDetailPage;
