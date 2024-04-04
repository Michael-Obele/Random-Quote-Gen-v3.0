import { writable } from 'svelte/store';

export const LightColors = [
  '#f4acb7',
  '#ea8c55',
  '#B689FF',
  '#FF6F6F',
  '#8ecae6',
  '#48bfe3',
  '#9fffcb',
  '#87bfff',
  '#4cc9f0',
  '#ff9e00',
  '#b79ced',
  '#c879ff',
  '#EB80F5',
  '#FF8B8B',
  '#80A3F5',
  '#80F5D6',
  '#F58080',
  '#F5D680',
  '#F5A3F5',
  '#BEF580',
  '#A7A4F5',
  '#F5A4A7',
  '#F9E900',
  '#F5A4F5',
];
export const DarkColors = [
  '#5656ba',
  '#2d2d80',
  '#7e7ebc',
  '#61619b',
  '#343493',
  '#834320',
  '#8f8c00',
  '#531fff',
  '#54786a',
  '#a37d00',
  '#211108',
  '#8f8c00',
  '#21008f',
  '#324840',
  '#523f00',
  '#080705',
  '#362023',
  '#700548',
  '#7272ab',
  '#7899d4',
  '#0a1045',
  '#00c2d1',
  '#d4740c',
  '#ed33b9',
];

const originalDarkTextColors = [
  '#000000', // Black
  '#333333', // Dark Gray
  '#172B4D', // Navy Blue
  '#006080', // Blue
  '#29ABCA', // Turquoise
  '#7F8C8D', // Dark Gray
  '#C0392B', // Maroon
  '#9B59B6', // Violet
  '#B3395B', // Dark Red
  '#CC7236', // Dark Orange
  '#808000', // Olive Green
  '#4C3F50', // Dark Purple
];

export const darkTextColors = [
  '#000000', // Black
  '#333333', // Dark Gray
  '#172B4D', // Navy Blue
  '#006080', // Blue
  '#29ABCA', // Turquoise
  '#7F8C8D', // Dark Gray
  '#C0392B', // Maroon
  '#9B59B6', // Violet
  '#B3395B', // Dark Red
  '#CC7236', // Dark Orange
  '#808000', // Olive Green
  '#4C3F50', // Dark Purple
  '#1a1a1a', // Very Dark Gray
  '#212121', // Dark Charcoal
  '#303030', // Dark Gray
  '#333333', // Dark Gray
  '#424242', // Dark Gray
  '#525252', // Medium Dark Gray
  '#616161', // Medium Gray
  '#707070', // Medium Gray
  '#808080', // Gray
  '#9E9E9E', // Light Gray
  '#000080', // Navy Blue
  '#007BFF', // Royal Blue
  '#28A745', // Green
  '#DC3545', // Red
  '#FFC107', // Orange
  '#C850C0', // Pink
];

export const darkBackgroundColors = [
  '#1a1a1a', // Very Dark Gray
  '#212121', // Dark Charcoal
  '#303030', // Dark Gray
  '#333333', // Dark Gray
  '#424242', // Dark Gray
  '#525252', // Medium Dark Gray
  '#616161', // Medium Gray
  '#707070', // Medium Gray
  '#808080', // Gray
  '#9E9E9E', // Light Gray
  '#000080', // Navy Blue
  '#007BFF', // Royal Blue
  '#28A745', // Green
  '#DC3545', // Red
  '#FFC107', // Orange
  '#C850C0', // Pink
];

export const dynamicColor = writable(darkTextColors[2]);

export let counter = writable(0);

export let searchContent = writable([]);
