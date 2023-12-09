import { Default } from 'components/layouts/Default';
import { Dashboard } from 'components/templates/account/dashboard';
import type { NextPage } from 'next';

const DashboardPage: NextPage = () => {
  return (
    <Default pageName="Dashboard">
      <Dashboard />
    </Default>
	
  );
};

export default DashboardPage;
