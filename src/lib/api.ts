import { supabase } from './supabase';
import type { User, Event } from '../types';

// User Operations
export const getUsers = async (): Promise<User[]> => {
  console.log('Fetching users...');
  const { data, error } = await supabase
    .from('profiles')
    .select('*');
  
  if (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
  console.log('Fetched users:', data);
  return data || [];
};

export const getUserById = async (id: string): Promise<User | null> => {
  console.log(`Fetching user by id: ${id}...`);
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error(`Error fetching user by id: ${id}`, error);
    throw error;
  }
  console.log(`Fetched user by id: ${id}`, data);
  return data;
};

// Additional User Operations
export const createUser = async (userData: Omit<User, 'id'>): Promise<User> => {
  console.log('Creating user...');
  const { data, error } = await supabase
    .from('profiles')
    .insert([userData])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating user:', error);
    throw error;
  }
  console.log('Created user:', data);
  return data;
};

export const updateUser = async (id: string, userData: Partial<User>): Promise<User> => {
  console.log(`Updating user by id: ${id}...`);
  const { data, error } = await supabase
    .from('profiles')
    .update(userData)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error(`Error updating user by id: ${id}`, error);
    throw error;
  }
  console.log(`Updated user by id: ${id}`, data);
  return data;
};

export const deleteUser = async (id: string): Promise<void> => {
  console.log(`Deleting user by id: ${id}...`);
  const { error } = await supabase
    .from('profiles')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error(`Error deleting user by id: ${id}`, error);
    throw error;
  }
  console.log(`Deleted user by id: ${id}`);
};

// Auth and User Management
export const registerUser = async (email: string, password: string, name: string, role: 'admin' | 'worker'): Promise<User> => {
  console.log('Registering user...');
  // First, create the auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        role
      }
    }
  });

  if (authError) {
    console.error('Error registering user:', authError);
    throw authError;
  }
  if (!authData.user) {
    console.error('Failed to create user');
    throw new Error('Failed to create user');
  }

  // Then create the profile
  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .insert([
      {
        id: authData.user.id,
        email,
        name,
        role
      }
    ])
    .select()
    .single();

  if (profileError) {
    console.error('Error creating profile:', profileError);
    // If profile creation fails, we should clean up the auth user
    await supabase.auth.admin.deleteUser(authData.user.id);
    throw profileError;
  }
  console.log('Registered user:', profileData);
  return profileData;
};

// Function to create initial admin user
export const createInitialAdmin = async (email: string, password: string, name: string): Promise<void> => {
  console.log('Creating initial admin...');
  try {
    await registerUser(email, password, name, 'admin');
    console.log('Initial admin user created successfully');
  } catch (error) {
    console.error('Error creating initial admin:', error);
    throw error;
  }
};

// Event Operations
export const getEvents = async (): Promise<Event[]> => {
  console.log('Fetching events...');
  const { data, error } = await supabase
    .from('events')
    .select('*');
  
  if (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
  console.log('Fetched events:', data);
  return data || [];
};

export const createEvent = async (event: Omit<Event, 'id'>): Promise<Event> => {
  console.log('Creating event...');
  const { data, error } = await supabase
    .from('events')
    .insert([event])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating event:', error);
    throw error;
  }
  console.log('Created event:', data);
  return data;
};

export const updateEvent = async (id: string, event: Partial<Event>): Promise<Event> => {
  console.log(`Updating event by id: ${id}...`);
  const { data, error } = await supabase
    .from('events')
    .update(event)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error(`Error updating event by id: ${id}`, error);
    throw error;
  }
  console.log(`Updated event by id: ${id}`, data);
  return data;
};

export const deleteEvent = async (id: string): Promise<void> => {
  console.log(`Deleting event by id: ${id}...`);
  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error(`Error deleting event by id: ${id}`, error);
    throw error;
  }
  console.log(`Deleted event by id: ${id}`);
};

// Registration Operations
export const registerForEvent = async (eventId: string, workerId: string) => {
  console.log(`Registering worker for event: ${eventId}...`);
  const { error } = await supabase
    .from('registrations')
    .insert([{ event_id: eventId, worker_id: workerId }]);
  
  if (error) {
    console.error(`Error registering worker for event: ${eventId}`, error);
    throw error;
  }
  console.log(`Registered worker for event: ${eventId}`);
  
  // Update registered_workers count
  const { data: event } = await supabase
    .from('events')
    .select('registered_workers')
    .eq('id', eventId)
    .single();
    
  if (event) {
    await supabase
      .from('events')
      .update({ registered_workers: (event.registered_workers || 0) + 1 })
      .eq('id', eventId);
  }
};

export const unregisterFromEvent = async (eventId: string, workerId: string) => {
  console.log(`Unregistering worker from event: ${eventId}...`);
  const { error } = await supabase
    .from('registrations')
    .delete()
    .match({ event_id: eventId, worker_id: workerId });
  
  if (error) {
    console.error(`Error unregistering worker from event: ${eventId}`, error);
    throw error;
  }
  console.log(`Unregistered worker from event: ${eventId}`);
  
  // Update registered_workers count
  const { data: event } = await supabase
    .from('events')
    .select('registered_workers')
    .eq('id', eventId)
    .single();
    
  if (event && event.registered_workers > 0) {
    await supabase
      .from('events')
      .update({ registered_workers: event.registered_workers - 1 })
      .eq('id', eventId);
  }
};

export const getEventRegistrations = async (eventId: string): Promise<string[]> => {
  console.log(`Fetching registrations for event: ${eventId}...`);
  const { data, error } = await supabase
    .from('registrations')
    .select('worker_id')
    .eq('event_id', eventId);
  
  if (error) {
    console.error(`Error fetching registrations for event: ${eventId}`, error);
    throw error;
  }
  console.log(`Fetched registrations for event: ${eventId}`, data);
  return data.map(reg => reg.worker_id);
};
