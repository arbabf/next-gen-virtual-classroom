import { NextPage } from 'next';
import UserDashboard from '../components/userdashboard/UserDashboard';
import { User } from '../entities/User';

const Dashboard: NextPage = () => <UserDashboard user={new User("Test user", "test@example.com")} />;

export default Dashboard;
