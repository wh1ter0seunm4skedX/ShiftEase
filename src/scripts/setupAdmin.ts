import { createInitialAdmin } from '../lib/api';

async function setup() {
  try {
    await createInitialAdmin(
      'admin@example.com',  // Replace with your desired admin email
      'admin123',          // Replace with your desired password
      'Admin User'         // Replace with your desired name
    );
    console.log('Admin user created successfully!');
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
}

setup();
