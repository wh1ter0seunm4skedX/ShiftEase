export interface User {
    user_id: number;
    full_name: string;
    phone_number?: string;
    role: "worker" | "manager" | "admin";
    email: string;
    status: "active" | "inactive";
}

export interface Event {
    event_id: number;
    title: string;
    description?: string;
    event_date: string;
    start_time: string;
    end_time: string;
    location: string;
    required_workers: number;
    roles_required: { role_id: number; required_count: number }[];
}

export interface Registration {
    registration_id: number;
    user_id: number;
    event_id: number;
    role_assigned: string;
    status: "confirmed" | "pending" | "canceled";
}

export interface Role {
    role_id: number;
    role_name: string;
    description?: string;
}

export interface Notification {
    notification_id: number;
    user_id: number;
    event_id: number;
    message: string;
    send_date: string;
    status: "sent" | "pending";
}
