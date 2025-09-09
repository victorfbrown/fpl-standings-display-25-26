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
		current_matchweek_points: d['event_total'],
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

	const baselineMap = new Map(preMW4Data.map((player) => [player.name, player.total]));

	const postMW4Data = [];
	for (const player of formattedStandingsData) {
		const baselineTotal = baselineMap.get(player.name);
		postMW4Data.push({
			...player,
			total: baselineTotal !== undefined ? player.total - baselineTotal : player.total,
		});
	}

	postMW4Data.sort((a, b) => a.total - b.total);
	return postMW4Data;
}

export async function getCurrentMatchweek(): Promise<number> {
	const response = await superagent.get('https://fantasy.premierleague.com/api/bootstrap-static/');
	const currentEvent = response.body.events.find(
		(event: { is_current: boolean; id: number }) => event.is_current === true
	);
	return currentEvent?.id + 1 || 1;
}
