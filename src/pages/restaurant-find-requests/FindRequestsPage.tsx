import React from 'react'
import { useAuth } from '../../contexts/AuthContext'

type Props = {}

const FindRequestsPage = (props: Props) => {
  const { user, role } = useAuth();
  console.log("User:", user);
  console.log("Role:", role);
  return (
    <div>FindRequestsPage</div>
  )
}

export default FindRequestsPage