import { supabase } from '../lib/supabase';
import { mockUsers, mockEvents } from './mockData';

async function seedDatabase() {
  // Insert users
  for (const user of mockUsers) {
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name
      })
      .select()
      .single();

    if (profileError) {
      console.error('Error inserting profile:', profileError);
      continue;
    }
    console.log('Inserted profile:', profile);
  }

  // Insert events
  for (const event of mockEvents) {
    const { data: newEvent, error: eventError } = await supabase
      .from('events')
      .insert({
        id: event.id,
        title: event.title,
        description: event.description,
        date: event.date,
        max_workers: event.maxWorkers,
        registered_workers: event.registeredWorkers,
        created_by: event.createdBy
      })
      .select()
      .single();

    if (eventError) {
      console.error('Error inserting event:', eventError);
      continue;
    }
    console.log('Inserted event:', newEvent);
  }
}

seedDatabase()
  .catch(console.error)
  .finally(() => process.exit());