import { writable } from "svelte/store"
import type { Writable } from "svelte/store";
import { data } from "../routes/data";
import type { InvoiceData } from "../routes/data";

// let localData;

// if (typeof localStorage !== 'undefined') {
//     localData = JSON.parse(localStorage.getItem('data'));
// }

export const darkmode = writable();
export const invoiceData: Writable<Array<InvoiceData>> = writable(data);

/* TODO: Do we need overlay & sidebar open if they're doing the same thng. */
export const sidebarOpen = writable();
export const overlay: Writable<boolean> = writable();