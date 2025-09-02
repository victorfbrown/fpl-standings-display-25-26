import superagent from 'superagent'
import type { ClassicLeague } from '../types/fpl'

export const LEAGUE_ID = 2362187

/**
 * Fetch classic league standings page.
 * @param leagueId ID of a classic league.
 * @param options Page options.
 * @param options.pageStandings Page number of standings.
 * @param options.pageNewEntries Page number of new entries.
 * @param options.phase Phase ID.
 */
export async function fetchClassicLeague(
  leagueId: number,
  { pageStandings, pageNewEntries, phase } = {
    pageStandings: 1,
    pageNewEntries: 1,
    phase: 1,
  }
): Promise<ClassicLeague> {
  const response = await superagent.get(
    `https://fantasy.premierleague.com/api/leagues-classic/${leagueId}/standings/?page_new_entries=${pageNewEntries}&page_standings=${pageStandings}&phase=${phase}`
  );

  return response.body;
}

export async function displayLeague(leagueId: number) {
  const leagueData = await fetchClassicLeague(leagueId)
  return leagueData
}