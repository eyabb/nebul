import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
    role: []
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  // select menu role

 

  constructor(private authService: AuthService) { 
    // select menu role
  


  }

  ngOnInit(): void {
  }
//select menu 
/*
updateRole(role: string, event: Event): void {

  const roleIndex = this.selectedRoles.indexOf(role);

  if (roleIndex === -1) {
    // Ajouter le rôle au tableau si ce n'est pas déjà sélectionné
    this.selectedRoles.push(role);
  } else {
    // Supprimer le rôle du tableau s'il est déjà sélectionné
    this.selectedRoles.splice(roleIndex, 1);
  }

  console.log('Rôles sélectionnés : ', this.selectedRoles);
  // Implémentez votre logique de mise à jour des rôles ici
}
*/

  
  updateRole(role: string, event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      // Add the role to the array if checked
      this.form.role.push(role);
    } else {
      // Remove the role from the array if unchecked
      const index = this.form.role.indexOf(role);
      if (index !== -1) {
        this.form.role.splice(index, 1);
      }
    }
  }

  

  onSubmit(): void {
    const { username, password, role } = this.form;
     console.log(this.form);
    this.authService.register(username,password, role).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}
