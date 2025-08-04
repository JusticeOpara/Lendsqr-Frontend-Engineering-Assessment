export default interface IUserProfile {
  personalInformation: {
    id: number;
    fullName: string;
    username: string;
    email: string;
    phoneNumber: string;
    bvn: string;
    gender: string;
    maritalStatus: string;
    children: string;
    typeOfResidence: string;
    dateJoined: string;
    status: 'Active' | 'Inactive' | 'Pending' | 'Blacklisted';
    avatar: string;
    tier: number;
  };
  educationAndEmployment: {
    levelOfEducation: string;
    employmentStatus: string;
    sectorOfEmployment: string;
    durationOfEmployment: string;
    officeEmail: string;
    monthlyIncome: string;
    loanRepayment: string;
  };
  socials: {
    twitter: string;
    facebook: string;
    instagram: string;
  };
  guarantor: {
    fullName: string;
    phoneNumber: string;
    email: string;
    relationship: string;
  };
  organizationDetails: {
    organization: string;
    userNumber: string;
    accountBalance: string;
    accountNumber: string;
    bankName: string;
  };
  systemMetadata: {
    createdAt: string;
    updatedAt: string;
    lastLogin: string;
    riskScore: number;
    creditScore: number;
    kycStatus: 'Verified' | 'Pending' | 'Rejected';
  };
}
