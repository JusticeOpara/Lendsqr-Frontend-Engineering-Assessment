import React from 'react';
import { ArrowLeft, User } from 'lucide-react';

interface UserDetailsProps {}

const UserDetails: React.FC<UserDetailsProps> = () => {
  return (
    <div className="user-details-page">
      {/* Header */}
      <div className="header">
        <button className="back-button">
          <ArrowLeft size={20} />
          <span>Back to Users</span>
        </button>
      </div>

      {/* User Details Header */}
      <div className="user-header">
        <div className="user-header-left">
          <h1>User Details</h1>
        </div>
        <div className="user-header-right">
          <button className="blacklist-button">BLACKLIST USER</button>
          <button className="activate-button">ACTIVATE USER</button>
        </div>
      </div>

      {/* User Card */}
      <div className="user-card">
        <div className="user-avatar">
          <User size={48} />
        </div>
        
        <div className="user-info">
          <div className="user-name">Grace Effiom</div>
          <div className="user-id">LSQFf587g90</div>
        </div>

        <div className="user-tier">
          <div className="tier-label">User's Tier</div>
          <div className="tier-stars">
            <span className="star filled">★</span>
            <span className="star">☆</span>
            <span className="star">☆</span>
          </div>
        </div>

        <div className="user-balance">
          <div className="balance-amount">₦200,000.00</div>
          <div className="bank-info">9912345678/Providus Bank</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="nav-tabs">
        <button className="nav-tab active">General Details</button>
        <button className="nav-tab">Documents</button>
        <button className="nav-tab">Bank Details</button>
        <button className="nav-tab">Loans</button>
        <button className="nav-tab">Savings</button>
        <button className="nav-tab">App and System</button>
      </div>

      <style jsx>{`
        .user-details-page {
          padding: 24px 40px;
          background-color: #fbfbfb;
          min-height: 100vh;
          font-family: 'Work Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .header {
          margin-bottom: 32px;
        }

        .back-button {
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          color: #545f7d;
          font-size: 16px;
          font-weight: 400;
          cursor: pointer;
          padding: 0;
        }

        .back-button:hover {
          color: #213f7d;
        }

        .user-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }

        .user-header h1 {
          font-size: 24px;
          font-weight: 500;
          color: #213f7d;
          margin: 0;
        }

        .user-header-right {
          display: flex;
          gap: 20px;
        }

        .blacklist-button {
          padding: 12px 16px;
          border: 1px solid #e9b200;
          background: transparent;
          color: #e9b200;
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1.4px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .blacklist-button:hover {
          background: #e9b200;
          color: white;
        }

        .activate-button {
          padding: 12px 16px;
          border: 1px solid #39cdcc;
          background: transparent;
          color: #39cdcc;
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1.4px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .activate-button:hover {
          background: #39cdcc;
          color: white;
        }

        .user-card {
          background: white;
          border-radius: 4px;
          box-shadow: 0 3px 5px rgba(0, 0, 0, 0.04);
          padding: 30px;
          margin-bottom: 0;
          display: flex;
          align-items: center;
          gap: 40px;
        }

        .user-avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: #dde2ef;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #545f7d;
          flex-shrink: 0;
        }

        .user-info {
          flex-shrink: 0;
        }

        .user-name {
          font-size: 22px;
          font-weight: 500;
          color: #213f7d;
          margin-bottom: 8px;
        }

        .user-id {
          font-size: 14px;
          color: #545f7d;
        }

        .user-tier {
          border-left: 1px solid #e9e9e9;
          border-right: 1px solid #e9e9e9;
          padding: 0 40px;
          flex-shrink: 0;
        }

        .tier-label {
          font-size: 14px;
          color: #545f7d;
          margin-bottom: 8px;
        }

        .tier-stars {
          display: flex;
          gap: 2px;
        }

        .star {
          font-size: 16px;
          color: #e9b200;
        }

        .star.filled {
          color: #e9b200;
        }

        .user-balance {
          flex-shrink: 0;
        }

        .balance-amount {
          font-size: 22px;
          font-weight: 500;
          color: #213f7d;
          margin-bottom: 8px;
        }

        .bank-info {
          font-size: 12px;
          color: #213f7d;
        }

        .nav-tabs {
          display: flex;
          background: white;
          box-shadow: 0 3px 5px rgba(0, 0, 0, 0.04);
          margin-top: -1px;
        }

        .nav-tab {
          padding: 20px 24px;
          border: none;
          background: none;
          font-size: 16px;
          color: rgba(84, 95, 125, 0.8);
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .nav-tab:hover {
          color: #39cdcc;
        }

        .nav-tab.active {
          color: #39cdcc;
          border-bottom-color: #39cdcc;
        }

        @media (max-width: 1024px) {
          .user-details-page {
            padding: 20px;
          }

          .user-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
          }

          .user-tier {
            border: none;
            padding: 0;
          }

          .user-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }

          .nav-tabs {
            overflow-x: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default UserDetails;