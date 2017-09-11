import { Game } from './models/game';

export const GAMES: Game[] = [
    {
        id: 1,
        name: 'snak',
        desc: 'a game for beginner',
        size: 10,
        players: 2,
        difficulty: 2,
        time: ''
    },
    {
        id: 2,
        name: 'snake',
        desc: 'a game for medium level player',
        size: 20,
        players: 3,
        difficulty: 4,
        time: ''
    },
        {
        id: 3,
        name: 'snake',
        desc: 'a game for single player',
        size: 10,
        players: 1,
        difficulty: 1,
        time: ''
    }
];