import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Typography,
    Box,
} from '@mui/material'
import { GroupStanding } from '@/types/apps/tournament/standingsTypes'
import CustomAvatar from '@/@core/components/mui/Avatar'

interface StandingsTableProps {
    group: GroupStanding
}

const StandingsTable: React.FC<StandingsTableProps> = ({ group }) => {
    return (
        <Box className="mb-8">
            <Typography variant="h6" className="mb-4 text-primary">
                {group.name}
            </Typography>
            <TableContainer component={Paper} className="shadow-none border rounded overflow-x-auto">
                <Table aria-label={`${group.name} standings`}>
                    <TableHead className="bg-primary">
                        <TableRow>
                            <TableCell className="font-semibold text-xs uppercase ">
                                <Typography variant="body2" className="text-white">Pos</Typography>
                            </TableCell>
                            <TableCell className="font-semibold text-xs uppercase ">
                                <Typography variant="body2" className="text-white">Team / Player</Typography>
                            </TableCell>
                            <TableCell align="center" className="font-semibold text-xs uppercase ">
                                <Typography variant="body2" className="text-white">PJ</Typography>
                            </TableCell>
                            <TableCell align="center" className="font-semibold text-xs uppercase ">
                                <Typography variant="body2" className="text-white">G</Typography>
                            </TableCell>
                            <TableCell align="center" className="font-semibold text-xs uppercase ">
                                <Typography variant="body2" className="text-white">P</Typography>
                            </TableCell>
                            <TableCell align="center" className="font-semibold text-xs uppercase ">
                                <Typography variant="body2" className="text-white">Pts</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {group.standings.map((standing) => (
                            <TableRow key={standing.id} hover>
                                <TableCell>
                                    <Box className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-md font-bold text-white">
                                        {standing.position_in_group}
                                    </Box>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <Box className="flex items-center gap-3">
                                        {/* Placeholder for avatar if available in the future */}
                                        <CustomAvatar

                                            src={''}
                                            alt={''}

                                            size={50}
                                        />
                                        <Box>
                                            <Typography variant="h5" className="whitespace-nowrap">
                                                {standing.team_name || standing.player_name}
                                            </Typography>
                                            {standing.partner_name && (
                                                <Typography variant="caption" >
                                                    {standing.partner_name}
                                                </Typography>
                                            )}
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell align="center" className="text-lg font-medium">{standing.matches_played}</TableCell>
                                <TableCell align="center" className="text-lg text-green-600 font-medium">{standing.matches_won}</TableCell>
                                <TableCell align="center" className="text-lg text-red-500 font-medium">{standing.matches_lost}</TableCell>
                                <TableCell align="center" className="text-lg font-bold text-primary">{standing.points}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default StandingsTable
