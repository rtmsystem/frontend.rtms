'use client'

// React Imports
import { useState } from 'react'
import type { SyntheticEvent } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid2'
import Tab from '@mui/material/Tab'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import CustomTabList from '@core/components/mui/TabList'
import BasicInformationForm from './BasicInformationForm'
import CategoriesTab from './tabs/division/CategoriesTab'
import BrandingTab from './tabs/branding'
import PaymentsTab from './tabs/payments'

// Type Imports
import type { Tournament } from '@/types/apps/tournament/tournamentTypes'
import Role from '@/types/apps/user/role'
import useRoleBasedAccess from '@/hooks/useRoleBasedAccess'

type Props = {
  tournament?: Tournament
}

const SettingsTab = ({ tournament }: Props) => {
  // States
  const [activeTab, setActiveTab] = useState('basic')

  // Handlers
  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setActiveTab(newValue)
  }

  return (
    <TabContext value={activeTab}>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12, sm: 5, md: 4, xl: 3 }} className='flex flex-col items-center gap-4'>
          <CustomTabList orientation='vertical' onChange={handleChange} className='is-full' pill='true'>
            <Tab
              label='Información Básica'
              value='basic'
              icon={<i className={classnames('tabler-info-circle', '!mbe-0 mie-1.5')} />}
              className='flex-row justify-start !min-is-full'
            />
            <Tab
              label='Categorías'
              value='categories'
              icon={<i className={classnames('tabler-list-details', '!mbe-0 mie-1.5')} />}
              className='flex-row justify-start !min-is-full'
            />
            <Tab
              label='Marca'
              value='branding'
              icon={<i className={classnames('tabler-palette', '!mbe-0 mie-1.5')} />}
              className='flex-row justify-start !min-is-full'
            />
            <Tab
              label='Pagos'
              value='payments'
              icon={<i className={classnames('tabler-currency-dollar', '!mbe-0 mie-1.5')} />}
              className='flex-row justify-start !min-is-full'
            />
          </CustomTabList>
        </Grid>
        <Grid size={{ xs: 12, sm: 7, md: 8, xl: 9 }}>
          <TabPanel value='basic' className='p-0'>
            <BasicInformationForm tournament={tournament} />
          </TabPanel>
          <TabPanel value='categories' className='p-0'>
            <CategoriesTab divisions={tournament?.divisions || []} tournamentId={tournament?.id || 0} />
          </TabPanel>
          <TabPanel value='branding' className='p-0'>
            <BrandingTab tournament={tournament} />
          </TabPanel>
          <TabPanel value='payments' className='p-0'>
            <PaymentsTab tournament={tournament} />
          </TabPanel>
        </Grid>
      </Grid>
    </TabContext>
  )
}

export default SettingsTab
