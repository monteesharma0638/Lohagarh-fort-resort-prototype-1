import React from 'react'
import UsersList from './components/UsersList'
import Users from '@/models/Users'

export default async function page() {
  let users = await Users.find().lean().catch(_ => []);
  users = JSON.parse(JSON.stringify(users));

  return (
    <div>
      <UsersList users={users} />    
    </div>
  )
}
