import { supabase } from './supabase';

async function createInitialAdmin(email: string, password: string, name: string) {
  try {
    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role: 'admin'
        }
      }
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('Failed to create user');

    // Create profile
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: authData.user.id,
          email,
          name,
          role: 'admin'
        }
      ]);

    if (profileError) {
      // Clean up auth user if profile creation fails
      await supabase.auth.admin.deleteUser(authData.user.id);
      throw profileError;
    }

    console.log('Admin user created successfully!');
    return authData.user;
  } catch (error) {
    console.error('Error creating admin user:', error);
    throw error;
  }
}

async function setup() {
  try {
    await createInitialAdmin(
      'admin@example.com',  // Replace with your desired admin email
      'admin123',          // Replace with your desired password
      'Admin User'         // Replace with your desired name
    );
  } catch (error) {
    console.error('Failed to set up admin user:', error);
    process.exit(1);
  }
}

setup();
