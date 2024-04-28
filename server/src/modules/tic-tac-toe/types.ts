export namespace IEntity {
	export type Player = 'X' | 'O';
	export type Cell = Player | null;
	export type Board = Cell[];
	export interface Game {
		id: string;
		player1: string;
		player2: string;
		board: Board;
		nextPlayer: Player;
		winner: string;
	}
}
