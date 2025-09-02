import type { PlayerInformation } from "../types";

interface LeagueTableProps {
    players: PlayerInformation[];
}

export default function LeagueTable({ players }: LeagueTableProps) {
    return (
        <div className="w-full max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">League Standings</h2>
            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="w-full bg-white">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                                Rank
                            </th>

                            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                                Team Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                                Player Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                                Total Points
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {players.map((player, index) => (
                            <tr
                                key={`${player.name}-${player.team_name}`}
                                className={`hover:bg-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                                    {index + 1}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                                    {player.team_name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                                    {player.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-black">
                                    {player.total.toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}