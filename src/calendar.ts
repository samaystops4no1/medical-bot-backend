// Define types
type TimeSlot = {
    start: string;
}

type AvailabilityResponse = {
    data: {
        [date: string]: TimeSlot[];
    }
}

type BookingResponse = {
    status: string;
    data: {
        start: string;
        end: string;
        meetingUrl: string;
    }
}

// API Config
const API_KEY = "";
const BASE_URL = "https://api.cal.com/v2";
export const EVENT_TYPE = "Appoinment with Dr Sherlock Holmes"; // Replace with actual event type
export const USER_EMAIL = "test@test.com"; // Replace with attendee's email

// Function to fetch available slots
async function getAvailableSlots(eventType: string): Promise<TimeSlot | null> {
    console.log("Getting available slots");
    try {
        const response = await fetch(`${BASE_URL}/slots?eventTypeId=2115193&start=2025-03-20&end=2025-04-20`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
                "cal-api-version": "2024-09-04",
            },
        });

        if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);

        const data = await response.json() as AvailabilityResponse;
        console.log("Available slots:", data);
        
        // Get the first available date and slot
        const firstDate = Object.keys(data.data)[0];
        return data.data[firstDate]?.[0] || null;
    } catch (error) {
        console.error("Error fetching slots:", error);
        return null;
    }
}

// Function to book the first available slot
export async function bookAppointment(eventType: string, email: string): Promise<string> {
    console.log('starting to booking appointment');
    const slot = await getAvailableSlots(eventType);
   
    if (!slot) return "No available slots found.";

    try {
        console.log("Booking appointment");
        const response = await fetch(`${BASE_URL}/bookings`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
                "cal-api-version": "2024-08-13",
            },
            body: JSON.stringify({
                eventTypeId: 2115193,
                attendee: { 
                    name: "Sherlock Holmes",
                    timeZone: "America/New_York",
                    email: email,
                 },
                start: slot.start,
            }),
        });

        if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);

        const data = await response.json() as BookingResponse;
        return `Appointment booked: ${formatDateTime(data.data.start)} to ${formatDateTime(data.data.end)}. Meeting URL: ${data.data.meetingUrl}`;
    } catch (error) {
        console.error("Error booking appoinment:", error);
        return `Error booking appointment: ${error}`;
    }
}

function formatDateTime(dateTimeStr: string): string {
    const date = new Date(dateTimeStr);
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    }) + ' on ' + date.getDate() + getOrdinalSuffix(date.getDate()) + ' ' + 
    date.toLocaleString('en-US', { month: 'short' }) + ' ' + date.getFullYear();
}

function getOrdinalSuffix(day: number): string {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
    }
}

// Example usage:
// formatDateTime("2025-03-24T05:00:00.000Z") 
// Returns: "Monday, March 24, 2025, 5:00 AM EDT"
