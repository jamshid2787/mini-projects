export namespace IEntity {
  export interface Player {
    id: string;
    name: string;
    currentScore: number;
    totalScore: number;
  }

  export namespace Game {
    export interface Main {
      id: string;
      player1: Player;
      player2: Player;
      max: number;
      currentPlayerId: string;
      winner: string | null;
      dice: number;
    }

    export interface Mini extends Pick<Main, 'id' | 'winner' | 'max'> {
      player1: string;
      player2: string;
    }
  }
}

export namespace IApi {
  interface Standard<T> {
    data: T;
    message: string;
  }

  export namespace List {
    export interface Response extends Standard<IEntity.Game.Mini[]> {}
  }

  export namespace Single {
    export interface Request {
      gameId: string;
    }

    export interface Response extends Standard<{ game: IEntity.Game.Main }> {
      game: IEntity.Game.Main;
}
  }

  export namespace Create {
    export interface Request extends Pick<IEntity.Game.Mini, 'player1' | 'player2' | 'max'> {}
    export interface Response extends Standard<{ game: IEntity.Game.Main }> {}
  }

  export namespace Dice {
    export interface Request {
      gameId: string;
      playerId: string;
    }

    export interface Response extends Standard<{ game: IEntity.Game.Main; dice: number }> {}
  }

  export namespace Reset {
    export interface Request {
      gameId: string;
    }

    export interface Response extends Standard<{ game: IEntity.Game.Main }> {}
  }

  export namespace Hold {
    export interface Request {
      gameId: string;
      playerId: string;
    }

    export interface Response extends Standard<{ game: IEntity.Game.Main }> {}
  }
}
