import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import { useView } from '@/context/ViewContext';
import { ProfileProvider } from '../../Shared/ProfileContext';
import SharedDashboardLayout from '../../Shared/DashboardLayout';

const MemberPanel = () => {
    const location = useLocation();
    const navigate = useNavigate();
    // const { setCurrentView } = useView();

    // useEffect(() => {
    //     setCurrentView('se-dashboard');
    //     localStorage.setItem('se_dashboard_active', 'true');
    // }, [setCurrentView]);
    const selectedClub = location.state?.club || (() => {
        try {
            const saved = localStorage.getItem("enteredClub");
            return saved ? JSON.parse(saved) : null;
        } catch(e) { return null; }
    })();

    const clubs = selectedClub
        ? [{ id: selectedClub.abbr, name: selectedClub.name, abbr: selectedClub.abbr, logo: selectedClub.img, role: 'Member' }]
        : [];

    const initialData = {
        profile: { clubs },
        members: [],
        tasks: [],
        messages: [],
        notifications: []
    };

    return (
        <ProfileProvider initialData={initialData} role="Member">
            <SharedDashboardLayout />
        </ProfileProvider>
    );
};

export default MemberPanel;
