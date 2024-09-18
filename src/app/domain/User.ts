/*
class that represents an user
 */
export class User {

  public mail;

  public name;

  public surname;

  constructor(mail : string, name: string, surname: string) {
    this.mail = mail;
    this.name = name;
    this.surname = surname;
  }
}
