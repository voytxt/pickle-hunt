import { localStorageStore } from '@skeletonlabs/skeleton';
import { writable } from 'svelte/store';

export const reference = localStorageStore<Reference | null>('reference', null);
export const stats = writable<Stats | null>(null);
export const selectedTab = writable('profile');
export const filter = writable<Filter>('all');
export const search = writable<string>('');
export const sort = writable<Sort>({ direction: 'ascending', criteria: 'name' });
