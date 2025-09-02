import { displayLeague, LEAGUE_ID } from "../data/fpl-league-data";
import type { PlayerInformation } from "../types";
import LeagueTable from "../components/LeagueTable";

export default async function Home() {
  const leagueData = await displayLeague(LEAGUE_ID)
  const standings = leagueData['standings']['results']
  const allPlayerInformation: PlayerInformation[] = standings.map(d => ({ 
    name: d['player_name'], 
    team_name: d['entry_name'], 
    total: d['total'] 
  }))

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
          FPL League Standings
        </h1>
        <LeagueTable players={allPlayerInformation} />
      </div>
    </div>
  );
}
