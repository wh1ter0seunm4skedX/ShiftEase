import { supabase } from './supabase';

async function fixAdminProfile() {
  try {
    // First, sign in to get the user ID
    const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
      email: 'admin@example.com',
      password: 'admin123'
    });

    if (signInError) {
      console.error('Error signing in:', signInError);
      return;
    }

    if (!authData.user) {
      console.error('No user found after sign in');
      return;
    }

    console.log('Successfully signed in, user ID:', authData.user.id);

    // Create the profile with the correct UUID
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: authData.user.id,
        email: 'admin@example.com',
        name: 'Admin User',
        role: 'admin'
      })
      .select()
      .single();

    if (profileError) {
      console.error('Error creating profile:', profileError);
      return;
    }

    console.log('Successfully created/updated admin profile:', profile);

    // Now let's check if it worked
    const { data: profiles, error: checkError } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'admin');

    if (checkError) {
      console.error('Error checking profiles:', checkError);
      return;
    }

    console.log('All admin profiles:', profiles);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    process.exit();
  }
}

fixAdminProfile();
