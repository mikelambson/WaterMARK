"use client"
// Define an interface for DateTimeFormatOptions
interface MyDateTimeFormatOptions {
    weekday?: 'long' | 'short' | 'narrow';
    year?: 'numeric' | '2-digit';
    month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
    day?: 'numeric' | '2-digit';
    hour?: 'numeric' | '2-digit';
    minute?: 'numeric' | '2-digit';
    hour12?: boolean;
  }
 
export function DateTime() {
    const options: MyDateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

        const formatter = new Intl.DateTimeFormat('en-US', options);
        const currentDateTime = formatter.format(new Date());

        return currentDateTime;

}

