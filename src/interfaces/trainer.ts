import type { DailyPackStatus } from "./dailyPackStatus";

export interface Trainer {
    name: string;
    username: string;
    coins: number;
    level: number;
    xp: number
    dailyPackStatus : DailyPackStatus
}