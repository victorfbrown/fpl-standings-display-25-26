// Fantasy Premier League API types and interfaces

export type LeagueType = 'x' | 's';

export interface LeagueInfo {
	admin_entry: number | null;
	closed: boolean;
	code_privacy: 'p';
	created: string;
	id: number;
	league_type: LeagueType;
	max_entries: number | null;
	name: string;
	rank: null;
	start_event: number;
}

export interface NewLeagueEntry {
	entry: number;
	entry_name: string;
	joined_time: string;
	player_first_name: string;
	player_last_name: string;
}

export interface LeagueEntry {
	entry: number;
	entry_name: string;
	id: number;
	last_rank: number;
	player_name: string;
	rank: number;
	rank_sort: number;
	total: number;
}

export interface ClassicLeagueEntry extends LeagueEntry {
	event_total: number;
}

export interface LeagueStandings {
	has_next: boolean;
	page: number;
}

export interface ClassicLeagueStandings extends LeagueStandings {
	results: ClassicLeagueEntry[];
}

export interface ClassicLeagueInfo extends LeagueInfo {
	scoring: 'c';
}

export interface ClassicLeague {
	league: ClassicLeagueInfo;
	new_entries: NewLeagueEntry[];
	standings: ClassicLeagueStandings;
}

export interface PlayerInformation {
	name: string;
	team_name: string;
	total: number;
	current_matchweek_points: number;
}
