'use client'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import NavToggle from './NavToggle'
import ModeDropdown from '@components/layout/shared/ModeDropdown'
import UserDropdown from '@components/layout/shared/UserDropdown'

// Util Imports
import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'
import Button from '@mui/material/Button'
import useRoleBasedAccess from '@/hooks/useRoleBasedAccess'
import Role from '@/types/apps/user/role'
import { useRouter } from 'next/navigation'


const NavbarContent = () => {
  const { hasRequiredRole: isAdmin } = useRoleBasedAccess(Role.ADMIN)
  const router = useRouter()

  const handleAdminClick = () => {
    router.push('/login')
  }

  return (
    <div className={classnames(verticalLayoutClasses.navbarContent, 'flex items-center justify-between gap-4 is-full')}>
      <div className='flex items-center gap-4'>
        <NavToggle />
        <ModeDropdown />
      </div>
      <div className='flex items-center'>
        {
          !isAdmin ? (
            <Button onClick={handleAdminClick} startIcon={<i className='tabler-user-shield' />} size='small' color='success' variant='outlined' className='flex gap-2'>
              <span>Soy Admin</span>
            </Button>
          ): <UserDropdown />
        }

      </div>
    </div>
  )
}

export default NavbarContent
