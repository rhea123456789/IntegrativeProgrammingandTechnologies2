import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type ViewMode = 'login' | 'register' | 'portfolio';

interface UserItem {
  id: number;
  name: string;
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
  styleUrl: './app.css'
})
export class App {
  currentView: ViewMode = 'login';

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

  users: UserItem[] = [
    {
      id: 1,
      name: 'reyuh',
      email: 'yame@gmail.com',
      contact: '09223456797',
      address: 'purok',
      status: 'Active',
      password: '123456'
    },
    {
      id: 3,
      name: 'reyami',
      email: 'ame@gmail.com',
      contact: '09389664248',
      address: 'Tupazville',
      status: 'Active',
      password: '123456'
    },
    {
      id: 4,
      name: 'beshywap',
      email: 'beshy@gmail.com',
      contact: '09123456789',
      address: 'bato',
      status: 'Active',
      password: '123456'
    },
    {
      id: 5,
      name: 'wei',
      email: 'wei@gmail.com',
      contact: '09178625342',
      address: 'near but far',
      status: 'Active',
      password: '123456'
    }
  ];

  profile = {
    title: 'About Me',
    name: 'Rhea Mae C. Aldamia',
    about: `Hi! I’m Rhea Mae C. Aldamia, a BSIT 3rd year student. I don’t really have a natural passion for coding that much, and sometimes I find it challenging to fully grasp new concepts. I often seek guidance online, from tutorials, and from others to learn at my own pace. I know that learning takes time, and even if it’s difficult, I try to push myself to understand and complete every project. I admit I’m a slow learner, but I believe that persistence and consistent effort can help me improve over time. Currently, I’m familiar with basic HTML, CSS, and some JavaScript (familiar lang chares), and I’m willing to keep learning step by step to grow my skills.`,
    email: 'rheamae.aldamia@evsu.edu.com',
    phone: '09389664248',
    skills: 'I’m skilled at online research and learning. Basically, I can’t study without Wi-Fi.',
    image: 'profile.jpg'
  };

  goToLogin() {
    this.currentView = 'login';
  }

  goToRegister() {
    this.currentView = 'register';
  }

  register() {
    const nextId =
      this.users.length > 0
        ? Math.max(...this.users.map(user => user.id)) + 1
        : 1;

    const newUser: UserItem = {
      id: nextId,
      name: this.registerData.username || this.registerData.fullName,
      email: this.registerData.email,
      contact: this.registerData.contactNumber,
      address: this.registerData.address,
      status: 'Active',
      password: this.registerData.password
    };

    this.users.push(newUser);

    this.loginData.email = this.registerData.email;
    this.loginData.password = '';

    this.registerData = {
      fullName: '',
      username: '',
      email: '',
      contactNumber: '',
      address: '',
      password: '',
      confirmPassword: ''
    };

    this.currentView = 'login';
  }

  login() {
    const matchedUser = this.users.find(
      user =>
        user.email === this.loginData.email &&
        user.password === this.loginData.password
    );

    if (matchedUser) {
      this.currentView = 'portfolio';
    }
  }
}