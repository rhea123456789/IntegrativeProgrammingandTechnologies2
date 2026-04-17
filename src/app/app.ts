import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type ViewMode = 'login' | 'register' | 'portfolio';

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

  registeredUser: {
    fullName: string;
    username: string;
    email: string;
    contactNumber: string;
    address: string;
    password: string;
    confirmPassword: string;
  } | null = null;

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
    this.registeredUser = {
      fullName: this.registerData.fullName,
      username: this.registerData.username,
      email: this.registerData.email,
      contactNumber: this.registerData.contactNumber,
      address: this.registerData.address,
      password: this.registerData.password,
      confirmPassword: this.registerData.confirmPassword
    };

    this.loginData.email = this.registerData.email;
    this.loginData.password = '';

    this.currentView = 'login';
  }

  login() {
    if (
      this.registeredUser &&
      this.loginData.email === this.registeredUser.email &&
      this.loginData.password === this.registeredUser.password
    ) {
      this.currentView = 'portfolio';
    }
  }
}