import { supabase } from './supabase';

async function checkAdmin() {
  try {
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'admin');

    if (error) {
      console.error('Error checking admin profiles:', error);
      return;
    }

    console.log('Found admin profiles:', profiles);

    // Check if we have any admin profiles
    if (profiles.length === 0) {
      console.log('No admin profiles found');
    } else {
      console.log(`Found ${profiles.length} admin profiles:`);
      profiles.forEach((profile, index) => {
        console.log(`\nAdmin ${index + 1}:`);
        console.log('ID:', profile.id);
        console.log('Email:', profile.email);
        console.log('Name:', profile.name);
        console.log('Role:', profile.role);
      });
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    process.exit();
  }
}

checkAdmin();
