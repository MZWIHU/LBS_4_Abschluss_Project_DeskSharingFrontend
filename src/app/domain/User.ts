/*
class that represents an user
 */
export class User {

  public mail;

  public name;

  public surname;

  public department;

  constructor(mail : string, name: string, surname: string, department: string) {
    this.mail = mail;
    this.name = name;
    this.surname = surname;
    this.department = department;
  }
}
