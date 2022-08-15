import { NextPage } from 'next';
import UserDashboard from '../components/userdashboard/UserDashboard';
import { testUser } from '../entities/User';

const Dashboard: NextPage = () => <UserDashboard user={testUser} />;

export default Dashboard;
