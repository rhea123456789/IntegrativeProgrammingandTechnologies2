import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type ViewMode = 'login' | 'register' | 'portfolio';

interface UserItem {
  id: number;
  fullName: string;
  username: string;
  email: string;
  contact: string;
  address: string;
  status: string;
  password: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  currentView: ViewMode = 'login'; // Tracks which view to show

  // Login and registration form data
  loginData = {
    email: '',
    password: ''
  };

  registerData = {
    fullName: '',
    username: '',
    email: '',
    contactNumber: '',
    address: '',
    password: '',
    confirmPassword: ''
  };

  // Search term for filtering users
  searchTerm: string = '';

  // Edit mode for user registration
  isEditMode: boolean = false;
  editingUserId: number | null = null;

  // Mock user data
  users: UserItem[] = [
    { id: 1, fullName: 'John Doe', username: 'john_doe', email: 'john.doe@gmail.com', contact: '09123456789', address: '1234 Main St', status: 'Active', password: 'password123' }
  ];

  // Profile data
  profile = {
    title: 'About Me',
    name: 'Rhea Mae C. Aldamia',
    about: `Hi! I’m Rhea Mae C. Aldamia, a BSIT 3rd year student. I don’t really have a natural passion for coding that much, and sometimes I find it challenging to fully grasp new concepts. I often seek guidance online, from tutorials, and from others to learn at my own pace. I know that learning takes time, and even if it’s difficult, I try to push myself to understand and complete every project. I admit I’m a slow learner, but I believe that persistence and consistent effort can help me improve over time. Currently, I’m familiar with basic HTML, CSS, and some JavaScript (familiar lang chares), and I’m willing to keep learning step by step to grow my skills.`,
    email: 'rheamae.aldamia@evsu.edu.com',
    phone: '09389664248',
    skills: 'I’m skilled at online research and learning. Basically, I can’t study without Wi-Fi.',
    image: 'profile.jpg'
  };

  // Success message after login
  successMessage: string = '';

  // Disable login button if fields are empty
  isLoginButtonDisabled(): boolean {
    return !this.loginData.email.trim() || !this.loginData.password.trim();
  }

  // Filter users based on search term
  get filteredUsers(): UserItem[] {
    const term = this.searchTerm.trim().toLowerCase();

    if (!term) {
      return this.users;
    }

    return this.users.filter(user =>
      user.fullName.toLowerCase().includes(term) ||
      user.username.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
  }

  // Login functionality
  login() {
    const isEmailValid = this.loginData.email.includes('@gmail.com');
    const user = this.users.find(u => u.email === this.loginData.email && u.password === this.loginData.password);

    if (user && isEmailValid) {
      this.successMessage = 'Logged in successfully!';
      this.currentView = 'portfolio';  // Show the portfolio page after login
    } else {
      this.successMessage = 'Logged in successfully!';
      this.currentView = 'portfolio';  // Show the portfolio page after login
    }
  }

  // Register functionality
  register() {
    if (!this.isEditMode) {
      const nextId = this.users.length > 0 ? Math.max(...this.users.map(user => user.id)) + 1 : 1;

      const newUser: UserItem = {
        id: nextId,
        fullName: this.registerData.fullName,
        username: this.registerData.username,
        email: this.registerData.email,
        contact: this.registerData.contactNumber,
        address: this.registerData.address,
        status: 'Active',
        password: this.registerData.password
      };

      this.users.push(newUser);

      this.loginData.email = this.registerData.email;
      this.loginData.password = '';

      this.resetRegisterForm();
    }
  }

  // Reset the registration form
  resetRegisterForm() {
    this.registerData = {
      fullName: '',
      username: '',
      email: '',
      contactNumber: '',
      address: '',
      password: '',
      confirmPassword: ''
    };

    this.isEditMode = false;
    this.editingUserId = null;
  }

  // Edit an existing user
  editUser(user: UserItem) {
    this.currentView = 'register';
    this.isEditMode = true;
    this.editingUserId = user.id;

    this.registerData = {
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      contactNumber: user.contact === 'N/A' ? '' : user.contact,
      address: user.address === 'N/A' ? '' : user.address,
      password: user.password,
      confirmPassword: user.password
    };
  }

  // Delete a user
  deleteUser(id: number) {
    this.users = this.users.filter(user => user.id !== id);

    if (this.editingUserId === id) {
      this.resetRegisterForm();
    }
  }

  // Switch to register page
  goToRegister() {
    this.currentView = 'register';
    this.resetRegisterForm();
  }
}