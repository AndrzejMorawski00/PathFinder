import { TilePos } from "../types";

export const graph = new Map<TilePos, TilePos[]>([
    [
        {
            pos_x: 0,
            pos_y: 0,
        },
        [
            {
                pos_x: 1,
                pos_y: 0,
            },
        ],
    ],
    [
        {
            pos_x: 1,
            pos_y: 0,
        },
        [
            {
                pos_x: 1,
                pos_y: 1,
            },
            {
                pos_x: 0,
                pos_y: 0,
            },
        ],
    ],
    [
        {
            pos_x: 1,
            pos_y: 1,
        },
        [
            {
                pos_x: 1,
                pos_y: 0,
            },
            {
                pos_x: 1,
                pos_y: 2,
            },
            {
                pos_x: 2,
                pos_y: 1,
            },
        ],
    ],
    [
        {
            pos_x: 2,
            pos_y: 1,
        },
        [
            {
                pos_x: 1,
                pos_y: 1,
            },
        ],
    ],
    [
        {
            pos_x: 1,
            pos_y: 2,
        },
        [
            {
                pos_x: 1,
                pos_y: 1,
            },
        ],
    ],
]);
