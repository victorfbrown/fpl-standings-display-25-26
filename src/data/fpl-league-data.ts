import superagent from 'superagent';
import type { ClassicLeague, ClassicLeagueEntry, PlayerInformation } from '../types/fpl';

export const LEAGUE_ID = 2362187;

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

export async function getLeagueData(leagueId: number): Promise<ClassicLeague> {
	const leagueData = await fetchClassicLeague(leagueId);
	return leagueData;
}

export function formatStandingsData(leagueData: ClassicLeague) {
	const standingsResults: ClassicLeagueEntry[] = leagueData['standings']['results'];
	const allPlayerInformation: PlayerInformation[] = standingsResults.map((d) => ({
		name: d['player_name'],
		team_name: d['entry_name'],
		total: d['total'],
	}));
	return allPlayerInformation;
}

export async function resetFormattedStandingsData() {
	const preMW4Data = [
		{
			name: 'Yazan Baghdady',
			team_name: 'Salahm Dunk',
			total: 111,
		},
		{
			name: 'Elias W',
			team_name: 'meep meep',
			total: 99,
		},
		{
			name: 'Mateo Porter',
			team_name: 'Intl Richarliason',
			total: 73,
		},
		{
			name: 'JJ Davidoff',
			team_name: 'Luton Town',
			total: 68,
		},
		{
			name: 'Lucas Frisancho',
			team_name: '300 Ping Frong',
			total: 44,
		},
	];

	const leagueData = await getLeagueData(LEAGUE_ID);
	const formattedStandingsData = formatStandingsData(leagueData);

	const postMW4Data = formattedStandingsData.map((player) => {
		const baseline = preMW4Data.find(
			(b) => b.name === player.name && b.team_name === player.team_name
		);
		return {
			...player,
			total: baseline ? player.total - baseline.total : player.total,
		};
	});

	return postMW4Data;
}
