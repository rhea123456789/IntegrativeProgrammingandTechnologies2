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
      name: 'rhea',
      email: 'yame@gmail.com',
      contact: 'N/A',
      address: 'N/A',
      status: 'Active',
      password: '123456'
    },
    {
      id: 2,
      name: 'bebang',
      email: 'bebang@gmail.com',
      contact: 'N/A',
      address: 'N/A',
      status: 'Active',
      password: '123456'
    },
    {
      id: 3,
      name: 'mae',
      email: 'mae@gmail.com',
      contact: 'N/A',
      address: 'N/A',
      status: 'Active',
      password: '123456'
    },
    {
      id: 4,
      name: 'reyah',
      email: 'reyah@gmail.com',
      contact: 'N/A',
      address: 'N/A',
      status: 'Active',
      password: '123456'
    },
    {
      id: 5,
      name: 'anne',
      email: 'anne@gmail.com',
      contact: 'N/A',
      address: 'N/A',
      status: 'Active',
      password: '123456'
    },
    {
      id: 6,
      name: 'hawak',
      email: 'ang@gmail.com',
      contact: '09365412889',
      address: 'beat',
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

  loginErrors = {
    email: '',
    password: '',
    credentials: ''
  };

  registerErrors = {
    fullName: '',
    username: '',
    email: '',
    contactNumber: '',
    address: '',
    password: '',
    confirmPassword: ''
  };

  goToLogin() {
    this.currentView = 'login';
    this.clearLoginErrors();
  }

  goToRegister() {
    this.currentView = 'register';
    this.clearRegisterErrors();
  }

  clearLoginErrors() {
    this.loginErrors = {
      email: '',
      password: '',
      credentials: ''
    };
  }

  clearRegisterErrors() {
    this.registerErrors = {
      fullName: '',
      username: '',
      email: '',
      contactNumber: '',
      address: '',
      password: '',
      confirmPassword: ''
    };
  }

  validateLogin(): boolean {
    this.clearLoginErrors();
    let isValid = true;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!this.loginData.email.trim()) {
      this.loginErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailPattern.test(this.loginData.email)) {
      this.loginErrors.email = 'Invalid email format';
      isValid = false;
    }

    if (!this.loginData.password.trim()) {
      this.loginErrors.password = 'Password is required';
      isValid = false;
    } else if (this.loginData.password.length < 6) {
      this.loginErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    return isValid;
  }

  validateRegister(): boolean {
    this.clearRegisterErrors();
    let isValid = true;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contactPattern = /^09\d{9}$/;

    if (!this.registerData.fullName.trim()) {
      this.registerErrors.fullName = 'Full Name is required';
      isValid = false;
    }

    if (!this.registerData.username.trim()) {
      this.registerErrors.username = 'Username is required';
      isValid = false;
    }

    if (!this.registerData.email.trim()) {
      this.registerErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailPattern.test(this.registerData.email)) {
      this.registerErrors.email = 'Invalid email format';
      isValid = false;
    }

    if (!this.registerData.contactNumber.trim()) {
      this.registerErrors.contactNumber = 'Contact Number is required';
      isValid = false;
    } else if (!contactPattern.test(this.registerData.contactNumber)) {
      this.registerErrors.contactNumber = 'Contact must be 11 digits starting with 09';
      isValid = false;
    }

    if (!this.registerData.address.trim()) {
      this.registerErrors.address = 'Address is required';
      isValid = false;
    }

    if (!this.registerData.password.trim()) {
      this.registerErrors.password = 'Password is required';
      isValid = false;
    } else if (this.registerData.password.length < 6) {
      this.registerErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (!this.registerData.confirmPassword.trim()) {
      this.registerErrors.confirmPassword = 'Confirm Password is required';
      isValid = false;
    } else if (this.registerData.password !== this.registerData.confirmPassword) {
      this.registerErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    return isValid;
  }

  register() {
    if (!this.validateRegister()) {
      return;
    }

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

    this.clearRegisterErrors();
    this.currentView = 'login';
  }

  login() {
    if (!this.validateLogin()) {
      return;
    }

    const matchedUser = this.users.find(
      user =>
        user.email === this.loginData.email &&
        user.password === this.loginData.password
    );

    if (matchedUser) {
      this.loginErrors.credentials = '';
      this.currentView = 'portfolio';
    } else {
      this.loginErrors.credentials = 'Invalid credentials';
    }
  }
}