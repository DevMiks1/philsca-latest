import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import React from 'react'

const ChangePassword = ({oldPassword, setOldPassword,newPassword, setNewPassword}) => {
  return (
    <div>
        <FormControl isRequired pb={5}>
                <FormLabel>Old Password:</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Old Password"
                />
              </FormControl>
              <FormControl isRequired pb={10}>
                <FormLabel>New Password:</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
                />
              </FormControl>
              
              
           
              

    </div>
  )
}

export default ChangePassword