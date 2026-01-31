import React, { useRef, useMemo } from 'react'
import Xarrow, { Xwrapper, useXarrow } from "react-xarrows";
import BracketMatchCard from './BracketMatchCard';
import EmptyState from '@/components/EmptyState';
import { Bracket } from '@/types/apps/tournament/bracketTypes';
import { Match } from '@/types/apps/tournament/matchTypes';

const getRoundLabel = (roundNumber: number, totalRounds: number): string => {
    const fromEnd = totalRounds - roundNumber + 1
    if (fromEnd === 1) return 'Final'
    if (fromEnd === 2) return 'Semifinal'
    if (fromEnd === 3) return 'Cuartos de Final'
    return `Ronda ${roundNumber}`
}

const transformMatchesToBrackets = (
    matches: Match[],
    divisionId: number | undefined
): Bracket[] => {
    if (!divisionId) return []

    // 1. Filter by division and round_number > 0
    const bracketMatches = matches.filter(
        m => m.division === divisionId && m.round_number > 0
    )

    if (bracketMatches.length === 0) return []

    // 2. Group by round_number
    const roundsMap = new Map<number, Match[]>()
    bracketMatches.forEach(match => {
        const round = match.round_number
        if (!roundsMap.has(round)) roundsMap.set(round, [])
        roundsMap.get(round)!.push(match)
    })

    // 3. Convert to Bracket[] sorted by round_number
    const totalRounds = roundsMap.size
    const rounds: Bracket[] = Array.from(roundsMap.entries())
        .sort(([a], [b]) => a - b)
        .map(([roundNum, roundMatches]) => ({
            id: roundNum,
            label: getRoundLabel(roundNum, totalRounds),
            matches: roundMatches.sort((a, b) => a.id - b.id)
        }))

    return rounds
}

const generateArrows = (brackets: Bracket[]) => {
    const arrows: { start: string; end: string }[] = []

    brackets.forEach((round, roundIndex) => {
        round.matches.forEach(match => {
            if (match.next_match) {
                // Find the target match in the next round
                const nextRound = brackets[roundIndex + 1]
                if (nextRound) {
                    // next_match can be the Match object or just the ID
                    const nextMatchId = typeof match.next_match === 'object'
                        ? match.next_match.id
                        : match.next_match

                    arrows.push({
                        start: `${round.id}-${match.id}`,
                        end: `${nextRound.id}-${nextMatchId}`
                    })
                }
            }
        })
    })

    return arrows
}


interface BracketsProps {
    matches: Match[],
    selectedDivisionId?: number,
}


const Brackets: React.FC<BracketsProps> = ({
    matches = [],
    selectedDivisionId,
}) => {
    const containerRef = useRef(null);
    const updateXarrow = useXarrow();
    const scrollRef = useRef(null);

    // Transform matches to brackets
    const brackets = useMemo(() =>
        transformMatchesToBrackets(matches, selectedDivisionId),
        [matches, selectedDivisionId]
    )

    // Generate arrows based on next_match
    const arrows = useMemo(() =>
        generateArrows(brackets),
        [brackets]
    )

    // Altura del card compacto: header(24) + player1(36) + divider(1) + player2(36) = 97px
    // Gap entre cards en flex: 10px
    const CARD_HEIGHT = 97
    const CARD_GAP = 10
    const UNIT = CARD_HEIGHT + CARD_GAP // 107px

    const getMatchMargin = (roundIndex: number, matchIndex: number) => {
        if (roundIndex === 0) return 0

        // Fórmula para centrar cada card entre los dos de la ronda anterior:
        // - Primer card de la ronda: (2^roundIndex - 1) * UNIT / 2
        // - Cards siguientes: (2^roundIndex - 1) * UNIT
        const multiplier = Math.pow(2, roundIndex) - 1

        if (matchIndex === 0) {
            return (multiplier * UNIT) / 2
        }

        return multiplier * UNIT
    }

    if (brackets.length === 0) {
        return (
            <EmptyState
                title='No hay Llaves Registradas'
                description='¡Mantente atento! Muy pronto publicaremos las llaves de eliminación.'
                icon="mdi:tournament"
            />
        )
    }

    return (
        <div className="flex w-full" ref={containerRef}>
            <Xwrapper>
                <div
                    ref={scrollRef}
                    onScroll={updateXarrow}
                    className="w-full flex gap-16 overflow-x-auto p-4 pb-8"
                >
                    {
                        brackets.map((round, roundIndex) => (
                            <div key={roundIndex} className="flex flex-col items-start" style={{ minWidth: 240 }}>
                                <p className="text-gray-500 font-bold text-sm mb-3 sticky left-0">{round.label}</p>
                                <div className="flex flex-col" style={{ gap: CARD_GAP }}>
                                    {round.matches.map((match, matchIndex) => (
                                        <div
                                            key={`${round.id}-${match.id}`}
                                            id={`${round.id}-${match.id}`}
                                            style={{ marginTop: `${getMatchMargin(roundIndex, matchIndex)}px` }}
                                        >
                                            <BracketMatchCard match={match} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    }

                    {arrows.map((arrow, index) => (
                        <Xarrow
                            key={index}
                            start={arrow.start}
                            end={arrow.end}
                            startAnchor="right"
                            endAnchor="left"
                            color="#14b8a6"
                            showHead={false}
                            path="grid"
                            strokeWidth={2}
                        />
                    ))}
                </div>
            </Xwrapper>
        </div>
    )
}

export default Brackets
