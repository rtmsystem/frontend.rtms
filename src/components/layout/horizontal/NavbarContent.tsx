'use client'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import NavToggle from './NavToggle'
import Logo from '@components/layout/shared/Logo'
import ModeDropdown from '@components/layout/shared/ModeDropdown'
import UserDropdown from '@components/layout/shared/UserDropdown'

// Hook Imports
import useHorizontalNav from '@menu/hooks/useHorizontalNav'

// Util Imports
import { horizontalLayoutClasses } from '@layouts/utils/layoutClasses'
import Button from '@mui/material/Button'
import useRoleBasedAccess from '@/hooks/useRoleBasedAccess'
import Role from '@/types/apps/user/role'

const NavbarContent = () => {
  // Hooks
  const { isBreakpointReached } = useHorizontalNav()
  const { hasRequiredRole: isAdmin } = useRoleBasedAccess(Role.ADMIN)

  return (
    <div
      className={classnames(horizontalLayoutClasses.navbarContent, 'flex items-center justify-between gap-4 is-full')}
    >
      <div className='flex items-center gap-4'>
        <NavToggle />
        {/* Hide Logo on Smaller screens */}
        {!isBreakpointReached && <Logo />}
      </div>
      <div className='flex items-center'>
        <ModeDropdown />
        {
          !isAdmin ? (
            <Button color='warning' variant='contained' className='flex gap-2'>
              <span>Soy Admin</span>
            </Button>
          ): <UserDropdown />
        }
       
      </div>
    </div>
  )
}

export default NavbarContent
