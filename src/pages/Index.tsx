
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import Dashboard from '@/components/Dashboard';
import FuelControl from '@/components/FuelControl';
import Security from '@/components/Security';
import Reports from '@/components/Reports';
import Mobile from '@/components/Mobile';

const Index = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/fuel-control" element={<FuelControl />} />
        <Route path="/security" element={<Security />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/mobile" element={<Mobile />} />
        <Route path="/settings" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
};

export default Index;
