import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import styles from '../styles/pages/Home.module.css';
import {UserView} from '../components/user/UserView'
import {ProfileView} from '../components/profile/Profile'
import {testRoomUser} from '../entities/TestEntities'
import {UserEditingView} from '../components/user/UserEditingView'

const Profile: NextPage = () => <ProfileView user={testRoomUser} />;

export default Profile;