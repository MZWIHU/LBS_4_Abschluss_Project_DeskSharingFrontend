/*
class that represents an user
 */
export class User {

  public mail;

  public name;

  public username;

  public surname;

  public department;

  constructor(mail: string, name: string, surname: string, username: string, department: string) {
    this.mail = mail;
    this.name = name;
    this.username = username;
    this.surname = surname;
    this.department = department;
  }
}
